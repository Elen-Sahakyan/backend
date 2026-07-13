const Event = require('../models/event');
const UserEvent = require('../models/userEvents');

class EventRepository {
    async getEvents(category, skip, LIMIT) {
        return Event.find({ category }).skip(skip).limit(LIMIT);
    }

    async getEventById(eventId) {
        return Event.findById({
            _id: eventId
        }).populate('organizerId');
    }

    async addEvent(eventData) {
        const event = await Event.create(eventData);

        return event?._id;
    }
    
    async updateEvent(eventId, updateData) {
        return Event.findOneAndUpdate(
            { _id: eventId },
            updateData,
            { returnDocument: 'after' }
        );
    }

    async removeEvent(userId, eventId) {
        return Event.findOneAndDelete(userId, eventId);
    }

    async getUserEvent(userId, eventId) {
        return UserEvent.findOne({ userId, eventId });
    }

    async addUserEvent(userId, eventId) {
        return UserEvent.create({ userId, eventId });
    }

    async removeUserEvent(userId, eventId) {
        return UserEvent.deleteOne({ 
            userId, 
            eventId
        })
    }
}

module.exports = new EventRepository();