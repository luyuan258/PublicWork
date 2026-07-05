/**
 * Configuration management for MCP server
 * Handles environment variables and configuration validation
 */
import type { ImageProvider, ImageQuality } from '../types/mcp.js';
import type { Result } from '../types/result.js';
import { ConfigError } from './errors.js';
/**
 * Configuration interface
 */
export interface Config {
    imageProvider: ImageProvider;
    geminiApiKey: string;
    openaiApiKey: string;
    imageOutputDir: string;
    apiTimeout: number;
    skipPromptEnhancement: boolean;
    imageQuality: ImageQuality;
}
/**
 * Validates the configuration
 * @param config The configuration to validate
 * @returns Result containing validated config or ConfigError
 */
export declare function validateConfig(config: Config): Result<Config, ConfigError>;
/**
 * Loads configuration from environment variables
 * @returns Result containing config or ConfigError
 */
export declare function getConfig(): Result<Config, ConfigError>;
//# sourceMappingURL=config.d.ts.map