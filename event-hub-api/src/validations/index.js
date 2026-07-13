const {
    registerUserSchema,
    loginUserSchema
} = require('./user.validation');
const {
    createEventSchema,
    updateEventSchema
} = require('./event.validation');
const { createReviewSchema } = require('./review.validation');

module.exports = {
    registerUserSchema,
    loginUserSchema,
    createEventSchema,
    updateEventSchema,
    createReviewSchema
}