const { ValidationError } = require('../errors');

/**
 * Returns a middleware that validates the request body using the given schema.
 */
const validationMiddleware = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body)
    
        if(!result.success) {
            const errors = result.error.issues.map((err) => ({
                field: err.path.join('.'),
                message: err.message,
                code: err.code
            }));            
    
            return next(new ValidationError(errors));
        }
    
        req.body = result.data;
        next();
    }
}

module.exports = validationMiddleware;