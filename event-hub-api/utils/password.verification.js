const { BCRYPT_ROUNDS } = require('../config/env');
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    return bcrypt.hash(password, parseInt(BCRYPT_ROUNDS));
}

const verifyPassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

module.exports = {
    hashPassword,
    verifyPassword
}