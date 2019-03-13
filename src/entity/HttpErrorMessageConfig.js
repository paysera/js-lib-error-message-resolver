import ErrorDataMessageConfig from './ErrorDataMessageConfig';
import ErrorStatusMessageConfig from './ErrorStatusMessageConfig';

export default class HttpErrorMessageConfig {
    /**
     * @param {string} defaultMessage
     */
    constructor(defaultMessage) {
        /**
         * @type {string}
         */
        this.default = defaultMessage;
        /**
         * @type {?string}
         */
        this.network = null;
        /**
         * @type {?function(ErrorResponse)}
         */
        this.custom = null;
        /**
         * @type {?ErrorDataMessageConfig}
         */
        this.errorData = null;
        /**
         * @type {?(string|function)}
         */
        this.tooManyRequests = null;
        /**
         * @type {?ErrorStatusMessageConfig}
         */
        this.status = null;
    }

    /**
     * @param {HttpErrorMessageConfig} messageConfig
     * @param {HttpErrorMessageConfig} sourceMessageConfig
     *
     * @return {HttpErrorMessageConfig}
     */
    static merge(messageConfig, sourceMessageConfig) {
        const mergedMessageConfig = new HttpErrorMessageConfig(
            messageConfig.getDefault() || sourceMessageConfig.getDefault(),
        );

        mergedMessageConfig.setNetwork(messageConfig.getNetwork() || sourceMessageConfig.getNetwork());
        mergedMessageConfig.setCustom(messageConfig.getCustom() || sourceMessageConfig.getCustom());
        mergedMessageConfig.setTooManyRequests(
            messageConfig.getTooManyRequests() || sourceMessageConfig.getTooManyRequests(),
        );

        if (
            sourceMessageConfig.getErrorData() !== null
            || messageConfig.getErrorData() !== null
        ) {
            mergedMessageConfig.setErrorData(ErrorDataMessageConfig.merge(
                sourceMessageConfig.getErrorData() || new ErrorDataMessageConfig(),
                messageConfig.getErrorData() || new ErrorDataMessageConfig(),
            ));
        }

        if (
            sourceMessageConfig.getStatus() !== null
            || messageConfig.getStatus() !== null
        ) {
            mergedMessageConfig.setStatus(ErrorStatusMessageConfig.merge(
                sourceMessageConfig.getStatus() || new ErrorStatusMessageConfig(),
                messageConfig.getStatus() || new ErrorStatusMessageConfig(),
            ));
        }

        return mergedMessageConfig;
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
     * @returns {HttpErrorMessageConfig}
     */
    setDefault(value) {
        this.default = value;

        return this;
    }

    /**
     * @returns {?string}
     */
    getNetwork() {
        return this.network;
    }

    /**
     * @param {?string} value
     *
     * @returns {HttpErrorMessageConfig}
     */
    setNetwork(value) {
        this.network = value;

        return this;
    }

    /**
     * @returns {?function(ErrorResponse)}
     */
    getCustom() {
        return this.custom;
    }

    /**
     * @param {?function(ErrorResponse)} value
     *
     * @returns {HttpErrorMessageConfig}
     */
    setCustom(value) {
        this.custom = value;

        return this;
    }

    /**
     * @returns {?ErrorDataMessageConfig}
     */
    getErrorData() {
        return this.errorData;
    }

    /**
     * @param {?ErrorDataMessageConfig} value
     *
     * @returns {HttpErrorMessageConfig}
     */
    setErrorData(value) {
        this.errorData = value;

        return this;
    }

    /**
     * @returns {?(string|function)}
     */
    getTooManyRequests() {
        return this.tooManyRequests;
    }

    /**
     * @param {?(string|function)} value
     *
     * @returns {HttpErrorMessageConfig}
     */
    setTooManyRequests(value) {
        this.tooManyRequests = value;

        return this;
    }

    /**
     * @returns {?ErrorStatusMessageConfig}
     */
    getStatus() {
        return this.status;
    }

    /**
     * @param {?ErrorStatusMessageConfig} value
     *
     * @returns {HttpErrorMessageConfig}
     */
    setStatus(value) {
        this.status = value;

        return this;
    }
}
