const { z } = require('zod');
const { EVENT_CATEGORIES } = require('../../config/constants');

const createEventSchema = z.object({
    organizerId: z.string(),
    title: z.string().trim().min(5),
    desciption: z.string().min(10).optional(),
    category: z.enum(EVENT_CATEGORIES),
    location: z.string().min(5),
    capacity: z.number().min(1),
    attendees: z.number().min(0),
    start: z.coerce.date(),
    end: z.coerce.date(),
});

const updateEventSchema = createEventSchema.partial();

module.exports = {
    createEventSchema,
    updateEventSchema
}