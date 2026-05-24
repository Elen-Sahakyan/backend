const path = require('node:path');
const fileWorkPath = path.join(process.cwd(), 'utils', 'fileWork.js'); 
const { readFile } = require(fileWorkPath);
const hashPassPath = path.join(process.cwd(), 'utils', 'hash&VerifyPass.js');
const { verifyPass } = require(hashPassPath);
const tokenPath = path.join(process.cwd(), 'utils', 'jwtToken.js');
const { generateToken } = require(tokenPath);

const loginUser = async(req, res, next) => {
    if(!req.body) {
        return res.status(400).json({
            message: 'invalid body'
        })
    }
    
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({
            message: 'username & email && login required'
        });
    }

    const usersDataPath = path.join(process.cwd(), 'data', 'users.json');
    const users = await readFile(usersDataPath); 

    const user = users.find((user) => {
        return user.username === username && user.email === email;
    });

    if(!user) {
        return res.status(400).json({
            message: 'username/email incorrect'
        });
    }

    const match = await verifyPass(password, user.password);

    if(!match) {
        return res.status(401).json({
            message: 'password incorrect'
        });
    }

    const id = user.id;

    const token = generateToken({ id, username, email });

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 3600000
    });

    req.id = user.id;

    next();
}

module.exports = loginUser;