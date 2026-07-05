/**
 * OpenAI API client for GPT Image generation and editing.
 */
import type { Result } from '../types/result.js';
import type { Config } from '../utils/config.js';
import { ImageAPIError } from '../utils/errors.js';
import type { ImageClient } from './imageClient.js';
/**
 * Creates a new OpenAI image client.
 */
export declare function createOpenAIImageClient(config: Config): Result<ImageClient, ImageAPIError>;
//# sourceMappingURL=openaiImageClient.d.ts.map