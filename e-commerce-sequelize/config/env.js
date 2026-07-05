require('dotenv').config({ quiet: true });

const {
    PORT, 
    HOST,
    DB_PORT,
    JWT_SECRET,
    JWT_EXPIRATION,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
    BCRYPT_ROUNDS
} = process.env;

module.exports = {
    PORT,
    HOST,
    DB_PORT,
    JWT_SECRET,
    JWT_EXPIRATION,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
    BCRYPT_ROUNDS
}