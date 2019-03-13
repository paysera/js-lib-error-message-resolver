import isUndefined from 'lodash/isUndefined';

export default class ErrorDataMessageConfig {
    constructor() {
        /**
         * @type {?Object}
         */
        this.config = null;
    }

    static merge(errorDataConfig, sourceErrorDataConfig) {
        const config = {
            ...(errorDataConfig.getConfig() || {}),
            ...(sourceErrorDataConfig.getConfig() || {}),
        };

        return (new ErrorDataMessageConfig()).setConfig(Object.keys(config) ? config : null);
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
     * @returns {ErrorDataMessageConfig}
     */
    setConfig(value) {
        this.config = value;

        return this;
    }
}
