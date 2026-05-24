require('dotenv').config({ quiet: true });
const bcrypt = require('bcrypt');
const SALT_ROUNDS = process.env.SALT_ROUNDS;

const hashPass = async(password) => {
    const hashedPass = await bcrypt.hash(password, parseInt(SALT_ROUNDS));
    return hashedPass;
}

const verifyPass = async(password, hashedPass) => {
    const match = await bcrypt.compare(password, hashedPass);
    return match;
}

module.exports = { hashPass, verifyPass };

