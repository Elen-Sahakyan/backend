const bcryptjs = require('bcryptjs');

exports.hash = async (password) => {
    return await bcryptjs.hash(password, 10);
}

exports.verify = async (rawPassword, hashedPassword) => {
    return await bcryptjs.compare(rawPassword, hashedPassword);
}