/**
 * Logger utility for structured logging with sensitive data filtering
 * Provides consistent logging format across the application
 */
/**
 * Sanitize a string by redacting sensitive information.
 * Exposed at module scope so non-Logger code paths (response builders,
 * error handlers) can sanitize before placing values into caller-visible
 * fields without instantiating a Logger.
 */
export declare function sanitizeText(input: string): string;
/**
 * Logger class for structured logging with sensitive data protection
 */
export declare class Logger {
    private readonly keyBasedSensitivePatterns;
    private currentTraceId?;
    private currentSessionId?;
    constructor();
    /**
     * Log a debug message (only in development mode)
     * @param context Context or module where the log originates
     * @param message Log message
     * @param metadata Optional metadata object
     */
    debug(context: string, message: string, metadata?: Record<string, unknown>): void;
    /**
     * Log an info message
     * @param context Context or module where the log originates
     * @param message Log message
     * @param metadata Optional metadata object
     */
    info(context: string, message: string, metadata?: Record<string, unknown>): void;
    /**
     * Log a warning message
     * @param context Context or module where the log originates
     * @param message Log message
     * @param metadata Optional metadata object
     */
    warn(context: string, message: string, metadata?: Record<string, unknown>): void;
    /**
     * Log an error message
     * @param context Context or module where the log originates
     * @param message Log message
     * @param error Optional error object
     * @param metadata Optional metadata object
     */
    error(context: string, message: string, error?: Error, metadata?: Record<string, unknown>): void;
    /**
     * Core log writing method with structured format
     */
    private writeLog;
    /**
     * Sanitize string content by redacting sensitive information
     */
    private sanitizeString;
    /**
     * Sanitize metadata by redacting sensitive information
     * @param metadata Metadata object to sanitize
     * @returns Sanitized metadata object
     */
    private sanitizeMetadata;
    /**
     * Check if a key contains sensitive information
     * @param key Object key to check
     * @returns True if the key contains sensitive information
     */
    private isSensitiveKey;
    /**
     * Generate unique ID for trace/session tracking
     */
    private generateId;
    /**
     * Get or generate current trace ID
     */
    private getCurrentTraceId;
    /**
     * Get current session ID
     */
    private getCurrentSessionId;
}
//# sourceMappingURL=logger.d.ts.map