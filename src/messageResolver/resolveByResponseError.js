import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';

/**
 * @param {ErrorResponse} errorResponse
 * @param {ErrorDataMessageConfig} errorDataMessage
 *
 * @returns {Promise<null|string>}
 */
export default async (errorResponse, errorDataMessage) => {
    const { error = null } = errorResponse.getData() || {};
    const message = (isString(error) || isNumber(error)) ? errorDataMessage.getValueByKey(error) : null;

    if (
        !error
        || message === null
    ) {
        return null;
    }

    if (isFunction(message)) {
        return message(errorResponse);
    }

    return message;
};
