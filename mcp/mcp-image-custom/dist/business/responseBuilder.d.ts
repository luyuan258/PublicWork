/**
 * Response Builder for MCP structured content responses
 * Converts generation results and errors into MCP-compatible response format
 */
import type { GeneratedImageResult } from '../api/imageClient.js';
import type { McpToolResponse } from '../types/mcp.js';
import { type BaseError } from '../utils/errors.js';
/**
 * Interface for response builder functionality
 */
export interface ResponseBuilder {
    buildSuccessResponse(generationResult: GeneratedImageResult, filePath: string): McpToolResponse;
    buildErrorResponse(error: BaseError | Error): McpToolResponse;
}
/**
 * Creates a response builder with MCP structured content support
 * @returns ResponseBuilder implementation
 */
export declare function createResponseBuilder(): ResponseBuilder;
//# sourceMappingURL=responseBuilder.d.ts.map