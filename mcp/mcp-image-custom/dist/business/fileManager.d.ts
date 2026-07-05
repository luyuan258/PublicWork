/**
 * File Manager for handling image file operations
 * Provides functionality for saving images and managing directories
 */
import type { Result } from '../types/result.js';
import { FileOperationError } from '../utils/errors.js';
/**
 * Interface for file management operations
 */
export interface FileManager {
    saveImage(imageData: Buffer, outputPath: string, format?: string): Promise<Result<string, FileOperationError>>;
    ensureDirectoryExists(dirPath: string): Result<void, FileOperationError>;
    generateFileName(mimeType?: string): string;
}
/**
 * Creates a file manager for image file operations
 * @returns FileManager implementation
 */
export declare function createFileManager(): FileManager;
//# sourceMappingURL=fileManager.d.ts.map