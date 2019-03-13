export default class ErrorMessageConfig {
    constructor(httpMessageConfig, defaultMessage) {
        /**
         * @type {HttpErrorMessageConfig}
         */
        this.httpMessageConfig = httpMessageConfig;
        /**
         * @type {string}
         */
        this.default = defaultMessage;

        /**
         * @type {?function(error)}
         */
        this.custom = null;
    }

    /**
     * @returns {?function(error)}
     */
    getCustom() {
        return this.custom;
    }

    /**
     * @param {?function(error)} value
     *
     * @returns {this}
     */
    setCustom(value) {
        this.custom = value;

        return this;
    }

    /**
     * @returns {HttpErrorMessageConfig}
     */
    getHttpMessageConfig() {
        return this.httpMessageConfig;
    }

    /**
     * @returns {?string}
     */
    getDefault() {
        return this.default;
    }

    /**
     * @param {?string} value
     *
     * @returns {this}
     */
    setDefault(value) {
        this.default = value;

        return this;
    }
}
