const path = require('node:path');
const tokenPath = path.join(process.cwd(), 'utils', 'jwtToken.js');
const { verifyToken } = require(tokenPath);

const authenticate = (req, res, next) => {
    const { token } = req.cookies;

    if(!token) {
        return res.status(401).json({ 
            message: "no token provided" 
        });
    }
    
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({
            message: 'login time expired, please sign in'
        });
    }
}

module.exports = authenticate;