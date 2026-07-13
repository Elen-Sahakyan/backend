const AppError = require('./appError');

class ConflictError extends AppError {
    constructor(message = 'Conflict', errorCode = 'CONFLICT') {
        super(message, 409, errorCode);
    }
}

module.exports = ConflictError; 