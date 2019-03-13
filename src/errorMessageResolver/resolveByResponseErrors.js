import isObject from 'lodash/isObject';
import isUndefined from 'lodash/isUndefined';

/**
 * @param {ErrorResponse} errorResponse
 *
 * @returns {null|string}
 */
export default (errorResponse) => {
    const { errors = [] } = errorResponse.getData() || {};

    const firstErrorMessage = errors.find(error => (
        isObject(error)
        && !isUndefined(error.message)
    ));

    return isUndefined(firstErrorMessage) ? null : firstErrorMessage.message;
};
