const {
    HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME
} = require('./env');

module.exports = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: HOST,
        port: DB_PORT,   
        dialect: 'postgres'
    }
}