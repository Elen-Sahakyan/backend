const express = require('express');
const cookieParser = require('cookie-parser');
const {
    userRoutes,
    productRoutes,
    categoryRoutes,
    cartRoutes,
    orderRoutes,
    reviewRoutes
} = require('./routes');
const {
    errorMiddleware,
    notFoundMiddleware
} = require('./middlewares');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', userRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/products', reviewRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;