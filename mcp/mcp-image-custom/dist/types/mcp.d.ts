/**
 * MCP-related type definitions
 * Defines types related to @modelcontextprotocol/sdk and project-specific types
 */
/**
 * Context method type for image generation metadata
 */
/**
 * Supported aspect ratios for Gemini image generation
 */
export type AspectRatio = '1:1' | '1:4' | '1:8' | '2:3' | '3:2' | '3:4' | '4:1' | '4:3' | '4:5' | '5:4' | '8:1' | '9:16' | '16:9' | '21:9';
/**
 * Supported image sizes for high-resolution output
 */
export type ImageSize = '1K' | '2K' | '4K';
/**
 * Quality presets for image generation
 * - 'fast': Nano Banana 2, fastest generation (default)
 * - 'balanced': Nano Banana 2 with enhanced thinking, better quality
 * - 'quality': Nano Banana Pro, highest quality output
 */
export type ImageQuality = 'fast' | 'balanced' | 'quality';
/**
 * Supported image providers.
 * - 'gemini': Google Gemini/Nano Banana models (default)
 * - 'openai': OpenAI GPT Image models such as gpt-image-2
 */
export type ImageProvider = 'gemini' | 'openai';
/**
 * Supported quality preset values
 */
export declare const IMAGE_QUALITY_VALUES: readonly ImageQuality[];
/**
 * Supported image provider values.
 */
export declare const IMAGE_PROVIDER_VALUES: readonly ImageProvider[];
/**
 * Gemini image generation model identifiers
 */
export declare const GEMINI_MODELS: {
    /** Nano Banana 2 - fast generation with Flash speed */
    readonly FLASH: "gemini-3.1-flash-image-preview";
    /** Nano Banana Pro - highest quality output */
    readonly PRO: "gemini-3-pro-image-preview";
};
/**
 * Parameters for image generation using Gemini API
 */
export interface GenerateImageParams {
    /** Prompt for image generation */
    prompt: string;
    /** Optional file name for the generated image (if not specified, generates an auto-named file in IMAGE_OUTPUT_DIR) */
    fileName?: string;
    /** Absolute path to input image for editing (optional) */
    inputImagePath?: string;
    /** Base64 encoded input image data (optional) */
    inputImage?: string;
    /** MIME type of the input image (optional, used with inputImage) */
    inputImageMimeType?: string;
    /** Multi-image blending functionality (default: false) */
    blendImages?: boolean;
    /** Maintain character consistency across generations (default: false) */
    maintainCharacterConsistency?: boolean;
    /** Use world knowledge integration for more accurate context (default: false) */
    useWorldKnowledge?: boolean;
    /** Enable Google Search grounding for real-time web information (default: false) */
    useGoogleSearch?: boolean;
    /** Aspect ratio for generated image (default: "1:1") */
    aspectRatio?: AspectRatio;
    /** Image resolution for high-quality output (e.g., "2K", "4K"). Leave unspecified for standard quality */
    imageSize?: ImageSize;
    /** Intended use for the image (e.g., cookbook cover, social media post). Helps tailor visual style and quality */
    purpose?: string;
    /** Quality preset for image generation (default: "fast"). Controls model selection and thinking configuration */
    quality?: ImageQuality;
}
/**
 * MCP server configuration
 */
export interface MCPServerConfig {
    /** Server name */
    name: string;
    /** Version */
    version: string;
    /** Default image output directory */
    defaultOutputDir: string;
}
/**
 * Content types for MCP responses
 */
export type McpContent = {
    type: 'text';
    text: string;
};
/**
 * MCP Tool Response format
 */
export interface McpToolResponse {
    content: McpContent[];
    isError?: boolean;
    structuredContent?: unknown;
}
/**
 * Structured content for successful responses
 */
export interface StructuredContent {
    type: 'resource';
    resource: {
        uri: string;
        name: string;
        mimeType: string;
    };
    metadata: {
        model: string;
        provider?: string;
        processingTime: number;
        contextMethod: string;
        timestamp: string;
    };
}
//# sourceMappingURL=mcp.d.ts.map