/**
 * Custom error classes for MCP server
 * Provides specific error types with structured error codes and suggestions
 */
/**
 * Result type pattern for explicit error handling
 */
export type Result<T, E> = {
    ok: true;
    value: T;
} | {
    ok: false;
    error: E;
};
/**
 * Base class for all application errors with structured error support.
 *
 * Caller-visible error fields (code, message, suggestion) are available
 * directly on the instance. Raw upstream details and prompt content live
 * in `context` and must be projected through a sanitizer (see
 * `responseBuilder.buildPublicDetails`) before being placed on the wire.
 */
export declare abstract class BaseError extends Error {
    abstract readonly code: string;
    abstract readonly suggestion: string;
    readonly timestamp: string;
    readonly context: Record<string, unknown> | undefined;
    constructor(message: string, context?: Record<string, unknown>);
}
/**
 * Error for input validation failures
 */
export declare class InputValidationError extends BaseError {
    readonly suggestion: string;
    readonly code = "INPUT_VALIDATION_ERROR";
    constructor(message: string, suggestion: string);
}
/**
 * Error for file operation failures with intelligent suggestion system
 */
export declare class FileOperationError extends BaseError {
    readonly code = "FILE_OPERATION_ERROR";
    get suggestion(): string;
}
/**
 * Error for Gemini API failures with intelligent suggestion system
 */
export declare class GeminiAPIError extends BaseError {
    readonly code = "GEMINI_API_ERROR";
    private customSuggestion?;
    constructor(message: string, suggestionOrContext?: string | Record<string, unknown>, statusCodeOrContext?: number | Record<string, unknown>);
    get suggestion(): string;
}
/**
 * Error for image provider API failures.
 */
export declare class ImageAPIError extends BaseError {
    readonly code = "IMAGE_API_ERROR";
    private customSuggestion;
    constructor(message: string, suggestionOrContext?: string | Record<string, unknown>, statusCodeOrContext?: number | Record<string, unknown>);
    get suggestion(): string;
}
/**
 * Error for network-related failures with intelligent suggestion system
 */
export declare class NetworkError extends BaseError {
    readonly code = "NETWORK_ERROR";
    private customSuggestion?;
    constructor(message: string, suggestionOrContext?: string | Record<string, unknown>, causeOrContext?: Error | Record<string, unknown>);
    get suggestion(): string;
}
/**
 * Error for configuration failures
 */
export declare class ConfigError extends BaseError {
    readonly suggestion: string;
    readonly code = "CONFIG_ERROR";
    constructor(message: string, suggestion: string);
}
/**
 * Error for security violations and attacks with intelligent suggestion system
 */
export declare class SecurityError extends BaseError {
    readonly code = "SECURITY_ERROR";
    get suggestion(): string;
}
//# sourceMappingURL=errors.d.ts.map