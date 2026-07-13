const jwt = require('jsonwebtoken');
const {
    JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRATION,
    JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRATION
} = require('../config/env');

const createAccessToken = (payload) => {
    return jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: JWT_ACCESS_EXPIRATION});
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: JWT_REFRESH_EXPIRATION});
}

const verifyAcessToken = (token) => {
    return jwt.verify(token, JWT_ACCESS_SECRET);
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, JWT_REFRESH_SECRET);
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    verifyAcessToken,
    verifyRefreshToken
}