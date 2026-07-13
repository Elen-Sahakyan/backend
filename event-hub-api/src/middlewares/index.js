const authMiddleware = require('./auth.middleware');
const errorMiddleware = require('./error.middleware');
const notFoundMiddleware = require('./notFound.middleware');
const organizerMiddleware = require('./organizer.middleware');
const validationMiddleware = require('./validation.middleware');

module.exports = {
    authMiddleware,
    errorMiddleware,
    notFoundMiddleware,
    organizerMiddleware,
    validationMiddleware
}