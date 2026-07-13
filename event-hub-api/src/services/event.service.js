const eventRepository = require('../repositories/event.repository');
const userRepository = require('../repositories/user.repository');

const {
    NotFoundError,
    OverloadError,
    BadRequestError
} = require('../errors');
const { 
    LIMIT,
    EVENT_CATEGORIES
} = require('../../config/constants');

class EventService {
    /**
    * Returns a paginated list of events, optionally filtered by category.
    */
    async showEvents(category, page) {
        if(category && !(EVENT_CATEGORIES.includes(category))) {
            throw new BadRequestError(
                `Category ${category} not found. Check the category list`,
                'CATEGORY_NOT_FOUND'
            );
        }

        if(page && !isFinite(page)) {
            throw new BadRequestError(
                'Page data must be a string',
                'PAGE_ERR'
            );
        }
        
        const skip = (page - 1) * LIMIT;

        return eventRepository.getEvents(category, skip, LIMIT); 
    }

    async showEvent(eventId) {
        const event = await eventRepository.getEventById(eventId);

        if(!event) {
            throw new NotFoundError(
                `Event by id ${eventId} not found`,
                'EVENT_NOT_FOUND'
            );
        }
    
        return event;
    }

    async generateEvent(eventData) {
        return eventRepository.addEvent(eventData);
    }

    async changeEvent(eventId, updateInfo) {
        const {
            organizerId,
            title,
            description,
            category,
            location,
            capacity,
            start,
            end
        } = updateInfo;
        
        const updateData = { 
            organizerId,
            title,
            description,
            category,
            location,
            capacity,
            start,
            end
        };

        const updatedEvent = await eventRepository.updateEvent(eventId, updateData);        

        if(!updatedEvent) {
            throw new NotFoundError(
                `Event with id ${eventId} not found`,
                'EVENT_NOT_FOUND'
            );
        }
        
        return updatedEvent;
    }

    /**
    * Deletes an event owned by the specified organizer.
    */
    async deleteEventRecord(userId, eventId) {
        const deleted = eventRepository.removeEvent(userId, eventId);

        if(!deleted) {
            throw new NotFoundError(
                `Event with id ${eventId} not found`,
                'EVENT_NOT_FOUND'
            );
        }
    }

    /**
    * Registers a user as an attendee of an event.
     */
    async joinToEvent(userId, eventId) {
        const user = await userRepository.getUserById(userId);
        
        if(!user) {
            throw new NotFoundError(
                'User not found',
                'USER_NOT_FOUND'
            );
        }

        const event = await eventRepository.getEventById(eventId);

        if(!event) {
            throw new NotFoundError(
                `Event with id ${eventId} not found`,
                'EVENT_NOT_FOUND'
            );
        }

        const isJoint = await eventRepository.getUserEvent(userId, eventId);

        if(isJoint) {
            throw new BadRequestError(
                `You hav already been joint to the event ${eventId}`,
                'JOIN_ERR'
            );
        }

        let { 
            capacity,
            attendees
        } = event;

        if((attendees += 1) > capacity) {
            throw new OverloadError();
        }

        const updatedEvent = await eventRepository.updateEvent(eventId, { attendees });

        if(!updatedEvent) {
            throw new NotFoundError(
                `Event with id ${eventId} not found`,
                'EVENT_NOT_FOUND'
            );
        }

        await eventRepository.addUserEvent(userId, eventId);
    }

    /**
    * Removes a user from an event's attendee list.
    */
    async leaveTheEvent(userId, eventId) {
        const { deletedCount } = await eventRepository.removeUserEvent(userId, eventId);

        if(!deletedCount) {
            throw new NotFoundError(
                'Not attending this event',
                'EVENT_NOT_FOUND'
            );
        }

        const event = await eventRepository.getEventById(eventId);

        if(!event) {
            throw new NotFoundError(
                `Event with id ${eventId} not found`,
                'EVENT_NOT_FOUND'
            );
        }

        let { attendees } = event;

        attendees -= 1;

        const updatedEvent = await eventRepository.updateEvent(eventId, { attendees });

        if(!updatedEvent) {
            throw new NotFoundError(
                `Event with id ${eventId} not found`,
                'EVENT_NOT_FOUND'
            );
        }
    }
}

module.exports = new EventService();