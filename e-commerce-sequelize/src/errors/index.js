const BadRequestError = require('./badRequestError');
const ConflictError = require('./conflictError');
const NotAuthenticatedError = require('./notAuthenticatedError');
const UnauthorizedError = require('./unauthorizedError');
const NotFoundError = require('./notFoundError');
const ValidationError = require('./validationError');

module.exports = {
    BadRequestError,
    ConflictError,
    NotAuthenticatedError,
    UnauthorizedError,
    NotFoundError,
    ValidationError
}