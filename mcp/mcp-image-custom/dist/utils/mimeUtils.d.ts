/**
 * Centralized MIME type and file extension mapping utility.
 * Single source of truth for all MIME type and extension operations.
 */
export declare const DEFAULT_MIME_TYPE = "image/png";
/**
 * All supported MIME types for image processing.
 */
export declare const SUPPORTED_MIME_TYPES: readonly string[];
/**
 * All supported file extensions for image processing.
 * Includes aliases (e.g., both .jpg and .jpeg).
 */
export declare const SUPPORTED_EXTENSIONS: readonly string[];
/**
 * Get the file extension for a given MIME type.
 * Returns .png with a warning log for unknown MIME types.
 *
 * @param mimeType - The MIME type string (e.g., "image/jpeg")
 * @returns The corresponding file extension (e.g., ".jpg")
 */
export declare function getExtensionFromMimeType(mimeType: string): string;
/**
 * Get the MIME type for a given file extension.
 * Returns image/png for unknown extensions.
 *
 * @param ext - The file extension (e.g., ".jpg" or ".jpeg")
 * @returns The corresponding MIME type (e.g., "image/jpeg")
 */
export declare function getMimeTypeFromExtension(ext: string): string;
/**
 * Check if a filename has a recognized image file extension.
 *
 * @param fileName - The filename to check
 * @returns true if the filename has a recognized image extension
 */
export declare function hasImageExtension(fileName: string): boolean;
/**
 * Normalize a MIME type against the supported allowlist.
 * Returns the MIME type as-is if supported, otherwise falls back to image/png with a warning.
 *
 * @param mimeType - The MIME type to normalize
 * @returns A supported MIME type string
 */
export declare function normalizeMimeType(mimeType: string): string;
/**
 * Ensure a filename has an appropriate file extension based on MIME type.
 * - If the filename already has an extension (any extension), it is preserved as-is.
 * - If the filename has no extension, one is appended based on the MIME type.
 *
 * @param fileName - The filename, with or without extension
 * @param mimeType - The MIME type to derive the extension from
 * @returns The filename with an appropriate extension
 */
export declare function ensureExtension(fileName: string, mimeType: string): string;
//# sourceMappingURL=mimeUtils.d.ts.map