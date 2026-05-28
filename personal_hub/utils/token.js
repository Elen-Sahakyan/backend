const {JWT_SECRET, JWT_EXPIRATION} = require('../src/config/env');
const jwt = require('jsonwebtoken');

exports.createToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    return token;
}

exports.verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}