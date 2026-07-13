const mongoose = require('mongoose');
const { Types } = require('mongoose').Schema;

const reviewSchema = new mongoose.Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: Types.ObjectId,
        ref: 'Event',
        required: true
    },
    rating: {
        type: Types.Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: Types.String,
        minLength: 1
    }
}, {
    timestamps: true
});

reviewSchema.index({ userId: 1, eventId: 1}, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);