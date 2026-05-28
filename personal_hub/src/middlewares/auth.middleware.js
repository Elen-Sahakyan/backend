const path = require('node:path');

const {     
    verifyToken,
    AppError
} = require(path.join(process.cwd(), 'utils'));

exports.auth = (req, res, next) => {
    let token = null;

    const authHeader = req.headers.authorization;

    if(authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }

    if(!token && req.cookies.token) {
        token = req.cookies.token;
    }

    if(!token) {
        throw new AppError('Login Required', 401);
    }

    const decoded = verifyToken(token);

    req.user = decoded;

    next();
}
