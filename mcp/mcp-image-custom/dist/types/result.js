/**
 * Result type for operations that may fail
 * Provides type-safe error handling with discriminated unions
 */
/**
 * Helper function to create a successful Result
 * @param data The data to wrap in a successful Result
 * @returns A successful Result containing the data
 */
export function Ok(data) {
    return {
        success: true,
        data,
    };
}
/**
 * Helper function to create an error Result
 * @param error The error to wrap in a failed Result
 * @returns A failed Result containing the error
 */
export function Err(error) {
    return {
        success: false,
        error,
    };
}
//# sourceMappingURL=result.js.map