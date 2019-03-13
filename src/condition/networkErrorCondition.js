import i18next from 'i18next';
import isString from 'lodash/isString';

import isNetworkError from '../util/isNetworkError';

/**
 * @param {*} error
 * @param {string} networkErrorMessage
 *
 * @returns {Promise<?string>}
 */
export default async (error, networkErrorMessage) => {
    if (!isNetworkError(error)) {
        return null;
    }

    if (isString(networkErrorMessage)) {
        return networkErrorMessage;
    }

    await i18next.loadNamespaces('error-message-resolver');

    return i18next.t('error-message-resolver:network_error');
};
