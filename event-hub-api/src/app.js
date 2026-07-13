const express = require('express');
const { 
    userRouter,
    eventRouter,
    reviewRouter
} = require('./routes');
const cookieParser = require('cookie-parser');
const {
    notFoundMiddleware,
    errorMiddleware
} = require('./middlewares');

const app = express();

app.use(express.json())
app.use(cookieParser());

app.use('/auth', userRouter);
app.use('/events', eventRouter);
app.use('/events', reviewRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
module.exports = app;


