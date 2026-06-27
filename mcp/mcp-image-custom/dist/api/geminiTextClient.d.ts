/**
 * Gemini Text Client for text generation
 * Pure API client for interacting with Google AI Studio
 * Handles text generation without any prompt optimization logic
 */
import type { Result } from '../types/result.js';
import type { Config } from '../utils/config.js';
import { GeminiAPIError } from '../utils/errors.js';
import type { TextClient } from './textClient.js';
/**
 * Options for text generation
 */
export type GeminiTextClient = TextClient;
/**
 * Creates a new Gemini Text Client for prompt generation
 * @param config Configuration containing API key and settings
 * @returns Result containing the client or an error
 */
export declare function createGeminiTextClient(config: Config): Result<GeminiTextClient, GeminiAPIError>;
//# sourceMappingURL=geminiTextClient.d.ts.map