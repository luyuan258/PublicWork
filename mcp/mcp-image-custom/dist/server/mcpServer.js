/**
 * MCP Server implementation
 * Simplified architecture with direct Gemini integration
 */
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
// API clients
import { createGeminiClient } from '../api/geminiClient.js';
import { createGeminiTextClient } from '../api/geminiTextClient.js';
import { createOpenAIImageClient } from '../api/openaiImageClient.js';
import { createOpenAITextClient } from '../api/openaiTextClient.js';
import { createXTYImageClient } from '../api/xtyImageClient.js';
// Business logic
import { createFileManager } from '../business/fileManager.js';
import { validateGenerateImageParams } from '../business/inputValidator.js';
import { createResponseBuilder } from '../business/responseBuilder.js';
import { createStructuredPromptGenerator, } from '../business/structuredPromptGenerator.js';
// Utilities
import { getConfig } from '../utils/config.js';
import { Logger } from '../utils/logger.js';
import { ensureExtension, getMimeTypeFromExtension, DEFAULT_MIME_TYPE, normalizeMimeType } from '../utils/mimeUtils.js';
import { SecurityManager } from '../utils/security.js';
import { ErrorHandler } from './errorHandler.js';
/**
 * Default MCP server configuration
 */
const DEFAULT_CONFIG = {
    name: 'mcp-image-server',
    version: '0.1.0',
    defaultOutputDir: './output',
};
/**
 * Simplified MCP server
 */
export class MCPServerImpl {
    constructor(config = {}) {
        this.server = null;
        this.structuredPromptGenerator = null;
        this.textClient = null;
        this.imageClient = null;
        this.config = { ...DEFAULT_CONFIG, ...config };
        this.logger = new Logger();
        this.fileManager = createFileManager();
        this.responseBuilder = createResponseBuilder();
        this.securityManager = new SecurityManager();
    }
    /**
     * Get server info
     */
    getServerInfo() {
        return {
            name: this.config.name,
            version: this.config.version,
        };
    }
    /**
     * Get list of registered tools
     */
    getToolsList() {
        return {
            tools: [
                {
                    name: 'analyze_image',
                    description: 'Analyze an image and return a text description. Send an image file path to get a detailed description of its contents.',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            imagePath: {
                                type: 'string',
                                description: 'Absolute path to the image file to analyze',
                            },
                            question: {
                                type: 'string',
                                description: 'Optional question about the image. Default: "请详细描述这张图片的内容"',
                            },
                        },
                        required: ['imagePath'],
                    },
                },
                {
                    name: 'generate_image',
                    description: 'Generate image with specified prompt and optional parameters',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            prompt: {
                                type: 'string',
                                description: 'The prompt for image generation (English recommended for optimal structured prompt enhancement)',
                            },
                            fileName: {
                                type: 'string',
                                description: 'Custom file name for the output image. Auto-generated if not specified.',
                            },
                            inputImagePath: {
                                type: 'string',
                                description: 'Optional absolute path to source image for image-to-image generation. Use when generating variations, style transfers, or similar images based on an existing image (must be an absolute path)',
                            },
                            blendImages: {
                                type: 'boolean',
                                description: 'Enable multi-image blending for combining multiple visual elements naturally. Use when prompt mentions multiple subjects or composite scenes',
                            },
                            maintainCharacterConsistency: {
                                type: 'boolean',
                                description: 'Maintain character appearance consistency. Enable when generating same character in different poses/scenes',
                            },
                            useWorldKnowledge: {
                                type: 'boolean',
                                description: 'Use real-world knowledge for accurate context. Enable for historical figures, landmarks, or factual scenarios',
                            },
                            useGoogleSearch: {
                                type: 'boolean',
                                description: "Enable Google Search grounding to access real-time web information for factually accurate image generation. Use when prompt requires current or time-sensitive data that may have changed since the model's knowledge cutoff. Leave disabled for creative, fictional, historical, or timeless content.",
                            },
                            aspectRatio: {
                                type: 'string',
                                description: 'Aspect ratio for the generated image',
                                enum: [
                                    '1:1',
                                    '1:4',
                                    '1:8',
                                    '2:3',
                                    '3:2',
                                    '3:4',
                                    '4:1',
                                    '4:3',
                                    '4:5',
                                    '5:4',
                                    '8:1',
                                    '9:16',
                                    '16:9',
                                    '21:9',
                                ],
                            },
                            imageSize: {
                                type: 'string',
                                description: 'Image resolution for high-quality output. Specify "1K", "2K", or "4K" when you need specific resolution. Leave unspecified for standard quality.',
                                enum: ['1K', '2K', '4K'],
                            },
                            purpose: {
                                type: 'string',
                                description: 'Intended use for the image (e.g., cookbook cover, social media post, presentation slide). Influences lighting, composition, and detail level to match the context.',
                            },
                            quality: {
                                type: 'string',
                                description: 'Quality preset controlling speed/fidelity tradeoff. Only specify when the user explicitly requests a specific quality level; omit to use the server\'s configured default. "fast": best for drafts and rapid iteration. "balanced": better detail and coherence, moderate latency. "quality": highest fidelity, use for final deliverables where quality matters most.',
                                enum: ['fast', 'balanced', 'quality'],
                            },
                        },
                        required: ['prompt'],
                    },
                },
            ],
        };
    }
    /**
     * Tool execution
     */
    async callTool(name, args) {
        try {
            if (name === 'generate_image') {
                return await this.handleGenerateImage(args);
            }
            if (name === 'analyze_image') {
                return await this.handleAnalyzeImage(args);
            }
            throw new Error(`Unknown tool: ${name}`);
        }
        catch (error) {
            this.logger.error('mcp-server', 'Tool execution failed', error);
            return ErrorHandler.handleError(error);
        }
    }
    /**
     * Initialize provider clients lazily.
     */
    async initializeClients() {
        const configResult = getConfig();
        if (!configResult.success) {
            throw configResult.error;
        }
        const config = configResult.data;
        if (this.imageClient && this.textClient && (config.skipPromptEnhancement || this.structuredPromptGenerator)) {
            return;
        }
        // Initialize Text Client (also required by analyze_image even when prompt enhancement is skipped).
        if (!this.textClient) {
            const textClientResult = config.imageProvider === 'openai'
                ? createOpenAITextClient(config)
                : config.imageProvider === 'xty'
                    ? createOpenAITextClient(config)
                    : createGeminiTextClient(config);
            if (!textClientResult.success) {
                throw textClientResult.error;
            }
            this.textClient = textClientResult.data;
        }
        // Initialize Structured Prompt Generator
        if (!config.skipPromptEnhancement && this.textClient && !this.structuredPromptGenerator) {
            this.structuredPromptGenerator = createStructuredPromptGenerator(this.textClient);
        }
        // Initialize image generation client.
        if (!this.imageClient) {
            let clientResult;
            if (config.imageProvider === 'openai') {
                clientResult = createOpenAIImageClient(config);
            } else if (config.imageProvider === 'xty') {
                clientResult = createXTYImageClient(config);
            } else {
                clientResult = createGeminiClient(config);
            }
            if (!clientResult.success) {
                throw clientResult.error;
            }
            this.imageClient = clientResult.data;
        }
        this.logger.info('mcp-server', 'Image provider clients initialized', {
            provider: config.imageProvider,
            promptEnhancement: !config.skipPromptEnhancement,
        });
    }
    /**
     * Simplified image generation handler
     */
    async handleGenerateImage(params) {
        const result = await ErrorHandler.wrapWithResultType(async () => {
            // Validate input
            const validationResult = validateGenerateImageParams(params);
            if (!validationResult.success) {
                throw validationResult.error;
            }
            // Get configuration
            const configResult = getConfig();
            if (!configResult.success) {
                throw configResult.error;
            }
            // Initialize clients
            await this.initializeClients();
            // Handle input image if provided
            let inputImageData;
            let inputImageMimeType;
            if (params.inputImagePath) {
                const sanitizedInputPath = this.securityManager.sanitizeInputFilePath(params.inputImagePath);
                if (!sanitizedInputPath.success) {
                    throw sanitizedInputPath.error;
                }
                const extensionCheck = this.securityManager.validateImageFile(sanitizedInputPath.data);
                if (!extensionCheck.success) {
                    throw extensionCheck.error;
                }
                const imageBuffer = await fs.readFile(sanitizedInputPath.data);
                inputImageData = imageBuffer.toString('base64');
                inputImageMimeType = getMimeTypeFromExtension(path.extname(sanitizedInputPath.data));
            }
            // Generate structured prompt (unless skipped)
            let structuredPrompt = params.prompt;
            if (!configResult.data.skipPromptEnhancement && this.structuredPromptGenerator) {
                const features = {};
                if (params.maintainCharacterConsistency !== undefined) {
                    features.maintainCharacterConsistency = params.maintainCharacterConsistency;
                }
                if (params.blendImages !== undefined) {
                    features.blendImages = params.blendImages;
                }
                if (params.useWorldKnowledge !== undefined) {
                    features.useWorldKnowledge = params.useWorldKnowledge;
                }
                if (params.useGoogleSearch !== undefined) {
                    features.useGoogleSearch = params.useGoogleSearch;
                }
                const promptResult = await this.structuredPromptGenerator.generateStructuredPrompt(params.prompt, features, inputImageData, params.purpose, inputImageMimeType);
                if (promptResult.success) {
                    structuredPrompt = promptResult.data.structuredPrompt;
                    this.logger.info('mcp-server', 'Structured prompt generated', {
                        originalLength: params.prompt.length,
                        structuredLength: structuredPrompt.length,
                        selectedPractices: promptResult.data.selectedPractices,
                    });
                }
                else {
                    this.logger.warn('mcp-server', 'Using original prompt', {
                        error: promptResult.error.message,
                    });
                }
            }
            else if (configResult.data.skipPromptEnhancement) {
                this.logger.info('mcp-server', 'Prompt enhancement skipped (SKIP_PROMPT_ENHANCEMENT=true)');
            }
            // Generate image using selected provider.
            if (!this.imageClient) {
                throw new Error('Image client not initialized');
            }
            const generationResult = await this.imageClient.generateImage({
                prompt: structuredPrompt,
                ...(inputImageData && { inputImage: inputImageData }),
                ...(inputImageMimeType && { inputImageMimeType }),
                ...(params.aspectRatio && { aspectRatio: params.aspectRatio }),
                ...(params.imageSize && { imageSize: params.imageSize }),
                ...(params.useGoogleSearch !== undefined && { useGoogleSearch: params.useGoogleSearch }),
                ...(params.quality !== undefined && { quality: params.quality }),
            });
            if (!generationResult.success) {
                throw generationResult.error;
            }
            // Save image file
            const mimeType = generationResult.data.metadata.mimeType;
            const rawFileName = params.fileName
                ? this.securityManager.sanitizeFilename(params.fileName)
                : this.fileManager.generateFileName(mimeType);
            const fileName = params.fileName ? ensureExtension(rawFileName, mimeType) : rawFileName;
            const outputPath = path.join(configResult.data.imageOutputDir, fileName);
            const sanitizedPath = this.securityManager.sanitizeFilePath(outputPath);
            if (!sanitizedPath.success) {
                throw sanitizedPath.error;
            }
            const saveResult = await this.fileManager.saveImage(generationResult.data.imageData, sanitizedPath.data);
            if (!saveResult.success) {
                throw saveResult.error;
            }
            // Build response
            return this.responseBuilder.buildSuccessResponse(generationResult.data, saveResult.data);
        }, 'image-generation');
        if (result.ok) {
            return result.value;
        }
        return this.responseBuilder.buildErrorResponse(result.error);
    }
    /**
     * Image analysis handler using vision model
     */
    async handleAnalyzeImage(params) {
        const result = await ErrorHandler.wrapWithResultType(async () => {
            const imagePath = params.imagePath;
            if (!imagePath || typeof imagePath !== 'string') {
                throw new Error('Image path is required');
            }
            const sanitizedInputPath = this.securityManager.sanitizeInputFilePath(imagePath);
            if (!sanitizedInputPath.success) {
                throw sanitizedInputPath.error;
            }
            const extensionCheck = this.securityManager.validateImageFile(sanitizedInputPath.data);
            if (!extensionCheck.success) {
                throw extensionCheck.error;
            }
            const imageBuffer = await fs.readFile(sanitizedInputPath.data);
            const inputImageData = imageBuffer.toString('base64');
            const ext = path.extname(sanitizedInputPath.data).toLowerCase();
            const inputImageMimeType = getMimeTypeFromExtension(ext) || 'image/png';
            const question = params.question || '请详细描述这张图片的内容';
            await this.initializeClients();
            const textResult = await this.textClient.generateText(question, {
                inputImage: inputImageData,
                inputImageMimeType,
                maxTokens: 2048,
            });
            if (!textResult.success) {
                throw textResult.error;
            }
            return {
                content: [
                    { type: 'text', text: textResult.data },
                ],
                isError: false,
            };
        }, 'image-analysis');
        if (result.ok) {
            return result.value;
        }
        return this.responseBuilder.buildErrorResponse(result.error);
    }
    /**
     * Initialize MCP server with tool handlers
     */
    initialize() {
        this.server = new Server({
            name: this.config.name,
            version: this.config.version,
        }, {
            capabilities: {
                tools: {},
            },
        });
        // Setup tool handlers
        this.setupHandlers();
        return this.server;
    }
    /**
     * Setup MCP protocol handlers
     */
    setupHandlers() {
        if (!this.server) {
            throw new Error('Server not initialized');
        }
        // Register tool list handler
        this.server.setRequestHandler(ListToolsRequestSchema, async () => {
            return this.getToolsList();
        });
        // Register tool call handler
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            const result = await this.callTool(name, args);
            const response = {
                content: result.content,
            };
            if (result.structuredContent) {
                response.structuredContent = result.structuredContent;
            }
            return response;
        });
    }
}
/**
 * Factory function to create MCP server
 */
export function createMCPServer(config = {}) {
    return new MCPServerImpl(config);
}
//# sourceMappingURL=mcpServer.js.map