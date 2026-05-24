require('dotenv').config({ quiet: true });
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });
    return token;
}

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = { generateToken, verifyToken };

