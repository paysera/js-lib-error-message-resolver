import resolveByResponseError from '../errorMessageResolver/resolveByResponseError';

/**
 * @param {ErrorResponse} errorResponse
 * @param {?ErrorDataMessageConfig} messagesByError
 *
 * @returns {?string}
 */
export default (errorResponse, messagesByError) => {
    if (messagesByError === null) {
        return null;
    }

    return resolveByResponseError(errorResponse, messagesByError) || null;
};
