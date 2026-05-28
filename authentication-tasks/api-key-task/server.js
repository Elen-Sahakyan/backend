const express = require('express');
require('dotenv').config({quiet: true});

const {
    PORT,
    HOST,
    CLIENT1_KEY,
    CLIENT2_KEY,
    CLIENT3_KEY
} = process.env;

const clients = [
    {
        name: 'client1',
        apiKey: CLIENT1_KEY,
        permissions: ['read']
    },
    {
        name: 'client2',
        apiKey: CLIENT2_KEY,
        permissions: ['write']
    },
    {
        name: 'client3',
        apiKey: CLIENT3_KEY,
        permissions: ['read', 'write']
    },
    
]

const auth = (req, res, next) => {
    const apiKey = req.header('X-API-KEY');

    if(!apiKey) {
        return res.status(401).json({
            message: 'not authenticated'
        });
    }

    const client = clients.find(client => client.apiKey === apiKey);

    if(!client) {
        return res.status(401).json({
            message: 'not authenticated'
        });
    }

    req.client = client;
     
    next();
}

const grantPermission = (permission) => {
    return (req, res, next) => {
        if(!req.client.permissions.includes(permission)) {
            return res.status(403).json({
                message: 'not authorized'
            });
        }
        next();
    }
}

const app = express();

app.use(express.json());

app.get('/products', auth, grantPermission('read'), (req, res) => {
    return res.status(200).json(['eyeshadow', 'lipstick', 'mascara']);
});

app.post('/products', auth, grantPermission('write'), (req, res) => {
    const product = req.body;
    
    product.id = Date.now();

    return res.status(200).json(product);
})

app.get('/', (req, res) => {
    return res.status(200).json('Server running');
})

app.listen(PORT, HOST, () => {
    console.log(`server is running on port ${PORT}`);
});