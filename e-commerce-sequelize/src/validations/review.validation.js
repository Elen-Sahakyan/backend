const { z } = require('zod');

const createReviewSchema = z.object({
    rating: z.number().min(1).max(5),
    comment: z.string().optional()
});

module.exports = createReviewSchema;