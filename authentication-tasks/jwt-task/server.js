const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
require('dotenv').config({quiet: true});
const {
    PORT,
    HOST,
    SALT_ROUNDS,
    JWT_SECRET
} = process.env;

const users = [];

const app = express();


const auth = (req, res, next) => {
    let token = null;

    const authHeader = req.headers.authorization;

    if(authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }

    if(!token && req.cookies.token) {
        token = req.cookies.token;
    }

    if(!token) return res.status(401).json({
        message: 'not authenticated'
    });

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
}

app.use(express.json());
app.use(cookieParser());

app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;
    
        if(!email || !password) {
            return res.status(400).json({
                message: 'email & password required'
            });
        }
    
        const duplicate = users.find(user => user.email === email);
    
        if(duplicate) return res.status(409).json({
            message: 'email already exists'
        });
    
        const hashedPass = await bcrypt.hash(password, parseInt(SALT_ROUNDS));
    
        users.push({
            'id': Date.now(),
            'email': email, 
            'hashedPass': hashedPass
        });
    
        return res.status(201).json({ message: 'created' });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'server error'
        });
    }
})

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({
            message: 'email & password required'
        });
    }

    const user = users.find(user => user.email === email);

    if(!user) {
        return res.status(404).json({
            message: 'email incorrect'
        });
    }

    const match = await bcrypt.compare(password, user.hashedPass)

    if(!match) {
        return res.status(400).json({
            message: 'password incorrect'
        });
    }

    const id = user.id;
    const token = jwt.sign({ email, id }, JWT_SECRET, {expiresIn: '1h'});

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 3600000
    });

    res.status(200).json({ message: 'logged in' })
})

app.get('/api/me', auth, (req, res) => {
    return res.status(200).json({
        id: req.user.id,
        email: req.user.email
    });
})

app.listen(PORT, HOST, () => {
    console.log(`server running on port ${PORT}`);
    
})