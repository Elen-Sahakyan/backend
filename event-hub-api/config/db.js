const mongoose = require('mongoose');
const { DB_URL } = require('./env');

const connectDB = async() => {
    try {
        await mongoose.connect(DB_URL);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(`Connection to MongoDB failed: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;