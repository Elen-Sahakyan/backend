const { z } = require('zod');

const updateOrderSchema = z.object({
    status: z.enum(['pending', 'paid', 'shipped', 'delivered', 'cancelled'])
});

module.exports = updateOrderSchema;