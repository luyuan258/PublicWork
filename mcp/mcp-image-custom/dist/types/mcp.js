/**
 * MCP-related type definitions
 * Defines types related to @modelcontextprotocol/sdk and project-specific types
 */
/**
 * Supported quality preset values
 */
export const IMAGE_QUALITY_VALUES = [
    'fast',
    'balanced',
    'quality',
];
/**
 * Supported image provider values.
 */
export const IMAGE_PROVIDER_VALUES = ['gemini', 'openai', 'xty'];
/**
 * Gemini image generation model identifiers
 */
export const GEMINI_MODELS = {
    /** Nano Banana 2 - fast generation with Flash speed */
    FLASH: 'gemini-3.1-flash-image-preview',
    /** Nano Banana Pro - highest quality output */
    PRO: 'gemini-3-pro-image-preview',
};
//# sourceMappingURL=mcp.js.map