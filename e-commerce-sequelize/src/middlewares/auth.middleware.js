const {
    verifyToken
} = require('../../utils/tokenVerification');
const { NotAuthenticatedError } = require('../errors');


const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) throw new NotAuthenticatedError();

    const decoded = verifyToken(token);
    
    req.user = decoded;

    next();
}

module.exports = authMiddleware;