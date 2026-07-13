const errorMiddleware = (err, req, res, next) => {
    const message = err.isOperational ? err.message : 'Internal server Error';
    const statusCode = err.isOperational ? err.statusCode : 500
    const errorCode = err.isOperational ? err.errorCode : 'SERVER_ERROR';

    if(!err.isOperational) console.log(err);

    return res.status(statusCode).json({
        message,
        errorCode,
        errors: err.errors || null
    });   
}

module.exports = errorMiddleware;