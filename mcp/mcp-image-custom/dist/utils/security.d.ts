/**
 * Security Manager for file path validation and sanitization
 * Provides protection against path traversal, null byte injection, and other security threats
 */
import { type Result } from '../types/result.js';
import { SecurityError } from './errors.js';
/**
 * Security manager for handling file path validation and sanitization
 */
export declare class SecurityManager {
    private readonly allowedBasePaths;
    /**
     * Sanitize and validate file path for security
     * @param inputPath File path to sanitize
     * @returns Result containing sanitized path or security error
     */
    sanitizeFilePath(inputPath: string): Result<string, SecurityError>;
    /**
     * Sanitize input file path without directory restriction.
     * Prevents path traversal, null byte injection, and symlink-based attacks
     * while allowing reads from any legitimate absolute path.
     * @param inputPath File path to sanitize
     * @returns Result containing sanitized absolute path or security error
     */
    sanitizeInputFilePath(inputPath: string): Result<string, SecurityError>;
    /**
     * Validate image file extension
     * @param filePath File path to validate
     * @returns Result indicating validation success or security error
     */
    validateImageFile(filePath: string): Result<void, SecurityError>;
    /**
     * Validate directory path for security
     * @param dirPath Directory path to validate
     * @returns Result indicating validation success or security error
     */
    validateDirectoryPath(dirPath: string): Result<void, SecurityError>;
    /**
     * Generate secure temporary file path
     * @param baseName Base name for the temporary file
     * @param extension File extension (with dot)
     * @returns Secure temporary file path
     */
    generateSecureTempPath(baseName: string, extension: string): string;
    /**
     * Check if a path is within allowed directories
     * @param targetPath Path to check
     * @returns True if path is within allowed directories
     */
    isPathAllowed(targetPath: string): boolean;
    /**
     * Sanitize filename by removing dangerous characters
     * @param filename Filename to sanitize
     * @returns Sanitized filename
     */
    sanitizeFilename(filename: string): string;
}
//# sourceMappingURL=security.d.ts.map