/**
 * @param {ErrorResponse} errorResponse
 *
 * @returns {?string}
 */
export default (errorResponse) => {
    const { error = null, messages = [] } = errorResponse.getData() || {};

    if (
        errorResponse.getStatus() === 503
        && error === 'maintenance'
        && Array.isArray(messages)
        && messages.length > 0
    ) {
        // TODO: may be more than one message in theory...
        return messages[0];
    }

    return null;
};
