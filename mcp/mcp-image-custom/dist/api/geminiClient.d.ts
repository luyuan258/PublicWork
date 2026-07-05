/**
 * Gemini API client for image generation
 * Integrates with Google's Gemini AI API using the official SDK
 * Supports automatic URL Context processing and feature parameters
 */
import type { Result } from '../types/result.js';
import type { Config } from '../utils/config.js';
import { GeminiAPIError } from '../utils/errors.js';
import type { ImageApiParams, ImageClient, ImageGenerationMetadata } from './imageClient.js';
/**
 * Metadata for generated images
 */
export type GeminiGenerationMetadata = ImageGenerationMetadata;
/**
 * Parameters for Gemini API image generation
 */
export type GeminiApiParams = ImageApiParams;
/**
 * Gemini API client interface
 */
export type GeminiClient = ImageClient;
/**
 * Creates a new Gemini API client
 * @param config Configuration containing API key and other settings
 * @returns Result containing the client or an error
 */
export declare function createGeminiClient(config: Config): Result<GeminiClient, GeminiAPIError>;
//# sourceMappingURL=geminiClient.d.ts.map