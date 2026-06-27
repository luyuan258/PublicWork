/**
 * Shared error classification helpers for API client implementations.
 * Used by both Gemini and OpenAI clients to identify network failures
 * and extract HTTP status codes from SDK errors.
 */
export interface ErrorWithCode extends Error {
    code?: string;
    status?: number;
}
export declare function isNetworkError(error: unknown): boolean;
export declare function extractStatusCode(error: unknown): number | undefined;
//# sourceMappingURL=errorClassification.d.ts.map