const express = require('express');
const cookieParser = require('cookie-parser');
const { 
    authRoutes,
    notesRoutes,
    booksRoutes,
    habitsRoutes
} = require('./routes');
const { errorMiddleware } = require('./middlewares/error.middleware');
const { notFound } = require('./middlewares/notFound.middleware');


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.use('/api/notes', notesRoutes);

app.use('/api/books', booksRoutes);

app.use('/api/habits', habitsRoutes);

app.use(notFound);
app.use(errorMiddleware);

module.exports = app;