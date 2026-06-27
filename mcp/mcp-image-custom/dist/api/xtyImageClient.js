/**
 * XTY.app API client for image generation via OpenAI-compatible chat completions endpoint.
 * Uses gemini-3.1-flash-image-preview model through api.xty.app proxy.
 */
import OpenAI from 'openai';
import { Err, Ok } from '../types/result.js';
import { ImageAPIError, NetworkError } from '../utils/errors.js';
import { extractStatusCode, isNetworkError } from './errorClassification.js';

const XTY_IMAGE_MODEL = process.env['XTY_IMAGE_MODEL'] || 'gemini-3.1-flash-image-preview';

class XTYImageClientImpl {
    constructor(client, defaultQuality = 'fast') {
        this.client = client;
        this.defaultQuality = defaultQuality;
        this.modelName = XTY_IMAGE_MODEL;
    }

    async generateImage(params) {
        try {
            const messages = [
                {
                    role: 'user',
                    content: params.prompt,
                },
            ];

            const response = await this.client.chat.completions.create({
                model: this.modelName,
                messages,
                n: 1,
            });

            const choice = response.choices?.[0];
            if (!choice?.message?.content) {
                return Err(new ImageAPIError('No content returned from XTY image API', {
                    provider: 'xty',
                    model: this.modelName,
                    stage: 'image_extraction',
                    suggestion: 'Retry the request or check the API response format',
                }));
            }

            const content = choice.message.content;
            let imageData;

            // Parse response: may be markdown image link or data URI
            if (content.includes('![')) {
                // Markdown format: ![image](url_or_data_uri)
                const start = content.indexOf('](') + 2;
                const end = content.indexOf(')', start);
                const urlOrData = content.substring(start, end);

                if (urlOrData.startsWith('data:')) {
                    // data:image/png;base64,xxxxx
                    const base64Data = urlOrData.substring(urlOrData.indexOf(',') + 1);
                    imageData = Buffer.from(base64Data, 'base64');
                } else {
                    // URL - download the image
                    const fetchResponse = await fetch(urlOrData);
                    const arrayBuffer = await fetchResponse.arrayBuffer();
                    imageData = Buffer.from(arrayBuffer);
                }
            } else if (content.trim().startsWith('data:')) {
                // Direct data URI
                const base64Data = content.trim().substring(content.trim().indexOf(',') + 1);
                imageData = Buffer.from(base64Data, 'base64');
            } else {
                // Try treating the whole content as a URL
                try {
                    const fetchResponse = await fetch(content.trim());
                    const arrayBuffer = await fetchResponse.arrayBuffer();
                    imageData = Buffer.from(arrayBuffer);
                } catch {
                    return Err(new ImageAPIError('Could not parse image data from XTY API response', {
                        provider: 'xty',
                        model: this.modelName,
                        stage: 'image_extraction',
                        contentPrefix: content.substring(0, 100),
                        suggestion: 'Check if the API returns image data in the expected format',
                    }));
                }
            }

            // Detect mime type from the data
            let mimeType = 'image/png';
            if (imageData[0] === 0xFF && imageData[1] === 0xD8) {
                mimeType = 'image/jpeg';
            } else if (imageData[0] === 0x52 && imageData[1] === 0x49 && imageData[2] === 0x46 && imageData[3] === 0x46) {
                mimeType = 'image/webp';
            }

            return Ok({
                imageData,
                metadata: {
                    model: this.modelName,
                    provider: 'xty',
                    prompt: params.prompt,
                    mimeType,
                    timestamp: new Date(),
                    inputImageProvided: !!params.inputImage,
                },
            });
        } catch (error) {
            return this.handleError(error, params.prompt);
        }
    }

    handleError(error, prompt) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        if (isNetworkError(error)) {
            return Err(new NetworkError('Network error during XTY image generation', 'Check your internet connection and try again', error instanceof Error ? error : undefined));
        }
        return Err(new ImageAPIError('Failed to generate image with XTY', {
            provider: 'xty',
            prompt,
            upstreamMessage: errorMessage,
            suggestion: this.getAPIErrorSuggestion(errorMessage),
        }, extractStatusCode(error)));
    }

    getAPIErrorSuggestion(errorMessage) {
        const lowerMessage = errorMessage.toLowerCase();
        if (lowerMessage.includes('quota') || lowerMessage.includes('rate limit')) {
            return 'You have exceeded your API quota or rate limit. Wait before retrying or upgrade your plan';
        }
        if (lowerMessage.includes('unauthorized') || lowerMessage.includes('api key')) {
            return 'Check that your API key is valid';
        }
        return 'Check API configuration and try again';
    }
}

/**
 * Creates a new XTY image client.
 */
export function createXTYImageClient(config) {
    try {
        const client = new OpenAI({
            apiKey: config.openaiApiKey,
            baseURL: process.env['OPENAI_BASE_URL'] || 'https://api.xty.app/v1',
        });
        return Ok(new XTYImageClientImpl(client, config.imageQuality));
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return Err(new ImageAPIError(`Failed to initialize XTY image client: ${errorMessage}`, 'Verify your API key is valid'));
    }
}
