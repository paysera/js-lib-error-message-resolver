import isUndefined from 'lodash/isUndefined';

import resolveTooManyRequest from '../errorMessageResolver/resolveTooManyRequest';

/**
 * @param {ErrorResponse} errorResponse
 * @param {?string|function} tooManyRequestsErrorMessage
 *
 * @returns {?string}
 */
export default (errorResponse, tooManyRequestsErrorMessage) => {
    if (isUndefined(tooManyRequestsErrorMessage)) {
        return null;
    }

    return resolveTooManyRequest(errorResponse, tooManyRequestsErrorMessage) || null;
};
