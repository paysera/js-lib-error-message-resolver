import isNumber from 'lodash/isNumber';
import isFunction from 'lodash/isFunction';
import moment from 'moment';
// TODO: import moment from '@appJs/momentWithLocale';

/**
 * @param {ErrorResponse} errorResponse
 * @param {?(string|function)} tooManyRequestMessage
 *
 * @returns {?string}
 */
export default (errorResponse, tooManyRequestMessage) => {
    const { error = null, error_properties: errorProperties = { wait_for: null } } = errorResponse.getData() || {};
    if (errorResponse.getStatus() !== 429 && error !== 'rate_limit_exceeded') {
        return null;
    }

    if (!isFunction(tooManyRequestMessage)) {
        return tooManyRequestMessage;
    }

    let waitFor = null;
    if (error === 'rate_limit_exceeded') {
        waitFor = isNumber(errorProperties.wait_for) ? errorProperties.wait_for : null;
    } else {
        const { headers } = errorResponse;
        waitFor = isNumber(headers['gf-wait-for']) ? headers['gf-wait-for'] : null;
    }

    if (waitFor !== null) {
        waitFor = moment.duration(parseInt(waitFor, 10), 'seconds');
    }

    return tooManyRequestMessage(errorResponse, waitFor);
};
