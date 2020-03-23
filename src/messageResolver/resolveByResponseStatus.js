import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';

/**
 * @param {ErrorResponse} errorResponse
 * @param {ErrorStatusMessageConfig} statusMessage
 *
 * @returns {?string}
 */
export default (errorResponse, statusMessage) => {
    const message = statusMessage.getValueByKey(errorResponse.getStatus());
    if (isUndefined(message)) {
        return null;
    }

    if (!isFunction(message)) {
        return message;
    }

    return message(errorResponse);
};
