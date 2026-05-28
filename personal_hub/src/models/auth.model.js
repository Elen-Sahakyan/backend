const path = require('node:path');

const {
    readJson,
    writeJson,
} = require(path.join(process.cwd(), 'utils'));

const dataFolder = path.join(process.cwd(), 'src', 'data');

exports.getUserByUsername = async (username) => {
    const users = await readJson(path.join(dataFolder, 'users.json'));
    return users.find(user => user.username === username);
}

exports.getUserById = async (id) => {
    const users = await readJson(path.join(dataFolder, 'users.json'));
    const user = users.find(user => user.userId === id);
    return user;
}

exports.createUser = async (userObject) => {
    const users = await readJson(path.join(dataFolder, 'users.json'));
    users.push(userObject);
    await writeJson(path.join(dataFolder, 'users.json'), users);
}