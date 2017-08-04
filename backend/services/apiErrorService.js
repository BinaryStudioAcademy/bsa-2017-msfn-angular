function ApiError(message) {
    this.message = {
        error: message
    };
}

module.exports = ApiError;
