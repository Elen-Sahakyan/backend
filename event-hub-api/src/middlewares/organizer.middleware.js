const { UnauthorizedError } = require('../errors');

const organizerMiddleware = (req, res, next) => {
    if(req.user.role != 'organizer') {
        next(new UnauthorizedError());
    }

    next();
}

module.exports = organizerMiddleware;