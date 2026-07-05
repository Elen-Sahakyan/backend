const notFoundMiddleware = (req, res, next) => {
    return res.status(404).json({
        message: 'Route not found',
        code: 'ROUTE_NOT_FOUND'
    });
}

module.exports = notFoundMiddleware;