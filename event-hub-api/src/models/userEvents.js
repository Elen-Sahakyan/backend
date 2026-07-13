const mongoose = require('mongoose');
const { Types } = require('mongoose').Schema;

const userEventSchema = new mongoose.Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: Types.ObjectId,
        ref: 'Event',
        required: true
    }
});

module.exports = mongoose.model('UserEvent', userEventSchema);

