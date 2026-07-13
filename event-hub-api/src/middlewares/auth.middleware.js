const { verifyAcessToken } = require('../../utils');
const { NotAuthenticatedError } = require('../errors');

/**
 * Verifies the access token and attaches the user to the request.
 */
const authMiddleware = async (req, res, next) => {
    const { accessToken } = req.cookies;    
    if(!accessToken) {
        return next(new NotAuthenticatedError('Login required', 'TOKEN_MISSING'));
    }
    try {
        decoded = verifyAcessToken(accessToken);
        req.user = decoded;
        next();
    } catch (error) {
        next(new NotAuthenticatedError('Token invalid or expired', 'TOKEN_INVALID'));
    }
}

module.exports = authMiddleware;