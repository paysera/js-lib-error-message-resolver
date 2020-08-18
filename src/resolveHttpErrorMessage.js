import get from 'lodash/get';
import isFunction from 'lodash/isFunction';

import isHttpError from './util/isHttpError';
import createErrorResponse from './util/createErrorResponse';
import resolveByResponseErrors from './messageResolver/resolveByResponseErrors';

import findFirstNotNullCondition from './condition/findFirstNotNullCondition';
import defaultErrorMessageCondition from './condition/defaultErrorMessageCondition';
import networkErrorCondition from './condition/networkErrorCondition';
import responseErrorCondition from './condition/responseErrorCondition';
import responseStatusErrorCondition from './condition/responseStatusErrorCondition';
import tooManyRequestsErrorCondition from './condition/tooManyRequestsErrorCondition';
import maintenanceCondition from './condition/maintenanceCondition';
import { resolveErrorResponseDescription } from './condition/resolveErrorResponseDescription';

/**
 * @param {*} error
 * @param {HttpErrorMessageConfig} message
 *
 * @returns {Promise<?string>}
 */
export default async (error, message) => {
    if (!isHttpError(error)) {
        return message.getDefault();
    }

    const networkErrorMessage = await networkErrorCondition(error, message.getNetwork());
    if (networkErrorMessage) {
        return networkErrorMessage;
    }

    const errorResponse = createErrorResponse(error);
    const conditions = [
        () => (isFunction(message.getCustom()) ? (message.getCustom())(errorResponse) : null),
        () => maintenanceCondition(errorResponse),
        () => responseErrorCondition(errorResponse, message.getErrorData()),
        () => tooManyRequestsErrorCondition(errorResponse, message.getTooManyRequests()),
        () => responseStatusErrorCondition(errorResponse, message.getStatus()),
        () => resolveByResponseErrors(errorResponse),
        () => resolveErrorResponseDescription(errorResponse),
        () => defaultErrorMessageCondition(errorResponse),
    ];

    const errorMessage = await findFirstNotNullCondition(conditions);

    return errorMessage !== null ? errorMessage : message.getDefault();
};
