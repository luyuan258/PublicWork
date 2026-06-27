/**
 * Shared error classification helpers for API client implementations.
 * Used by both Gemini and OpenAI clients to identify network failures
 * and extract HTTP status codes from SDK errors.
 */
const NETWORK_ERROR_CODES = ['ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT', 'ENOTFOUND'];
export function isNetworkError(error) {
    if (!(error instanceof Error)) {
        return false;
    }
    return NETWORK_ERROR_CODES.some((code) => error.message.includes(code) || error.code === code);
}
export function extractStatusCode(error) {
    if (error && typeof error === 'object' && 'status' in error) {
        const status = error.status;
        return typeof status === 'number' ? status : undefined;
    }
    return undefined;
}
//# sourceMappingURL=errorClassification.js.map