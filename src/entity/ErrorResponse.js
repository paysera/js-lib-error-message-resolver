export default class ErrorResponse {
    constructor() {
        /**
         * @type {?number}
         */
        this.status = null;
        /**
         * @type {?Object}
         */
        this.data = null;
        /**
         * @type {?Object}
         */
        this.headers = null;
    }

    /**
     * @returns {?number}
     */
    getStatus() {
        return this.status;
    }

    /**
     * @param {?number} value
     *
     * @returns {ErrorResponse}
     */
    setStatus(value) {
        this.status = value;

        return this;
    }

    /**
     * @returns {?Object}
     */
    getData() {
        return this.data;
    }

    /**
     * @param {?Object} value
     *
     * @returns {ErrorResponse}
     */
    setData(value) {
        this.data = value;

        return this;
    }

    /**
     * @returns {?Object}
     */
    getHeaders() {
        return this.headers;
    }

    /**
     * @param {?Object} value
     *
     * @returns {ErrorResponse}
     */
    setHeaders(value) {
        this.headers = value;

        return this;
    }
}
