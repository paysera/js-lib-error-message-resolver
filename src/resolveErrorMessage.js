import isFunction from 'lodash/isFunction';

import isHttpError from './util/isHttpError';
import resolveHttpErrorMessage from './resolveHttpErrorMessage';

/**
 * @param {*} error
 * @param {ErrorMessageConfig} message
 *
 * @returns {Promise<?string>}
 */
export default async (error, message) => {
    if (isHttpError(error)) {
        return resolveHttpErrorMessage(error, message.getHttpMessageConfig());
    }

    const customMessage = isFunction(message.getCustom()) ? (message.getCustom())(error) : null;

    return customMessage === null ? message.getDefault() : customMessage;
};
