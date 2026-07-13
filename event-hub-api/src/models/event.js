const mongoose = require('mongoose'); 
const { Types } = require('mongoose').Schema;
const { EVENT_CATEGORIES } = require('../../config/constants');
const { minLength } = require('zod');

const eventSchema = new mongoose.Schema({
    organizerId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: Types.String,
        required: true,
        trim: true,
        minLength: 5,
    },
    description: {
        type: Types.String,
        minLength: 20
    },
    category: {
        type: Types.String,
        enum: EVENT_CATEGORIES,
        required: true
    },
    location: {
        type: Types.String,
        required: true,
        minLength: 5,
    },
    capacity: {
        type: Types.Number,
        required: true,
        minLength: 1
    },
    attendees: {
        type: Types.Number,
        required: true,
        minLength: 0
    },
    start: {
        type: Types.Date,
        required: true,
    },
    end: {
        type: Types.Date,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);