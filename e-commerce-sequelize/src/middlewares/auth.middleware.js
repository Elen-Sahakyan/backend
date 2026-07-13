const {
    verifyToken
} = require('../../utils/tokenVerification');
const { NotAuthenticatedError } = require('../errors');


const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) throw new NotAuthenticatedError();
    
    try {
        decoded = verifyToken(accessToken);
        req.user = decoded;
        next();
    } catch (error) {
        next(new NotAuthenticatedError('Token invalid or expired', 'TOKEN_INVALID'));
    }
}

module.exports = authMiddleware;