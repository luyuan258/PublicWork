/**
 * Structured Prompt Generator
 * Uses Gemini Flash to generate optimized prompts for image generation
 * Applies 7 best practices and 3 feature perspectives through intelligent selection
 */
import type { TextClient } from '../api/textClient.js';
import type { Result } from '../types/result.js';
/**
 * Feature flags for image generation
 */
export interface FeatureFlags {
    maintainCharacterConsistency?: boolean;
    blendImages?: boolean;
    useWorldKnowledge?: boolean;
    useGoogleSearch?: boolean;
}
/**
 * Result of structured prompt generation
 */
export interface StructuredPromptResult {
    originalPrompt: string;
    structuredPrompt: string;
    selectedPractices: string[];
}
/**
 * Interface for structured prompt generation
 */
export interface StructuredPromptGenerator {
    generateStructuredPrompt(userPrompt: string, features?: FeatureFlags, inputImageData?: string, // Optional base64-encoded image for context
    purpose?: string, // Optional intended use for the image
    inputImageMimeType?: string): Promise<Result<StructuredPromptResult, Error>>;
}
/**
 * Implementation of StructuredPromptGenerator using Gemini Flash
 */
export declare class StructuredPromptGeneratorImpl implements StructuredPromptGenerator {
    private readonly textClient;
    constructor(textClient: TextClient);
    generateStructuredPrompt(userPrompt: string, features?: FeatureFlags, inputImageData?: string, purpose?: string, inputImageMimeType?: string): Promise<Result<StructuredPromptResult, Error>>;
    /**
     * Build complete prompt with all optimization context
     */
    private buildCompletePrompt;
    /**
     * Build enhanced feature context based on flags with explicit requirements
     */
    private buildEnhancedFeatureContext;
    /**
     * Infer which best practices were selected based on the generated prompt
     */
    private inferSelectedPractices;
}
/**
 * Factory function to create StructuredPromptGenerator
 */
export declare function createStructuredPromptGenerator(textClient: TextClient): StructuredPromptGenerator;
//# sourceMappingURL=structuredPromptGenerator.d.ts.map