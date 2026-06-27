/**
 * OpenAI text client for structured prompt enhancement.
 */
import type { Result } from '../types/result.js';
import type { Config } from '../utils/config.js';
import { ImageAPIError } from '../utils/errors.js';
import type { TextClient } from './textClient.js';
/**
 * Creates a new OpenAI text client for prompt enhancement.
 */
export declare function createOpenAITextClient(config: Config): Result<TextClient, ImageAPIError>;
//# sourceMappingURL=openaiTextClient.d.ts.map