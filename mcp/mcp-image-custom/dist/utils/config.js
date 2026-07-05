/**
 * Configuration management for MCP server
 * Handles environment variables and configuration validation
 */
import { IMAGE_PROVIDER_VALUES, IMAGE_QUALITY_VALUES } from '../types/mcp.js';
import { Err, Ok } from '../types/result.js';
import { ConfigError } from './errors.js';
/**
 * Default configuration values
 */
const DEFAULT_CONFIG = {
    imageProvider: 'gemini',
    imageOutputDir: './output',
    apiTimeout: 30000, // 30 seconds
};
function readEnv(name) {
    const value = process.env[name];
    if (!value || value === 'undefined' || value === 'null') {
        return undefined;
    }
    return value;
}
/**
 * Validates the configuration
 * @param config The configuration to validate
 * @returns Result containing validated config or ConfigError
 */
export function validateConfig(config) {
    // Validate IMAGE_PROVIDER
    if (!IMAGE_PROVIDER_VALUES.includes(config.imageProvider)) {
        return Err(new ConfigError(`Invalid IMAGE_PROVIDER value: "${config.imageProvider}". Valid options: ${IMAGE_PROVIDER_VALUES.join(', ')}`, `Set IMAGE_PROVIDER to one of: ${IMAGE_PROVIDER_VALUES.join(', ')}`));
    }
    // Validate GEMINI_API_KEY only when Gemini is the selected provider.
    if (config.imageProvider === 'gemini' &&
        (!config.geminiApiKey || config.geminiApiKey.trim().length === 0)) {
        return Err(new ConfigError('GEMINI_API_KEY is required but not provided', 'Set GEMINI_API_KEY environment variable with your Google AI API key'));
    }
    if (config.imageProvider === 'gemini' && config.geminiApiKey.length < 10) {
        return Err(new ConfigError('GEMINI_API_KEY appears to be invalid - must be at least 10 characters', 'Set the GEMINI_API_KEY environment variable to your valid Google AI API key'));
    }
    // Validate OPENAI_API_KEY when OpenAI or XTY is the selected provider.
    if ((config.imageProvider === 'openai' || config.imageProvider === 'xty') &&
        (!config.openaiApiKey || config.openaiApiKey.trim().length === 0)) {
        return Err(new ConfigError('OPENAI_API_KEY is required but not provided', 'Set OPENAI_API_KEY environment variable with your API key'));
    }
    if ((config.imageProvider === 'openai' || config.imageProvider === 'xty') && config.openaiApiKey.length < 10) {
        return Err(new ConfigError('OPENAI_API_KEY appears to be invalid - must be at least 10 characters', 'Set the OPENAI_API_KEY environment variable to your valid API key'));
    }
    // Validate apiTimeout
    if (config.apiTimeout <= 0) {
        return Err(new ConfigError('API timeout must be a positive number', 'Set a positive timeout value in milliseconds (e.g., 30000 for 30 seconds)'));
    }
    // Validate imageOutputDir (basic check - non-empty string)
    if (!config.imageOutputDir || config.imageOutputDir.trim().length === 0) {
        return Err(new ConfigError('IMAGE_OUTPUT_DIR cannot be empty', 'Set IMAGE_OUTPUT_DIR to a valid directory path'));
    }
    // Validate imageQuality
    if (!IMAGE_QUALITY_VALUES.includes(config.imageQuality)) {
        return Err(new ConfigError(`Invalid IMAGE_QUALITY value: "${config.imageQuality}". Valid options: ${IMAGE_QUALITY_VALUES.join(', ')}`, `Set IMAGE_QUALITY to one of: ${IMAGE_QUALITY_VALUES.join(', ')}`));
    }
    return Ok(config);
}
/**
 * Loads configuration from environment variables
 * @returns Result containing config or ConfigError
 */
export function getConfig() {
    const config = {
        imageProvider: (readEnv('IMAGE_PROVIDER') || DEFAULT_CONFIG.imageProvider),
        geminiApiKey: readEnv('GEMINI_API_KEY') || '',
        openaiApiKey: readEnv('OPENAI_API_KEY') || '',
        imageOutputDir: readEnv('IMAGE_OUTPUT_DIR') || DEFAULT_CONFIG.imageOutputDir,
        apiTimeout: DEFAULT_CONFIG.apiTimeout,
        skipPromptEnhancement: readEnv('SKIP_PROMPT_ENHANCEMENT') === 'true',
        imageQuality: (readEnv('IMAGE_QUALITY') || 'fast'),
    };
    return validateConfig(config);
}
//# sourceMappingURL=config.js.map