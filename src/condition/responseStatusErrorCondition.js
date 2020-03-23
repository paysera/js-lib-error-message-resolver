import resolveByResponseStatus from '../messageResolver/resolveByResponseStatus';

/**
 * @param {ErrorResponse} errorResponse
 * @param {?ErrorStatusMessageConfig} messagesByStatus
 *
 * @returns {?string}
 */
export default (errorResponse, messagesByStatus) => {
    if (messagesByStatus === null) {
        return null;
    }

    return resolveByResponseStatus(errorResponse, messagesByStatus) || null;
};
