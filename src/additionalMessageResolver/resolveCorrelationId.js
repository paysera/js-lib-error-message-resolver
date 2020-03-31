import isUndefined from 'lodash/isUndefined';
import i18next from 'i18next';

import isHttpError from '../util/isHttpError';
import isNetworkError from '../util/isNetworkError';
import createErrorResponse from '../util/createErrorResponse';

const resolveCorrelationId = async (error) => {
    if (
        !isHttpError(error)
        || isNetworkError(error)
    ) {
        return null;
    }

    const errorResponse = createErrorResponse(error);
    if (
        errorResponse.getStatus() < 500
        && errorResponse.getStatus() !== 401
        && errorResponse.getStatus() !== 403
    ) {
        return null;
    }

    const correlationId = errorResponse.getHeaders()['paysera-correlation-id'];
    if (isUndefined(correlationId)) {
        return null;
    }

    await i18next.loadNamespaces('error-message-resolver');
    const t = i18next.getFixedT(null, 'error-message-resolver');

    return t('error_code', { correlationId });
};

export default resolveCorrelationId;
