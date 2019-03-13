import isUndefined from 'lodash/isUndefined';

export default class ErrorStatusMessageConfig {
    constructor() {
        /**
         * @type {?Object}
         */
        this.config = null;
    }

    static merge(statusConfig, sourceStatusConfig) {
        const config = {
            ...(statusConfig.getConfig() || {}),
            ...(sourceStatusConfig.getConfig() || {}),
        };

        return (new ErrorStatusMessageConfig()).setConfig(Object.keys(config) ? config : null);
    }

    /**
     * @returns {?Object}
     */
    getConfig() {
        return this.config;
    }

    /**
     * @param {string|number} key
     *
     * @returns {?(string|function)}
     */
    getValueByKey(key) {
        return this.config === null || isUndefined(this.config[key]) ? null : this.config[key];
    }

    /**
     * @param {?Object} value
     *
     * @returns {ErrorStatusMessageConfig}
     */
    setConfig(value) {
        this.config = value;

        return this;
    }
}
