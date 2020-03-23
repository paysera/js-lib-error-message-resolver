import resolveCorrelationId from './additionalMessageResolver/resolveCorrelationId';

/**
 * @param error
 * @returns {Promise<string[]>}
 */
const resolveErrorSecondaryMessages = async (error) => {
    const messages = await Promise.all([
        resolveCorrelationId(error),
    ]);

    return messages.filter(message => message !== null);
};

export default resolveErrorSecondaryMessages;
