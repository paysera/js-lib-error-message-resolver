import get from 'lodash/get';

export const resolveErrorResponseDescription = (errorResponse) => {
    if (errorResponse.getStatus() === 500) {
        return null;
    }
    return get(errorResponse.getData(), 'error_description', null);
};
