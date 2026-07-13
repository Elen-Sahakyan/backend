const AppError = require('./appError');

class UnauthorizedError extends AppError {
    constructor(message = 'Forbidden', errorCode = 'NOT_AUTHORIZED') {
        super(message, 403, errorCode);
    }
}

module.exports = UnauthorizedError;