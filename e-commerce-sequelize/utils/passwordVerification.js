const bcrypt = require('bcrypt');
const { 
  BCRYPT_ROUNDS
} = require('../config/env');

const hashPass = async (password) => {
    return await bcrypt.hash(password, parseInt(BCRYPT_ROUNDS));
}

const comparePass = async (rawPassword, hashedPassword) => {
    return await bcrypt.compare(rawPassword, hashedPassword);
}

module.exports = {
    hashPass,
    comparePass
}