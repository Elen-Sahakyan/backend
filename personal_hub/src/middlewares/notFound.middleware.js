exports.notFound = (req, res, next) => {
    res.status(404).json({
        message: 'Rout Not Found'
    });
}