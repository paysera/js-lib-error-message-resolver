class ErrorMessage {
    /**
     * @param {string} primary
     * @param {string[]} secondary
     */
    constructor(primary, secondary = []) {
        this.primary = primary;
        this.secondary = secondary;
    }

    /**
     * @param {string} primary
     *
     * @returns {ErrorMessage}
     */
    setPrimary(primary) {
        this.primary = primary;

        return this;
    }

    /**
     * @returns {string}
     */
    getPrimary() {
        return this.primary;
    }

    /**
     * @param {string[]} secondary
     *
     * @returns {ErrorMessage}
     */
    setSecondary(secondary) {
        this.secondary = secondary;

        return this;
    }

    /**
     * @returns {string[]}
     */
    getSecondary() {
        return this.secondary;
    }
}

export default ErrorMessage;
