const path = require('node:path');
const fileWorkPath = path.join(process.cwd(), 'utils', 'fileWork.js'); 
const { readFile, writeFile } = require(fileWorkPath);
const hashPassPath = path.join(process.cwd(), 'utils', 'hash&VerifyPass.js');
const { hashPass } = require(hashPassPath);

const registerUser = async (req, res, next) => {
    if(!req.body) {
        return res.status(400).json({
            message: 'invalid body'
        })
    }

    const { username, email, password } = req.body;
    
    const usersFilePath = path.join(process.cwd(), 'data', 'users.json'); 
    const users = await readFile(usersFilePath);

    const id = users.length + 1;

    const hashed = await hashPass(password);

    const user = {
        'id': id,
        'username': username,
        'email': email,
        'password': hashed 
    }

    if(users.length === 0) {
        user.role = 'admin';
    } else {
        user.role = 'user';
    }

    users.push(user);

    writeFile(usersFilePath, users);

    next();
}

module.exports = registerUser;