/**
 * Error Handler utility for unified error processing
 * Provides centralized error handling and Result type wrapping
 */
import type { McpToolResponse } from '../types/mcp.js';
import { type Result } from '../utils/errors.js';
/**
 * Handle an error and convert it to a structured MCP tool response
 * @param error Error to handle
 * @returns MCP tool response with structured error content
 */
declare function handleError(error: Error): McpToolResponse;
/**
 * Wrap an operation with Result type for safe error handling
 * @param operation Operation to execute
 * @param context Optional context for logging
 * @returns Promise resolving to Result type
 */
declare function wrapWithResultType<T>(operation: () => Promise<T>, context?: string): Promise<Result<T, Error>>;
/**
 * Error Handler utilities for unified error processing and Result type wrapping
 * Maintains backward compatibility with static class API
 */
export declare const ErrorHandler: {
    readonly handleError: typeof handleError;
    readonly wrapWithResultType: typeof wrapWithResultType;
};
export {};
//# sourceMappingURL=errorHandler.d.ts.map