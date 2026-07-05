const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.isOperational ? err.statusCode : 500;
    const message = err.isOperational ? err.message : 'Internal server error';
    const errorCode = err.isOperational ? err.errorCode : 'SERVER_ERROR';

    if(!err.isOperational) console.log(err);

    return res.status(statusCode).json({
        message,
        errorCode,
        errors: err.errors || null
    });
}

module.exports = errorMiddleware;