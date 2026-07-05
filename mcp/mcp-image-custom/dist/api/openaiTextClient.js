/**
 * OpenAI text client for structured prompt enhancement.
 */
import OpenAI from 'openai';
import { Err, Ok } from '../types/result.js';
import { ImageAPIError, NetworkError } from '../utils/errors.js';
import { DEFAULT_MIME_TYPE, normalizeMimeType } from '../utils/mimeUtils.js';
import { extractStatusCode, isNetworkError } from './errorClassification.js';
const OPENAI_TEXT_MODEL = 'gpt-4o-mini';
class OpenAITextClientImpl {
    constructor(config) {
        this.modelName = process.env['XTY_TEXT_MODEL'] || OPENAI_TEXT_MODEL;
        this.client = new OpenAI({
            apiKey: config.openaiApiKey,
            ...(process.env['OPENAI_BASE_URL'] && { baseURL: process.env['OPENAI_BASE_URL'] }),
        });
    }
    async generateText(prompt, config = {}) {
        const validationResult = this.validatePromptInput(prompt);
        if (!validationResult.success) {
            return validationResult;
        }
        const timeout = config.timeout ?? 30000;
        try {
            const response = (await this.client.chat.completions.create({
                model: this.modelName,
                messages: this.buildMessages(prompt, config),
                max_tokens: config.maxTokens ?? 8192,
                temperature: config.temperature ?? 0.7,
                top_p: config.topP ?? 0.95,
            }, { signal: AbortSignal.timeout(timeout) }));
            const responseText = this.extractResponseText(response);
            if (!responseText || responseText.trim().length === 0) {
                throw new Error('Empty response from OpenAI text API');
            }
            return Ok(responseText.trim());
        }
        catch (error) {
            return this.handleError(error, 'text generation');
        }
    }
    async validateConnection() {
        try {
            if (!this.client.chat) {
                return Err(new ImageAPIError('Failed to access OpenAI Chat API', 'Check your OPENAI_API_KEY configuration'));
            }
            return Ok(true);
        }
        catch (error) {
            return this.handleError(error, 'connection validation');
        }
    }
    buildMessages(prompt, config) {
        if (!config.inputImage) {
            return [{ role: 'user', content: prompt }];
        }
        const mimeType = normalizeMimeType(config.inputImageMimeType ?? DEFAULT_MIME_TYPE);
        return [{
            role: 'user',
            content: [
                { type: 'text', text: prompt },
                { type: 'image_url', image_url: { url: `data:${mimeType};base64,${config.inputImage}` } },
            ],
        }];
    }
    extractResponseText(response) {
        return response.choices?.[0]?.message?.content || '';
    }
    handleError(error, context) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        if (isNetworkError(error)) {
            return Err(new NetworkError(`Network error during OpenAI ${context}`, 'Check your internet connection and try again'));
        }
        return Err(new ImageAPIError(`Failed during OpenAI ${context}`, {
            provider: 'openai',
            stage: context,
            upstreamMessage: errorMessage,
            suggestion: this.getAPIErrorSuggestion(errorMessage),
        }, extractStatusCode(error)));
    }
    getAPIErrorSuggestion(errorMessage) {
        const lowerMessage = errorMessage.toLowerCase();
        if (lowerMessage.includes('quota') || lowerMessage.includes('rate limit')) {
            return 'You have exceeded your OpenAI API quota or rate limit. Wait before retrying or upgrade your plan';
        }
        if (lowerMessage.includes('unauthorized') || lowerMessage.includes('api key')) {
            return 'Check that your OPENAI_API_KEY is valid';
        }
        if (lowerMessage.includes('model') || lowerMessage.includes('not found')) {
            return 'Ensure gpt-4o-mini is available to your OpenAI account';
        }
        return 'Check OpenAI API configuration and try again';
    }
    validatePromptInput(prompt) {
        if (!prompt || prompt.trim().length === 0) {
            return Err(new ImageAPIError('Empty prompt provided', 'Please provide a non-empty prompt'));
        }
        if (prompt.length > 100000) {
            return Err(new ImageAPIError('Prompt too long', 'Please provide a shorter prompt'));
        }
        return Ok(true);
    }
}
/**
 * Creates a new OpenAI text client for prompt enhancement.
 */
export function createOpenAITextClient(config) {
    try {
        return Ok(new OpenAITextClientImpl(config));
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return Err(new ImageAPIError(`Failed to initialize OpenAI Text client: ${errorMessage}`, 'Verify your OPENAI_API_KEY is valid and the openai package is properly installed'));
    }
}
//# sourceMappingURL=openaiTextClient.js.map