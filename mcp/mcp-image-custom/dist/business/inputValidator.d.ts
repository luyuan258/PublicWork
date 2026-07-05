/**
 * Input validation module for MCP server
 * Validates user inputs according to Gemini API and business requirements
 */
import type { GenerateImageParams } from '../types/mcp.js';
import type { Result } from '../types/result.js';
import { InputValidationError } from '../utils/errors.js';
/**
 * Validates prompt text for length constraints
 */
export declare function validatePrompt(prompt: string): Result<string, InputValidationError>;
/**
 * Validates base64 encoded image data
 * @param imageData - Base64 encoded image string
 * @param mimeType - MIME type of the image
 * @returns Result with validated Buffer or error
 */
export declare function validateBase64Image(imageData?: string, mimeType?: string): Result<Buffer | undefined, InputValidationError>;
/**
 * Validates input image path
 * @param imagePath - Path to the input image file
 * @returns Result with validated path or error
 */
export declare function validateImagePath(imagePath?: string): Result<string | undefined, InputValidationError>;
/**
 * Validates complete GenerateImageParams object
 */
export declare function validateGenerateImageParams(params: GenerateImageParams): Result<GenerateImageParams, InputValidationError>;
//# sourceMappingURL=inputValidator.d.ts.map