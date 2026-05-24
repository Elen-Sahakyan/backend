const path = require('node:path');
const express = require('express');
const cookieParser = require('cookie-parser');

const {
    validateUser,
    registerUser,
    loginUser,
    authenticate
} = require('./middlewares/user.middlewares');

const {
    createProduct,
    listAll,
    listOne,
    updateProduct,
    deleteProduct,
} = require('./middlewares/prod.middlewares');

const {
    addItem,
    getCart,
    clearCart,
    deleteItem
} = require('./middlewares/cart.middlewares');

const {
    createOrder,
    listOrder,
    getOrder,
    changeStatus
} = require('./middlewares/order.middlewares');


require('dotenv').config({ quiet: true });
const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post('/api/users/register', validateUser, registerUser, (req, res) => {
    return res.status(200).json({
        message: 'registration completed successfully'
    });
});

app.post('/api/users/login', loginUser, (req, res) => {
    return res.status(200).json({
        message: 'login succesfull',
        userId: req.id
    })
});

app.post('/api/products', authenticate, createProduct, (req, res) => {
    return res.status(201).json({
        message: 'product created'
    });
});

app.get('/api/products', listAll);

app.get('/api/products/:id', listOne);

app.put('/api/products/:id', authenticate, updateProduct, (req, res) => {
    return res.status(200).json({
        message: 'item updated'
    });
});

app.delete('/api/products/:id', authenticate, deleteProduct, (req, res) => {
    return res.status(200).json({
        message: 'item deleted'
    })
})

app.post('/api/cart/:userId', authenticate, addItem, (req, res) => {
    return res.status(201).json({
        message: 'item added to the cart'
    });
});

app.get('/api/cart/:userId', authenticate, getCart);

app.delete('/api/cart/:userId/items/:productId', authenticate, deleteItem, (req, res) => {
    res.status(200).json({
        message: 'item deleted from the cart'
    });
});

app.delete('/api/cart/:userId', authenticate, clearCart, (req, res) => {
    return res.status(200).json({
        message: 'cart cleared'
    })
});

app.post('/api/orders/:userId', authenticate, createOrder, (req, res) => {
    return res.status(201).json({
        message: 'order placed successfully'
    });
})

app.get('/api/user/orders/:userId', authenticate, listOrder);

app.get('/api/orders/:orderId', authenticate, getOrder);

app.put('/api/orders/:orderId/status', authenticate, changeStatus, (req, res) => {
    return res.status(200).json({
        message: 'status updated'
    });
});

app.use((req, res) => {
    return res.status(404).json({
        message: 'route not found'
    });
});

app.use((err, req, res, next) => {    
    console.log(err);

    return res.status(500).json({
        message: 'internal server error'
    });
})

app.listen(PORT, HOST, () => {
    console.log(`server running on port: ${PORT}`);
})


