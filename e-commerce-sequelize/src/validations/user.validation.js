const { z } = require('zod');

const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(1),
});
 
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

module.exports = {
    createUserSchema,
    loginSchema
}