const { z } = require('zod');

const registerUserSchema = z.object({
    name: z.string().trim().min(1),
    email: z.string().trim().email(),
    password: z.string().min(8)
})

const loginUserSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(8)
})

module.exports = {
    registerUserSchema,
    loginUserSchema
}