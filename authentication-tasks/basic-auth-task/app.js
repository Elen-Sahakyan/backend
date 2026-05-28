const express = require('express');
require('dotenv').config({ quiet: true });
const { PORT, HOST } = process.env;
const data = [
    {
        username: 'ann',
        password: 'some_pass1'
    },
    {
        username: 'bob',
        password: 'other_pass2'
    },
    {
        username: 'james',
        password: 'some_secure_pass'
    }
];

const app = express();

const auth = (req, res, next) => {
    const header = req.headers.authorization;

    if(!header) {
        res.status(401).json({
            message: 'not authorized'
        });
    }

    const [type, credentials] = header.split(' '); 

    const decoded = Buffer.from(credentials, 'base64').toString('utf-8');

    const userData = decoded.split(':');

    const foundUser = data.find(user => {
        return user.username === userData[0]
        && user.password === userData[1];
    });

    if(!foundUser) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).json({
            message: 'not authorized'
        });
    }

    req.user = foundUser;

    next();
}

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Homepage' });
});

app.get('/profile', auth, (req, res) => {
    return res.status(200).json({
        message: `Welcome ${req.user.username}`    
    });
});

app.get('/products', auth, (req, res) => {
    return res.status(200).json(['hair-spray', 'eyeshadow', 'lip-gloss']);
})

app.listen(PORT, HOST, () => {
    console.log(`server is running on port ${PORT}`);
});