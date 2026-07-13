require('dotenv').config({ quiet: true});

module.exports = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION
}
