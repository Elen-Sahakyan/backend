const adminMiddleware = require('./admin.middleware');
const authMiddleware = require('./auth.middleware');
const errorMiddleware = require('./error.middleware');
const notFoundMiddleware = require('./notFound.middleware');
const validateMiddleware = require('./validate.middleware');

module.exports = {
    adminMiddleware,
    authMiddleware,
    errorMiddleware,
    notFoundMiddleware,
    validateMiddleware
} 