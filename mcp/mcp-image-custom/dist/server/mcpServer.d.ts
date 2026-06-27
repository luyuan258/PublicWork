/**
 * MCP Server implementation
 * Simplified architecture with direct Gemini integration
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import type { MCPServerConfig } from '../types/mcp.js';
/**
 * Simplified MCP server
 */
export declare class MCPServerImpl {
    private config;
    private server;
    private logger;
    private fileManager;
    private responseBuilder;
    private securityManager;
    private structuredPromptGenerator;
    private textClient;
    private imageClient;
    constructor(config?: Partial<MCPServerConfig>);
    /**
     * Get server info
     */
    getServerInfo(): {
        name: string;
        version: string;
    };
    /**
     * Get list of registered tools
     */
    getToolsList(): {
        tools: {
            name: string;
            description: string;
            inputSchema: {
                type: "object";
                properties: {
                    prompt: {
                        type: "string";
                        description: string;
                    };
                    fileName: {
                        type: "string";
                        description: string;
                    };
                    inputImagePath: {
                        type: "string";
                        description: string;
                    };
                    blendImages: {
                        type: "boolean";
                        description: string;
                    };
                    maintainCharacterConsistency: {
                        type: "boolean";
                        description: string;
                    };
                    useWorldKnowledge: {
                        type: "boolean";
                        description: string;
                    };
                    useGoogleSearch: {
                        type: "boolean";
                        description: string;
                    };
                    aspectRatio: {
                        type: "string";
                        description: string;
                        enum: string[];
                    };
                    imageSize: {
                        type: "string";
                        description: string;
                        enum: string[];
                    };
                    purpose: {
                        type: "string";
                        description: string;
                    };
                    quality: {
                        type: "string";
                        description: string;
                        enum: string[];
                    };
                };
                required: string[];
            };
        }[];
    };
    /**
     * Tool execution
     */
    callTool(name: string, args: unknown): Promise<import("../types/mcp.js").McpToolResponse>;
    /**
     * Initialize provider clients lazily.
     */
    private initializeClients;
    /**
     * Simplified image generation handler
     */
    private handleGenerateImage;
    /**
     * Initialize MCP server with tool handlers
     */
    initialize(): Server;
    /**
     * Setup MCP protocol handlers
     */
    private setupHandlers;
}
/**
 * Factory function to create MCP server
 */
export declare function createMCPServer(config?: Partial<MCPServerConfig>): MCPServerImpl;
//# sourceMappingURL=mcpServer.d.ts.map