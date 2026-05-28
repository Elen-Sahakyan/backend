const path = require('node:path');
const { AppError } = require(path.join(process.cwd(), 'utils'));

exports.errorMiddleware = (err, req, res, next) => {
    const isKnown = err instanceof AppError;

    const status = isKnown ? err.statusCode : 500;
    const message = isKnown ? err.message : 'Internal Server Error';

    if(!isKnown) console.log(err);

    return res.status(status).json(message);
}