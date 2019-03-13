import i18next from 'i18next';

import responseErrorCondition from './responseErrorCondition';
import ErrorDataMessageConfig from '../entity/ErrorDataMessageConfig';

/**
 * @param {ErrorResponse} errorResponse
 *
 * @returns {Promise<?string>}
 */
export default async (errorResponse) => {
    await i18next.loadNamespaces('error-message-resolver');
    const t = i18next.getFixedT(null, 'error-message-resolver');

    const defaultMessage = (new ErrorDataMessageConfig())
        .setConfig({
            invalid_request: t('invalid_request'),
            invalid_parameters: t('invalid_parameters'),
            forbidden: t('forbidden'),
            internal_server_error: t('internal_server_error'),
        });

    return await responseErrorCondition(errorResponse, defaultMessage) || null;
};
