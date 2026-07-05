const { z } = require('zod');

const createCartSchema = z.object({
    productId: z.number(),
    quantity: z.number().min(1)
});

const updateCartSchema = z.object({
    quantity: z.number().min(1)
})

module.exports = {
    createCartSchema,
    updateCartSchema
} 