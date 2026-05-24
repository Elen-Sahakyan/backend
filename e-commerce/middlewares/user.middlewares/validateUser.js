const path = require('node:path');
const fileWorkPath = path.join(process.cwd(), 'utils', 'fileWork.js'); 
const { readFile } = require(fileWorkPath);

const validateUser = async (req, res, next) => {
    if(!req.body) {
        return res.status(400).json({
            message: 'invalid body'
        })
    }

    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        return res.status(400).json( {
            message: 'username & email & password required'
        });
    }

    if(
        typeof username !== 'string' ||
        typeof email !== 'string' ||
        typeof password !== 'string'
    ) {
        return res.status(400).json({
            message: 'username & password & email must be string'
        })
    }

    const usersDataPath = path.join(process.cwd(), 'data', 'users.json');
    const users = await readFile(usersDataPath); 

    const duplicate = users.find((user) => {
        return user.username === username || user.email === email});
    
    if(duplicate) {
        return res.status(400).json({
            message: 'username & email must be unique'
        });
    }

    if(password.length < 9) {
        return res.status(400).json({
            message: 'password must include over 9 characters'
        });
    } 

    next();
}

module.exports = validateUser;
