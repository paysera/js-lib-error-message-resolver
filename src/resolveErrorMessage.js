import isFunction from 'lodash/isFunction';

import isHttpError from './util/isHttpError';
import resolveHttpErrorMessage from './resolveHttpErrorMessage';
import resolveErrorSecondaryMessages from './resolveErrorSecondaryMessages';
import ErrorMessage from './entity/ErrorMessage';

const resolvePrimaryMessage = (error, messageConfig) => {
    if (isHttpError(error)) {
        return resolveHttpErrorMessage(error, messageConfig.getHttpMessageConfig());
    }

    const customMessage = isFunction(messageConfig.getCustom()) ? (messageConfig.getCustom())(error) : null;

    return customMessage === null ? messageConfig.getDefault() : customMessage;
};

/**
 * @param {*} error
 * @param {ErrorMessageConfig} messageConfig
 *
 * @returns {Promise<ErrorMessage>}
 */
export default async (error, messageConfig) => new ErrorMessage(
    await resolvePrimaryMessage(error, messageConfig),
    await resolveErrorSecondaryMessages(error),
);
