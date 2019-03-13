/**
 * @param {Array.<function>} conditions
 *
 * @returns {Promise<?string>}
 */
export default async (conditions) => {
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < conditions.length; index++) {
        const condition = conditions[index];
        // eslint-disable-next-line no-await-in-loop
        const conditionMessage = await condition();
        if (conditionMessage !== null) {
            return conditionMessage;
        }
    }

    return null;
};
