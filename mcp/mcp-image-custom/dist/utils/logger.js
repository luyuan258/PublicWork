/**
 * Logger utility for structured logging with sensitive data filtering
 * Provides consistent logging format across the application
 */
import * as crypto from 'node:crypto';
const SENSITIVE_PATTERNS = [
    /GEMINI_API_KEY['"]?\s*[:=]\s*['"]?([^\s'"]+)/gi,
    /OPENAI_API_KEY['"]?\s*[:=]\s*['"]?([^\s'"]+)/gi,
    /api[_-]?key[^\s]*['"]?\s*[:=]\s*['"]?([^\s'"]+)/gi,
    /password[^\s]*['"]?\s*[:=]\s*['"]?([^\s'"]+)/gi,
    /bearer\s+([a-zA-Z0-9\-._~+/]+=*)/gi,
    /secret[^\s]*['"]?\s*[:=]\s*['"]?([^\s'"]+)/gi,
    /token[^\s]*['"]?\s*[:=]\s*['"]?([^\s'"]+)/gi,
    /(sk-(?:proj-)?[A-Za-z0-9_-]{16,})/g,
];
const URL_PATTERNS = [
    /(https?:\/\/[^\s]+)/gi, // URLs - separate to handle differently
];
const FILTER_PATTERNS = [
    /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, // Credit card numbers
    /\b\d{3}-\d{2}-\d{4}\b/g, // SSN
    /\b(?:\+?1[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}\b/g, // Phone numbers
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/gi, // Emails
];
/**
 * Sanitize a string by redacting sensitive information.
 * Exposed at module scope so non-Logger code paths (response builders,
 * error handlers) can sanitize before placing values into caller-visible
 * fields without instantiating a Logger.
 */
export function sanitizeText(input) {
    let sanitized = input;
    for (const pattern of SENSITIVE_PATTERNS) {
        sanitized = sanitized.replace(pattern, (match, group1) => match.replace(group1, '[REDACTED]'));
    }
    sanitized = sanitized.replace(/\bapi[_-]?key\b/gi, '[REDACTED]');
    sanitized = sanitized.replace(/\bgemini[_-]?api[_-]?key\b/gi, '[REDACTED]');
    sanitized = sanitized.replace(/\b[A-Za-z0-9]{20,}\b/g, '[REDACTED]');
    for (const pattern of URL_PATTERNS) {
        sanitized = sanitized.replace(pattern, '[URL_REDACTED]');
    }
    for (const pattern of FILTER_PATTERNS) {
        sanitized = sanitized.replace(pattern, '[FILTERED]');
    }
    return sanitized;
}
/**
 * Logger class for structured logging with sensitive data protection
 */
export class Logger {
    constructor() {
        this.keyBasedSensitivePatterns = [
            /api[_-]?key/i,
            /gemini[_-]?api[_-]?key/i,
            /secret/i,
            /password/i,
            /token/i,
            /credential/i,
            /bearer/i,
        ];
        // Initialize session ID once per logger instance
        this.currentSessionId = this.generateId();
    }
    /**
     * Log a debug message (only in development mode)
     * @param context Context or module where the log originates
     * @param message Log message
     * @param metadata Optional metadata object
     */
    debug(context, message, metadata) {
        if (process.env['NODE_ENV'] === 'production')
            return;
        this.writeLog('debug', context, message, metadata);
    }
    /**
     * Log an info message
     * @param context Context or module where the log originates
     * @param message Log message
     * @param metadata Optional metadata object
     */
    info(context, message, metadata) {
        this.writeLog('info', context, message, metadata);
    }
    /**
     * Log a warning message
     * @param context Context or module where the log originates
     * @param message Log message
     * @param metadata Optional metadata object
     */
    warn(context, message, metadata) {
        this.writeLog('warn', context, message, metadata);
    }
    /**
     * Log an error message
     * @param context Context or module where the log originates
     * @param message Log message
     * @param error Optional error object
     * @param metadata Optional metadata object
     */
    error(context, message, error, metadata) {
        const enhancedMetadata = {
            ...metadata,
            ...(error && {
                errorName: error.name,
                errorMessage: this.sanitizeString(error.message),
                errorStack: process.env['NODE_ENV'] !== 'production' ? error.stack : undefined,
            }),
        };
        this.writeLog('error', context, message, enhancedMetadata);
    }
    /**
     * Core log writing method with structured format
     */
    writeLog(level, context, message, metadata) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            level,
            context,
            message: this.sanitizeString(message),
            ...(metadata && { metadata: this.sanitizeMetadata(metadata) }),
            traceId: this.getCurrentTraceId(),
            sessionId: this.getCurrentSessionId(),
        };
        // JSON format structured log output
        const logOutput = JSON.stringify(logEntry);
        // For MCP servers, ALL logs must go to stderr
        // stdout is reserved for JSON-RPC messages only
        console.error(logOutput);
    }
    /**
     * Sanitize string content by redacting sensitive information
     */
    sanitizeString(input) {
        return sanitizeText(input);
    }
    /**
     * Sanitize metadata by redacting sensitive information
     * @param metadata Metadata object to sanitize
     * @returns Sanitized metadata object
     */
    sanitizeMetadata(metadata) {
        const sanitized = {};
        for (const [key, value] of Object.entries(metadata)) {
            if (this.isSensitiveKey(key)) {
                sanitized[key] = '[REDACTED]';
            }
            else if (typeof value === 'string') {
                sanitized[key] = this.sanitizeString(value);
            }
            else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                sanitized[key] = this.sanitizeMetadata(value);
            }
            else {
                sanitized[key] = value;
            }
        }
        return sanitized;
    }
    /**
     * Check if a key contains sensitive information
     * @param key Object key to check
     * @returns True if the key contains sensitive information
     */
    isSensitiveKey(key) {
        return this.keyBasedSensitivePatterns.some((pattern) => pattern.test(key));
    }
    /**
     * Generate unique ID for trace/session tracking
     */
    generateId() {
        return crypto.randomUUID().substring(0, 8);
    }
    /**
     * Get or generate current trace ID
     */
    getCurrentTraceId() {
        if (!this.currentTraceId) {
            this.currentTraceId = this.generateId();
        }
        return this.currentTraceId;
    }
    /**
     * Get current session ID
     */
    getCurrentSessionId() {
        return this.currentSessionId;
    }
}
//# sourceMappingURL=logger.js.map