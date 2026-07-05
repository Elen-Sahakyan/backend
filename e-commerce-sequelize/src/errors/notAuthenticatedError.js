const AppError = require('./appError');

class NotAuthenticatedError extends AppError {
    constructor(message = 'Login required', errorCode = 'NOT_AUTHENTICATED') {
        super(message, 401, errorCode);
    }
}

module.exports = NotAuthenticatedError; 