const { UnauthorizedError } = require('../errors');

const adminMiddleware = (req, res, next) => {
    if(req.user.role != 'admin') {
        throw new UnauthorizedError();
    }

    next();
}

module.exports = adminMiddleware;