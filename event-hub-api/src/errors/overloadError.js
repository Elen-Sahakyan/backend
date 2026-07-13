const AppError = require('./appError');

class OverloadError extends AppError {
    constructor(message = 'Event is full', errorCode = 'CAPACITY_ERR') {
        super(message, 400, errorCode);
    }
}

module.exports = OverloadError; 