const { z } = require('zod');

const createAndUpdateProductSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.number().min(1),
    stock: z.number().min(0),
    categoryIds: z.array(z.number())
});

module.exports = createAndUpdateProductSchema;