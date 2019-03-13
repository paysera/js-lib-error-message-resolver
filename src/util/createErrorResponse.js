import get from 'lodash/get';

import ErrorResponse from '../entity/ErrorResponse';

/**
 * @param {*} error
 *
 * @returns {ErrorResponse}
 */
export default (error) => {
    const errorResponse = new ErrorResponse();

    return errorResponse
        .setStatus(get(error, 'response.status'))
        .setData(get(error, 'response.data'))
        .setHeaders(get(error, 'response.headers'));
};
