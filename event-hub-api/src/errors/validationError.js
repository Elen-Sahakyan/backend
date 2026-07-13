const AppError = require('./appError');

class ValidationError extends AppError {
    constructor(errors) {
        super('Validation failed', 400, 'VALIDATION_ERR');

        this.errors = errors;
    }
}

module.exports = ValidationError;
