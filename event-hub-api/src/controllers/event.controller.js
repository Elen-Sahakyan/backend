const eventService = require('../services/event.service');

class EventController {
    async findEvents(req, res) {
        const {
            category,
            page
        } = req.query;

        const events = await eventService.showEvents(category, page);

        return res.status(200).json(events);
    }

    async findEvent(req, res) {
        const { id } = req.params;

        const event = await eventService.showEvent(id);

        return res.status(200).json(event);
    }

    async createEvent(req, res) {
        const eventData = req.body;

        const eventId = await eventService.generateEvent(eventData);

        return res.status(200).json({
            message: `Event created successfully. ID: ${eventId}`
        });
    }

    async updateEvent(req, res) {
        const { id } = req.params;
        const updateInfo = req.body;

        const updatedEvent = await eventService.changeEvent(id, updateInfo);

        return res.status(200).json(updatedEvent);
    }

    async deleteEvent(req, res) {
        const userId = req.user.id;
        const eventId = req.query.id;

        await eventService.deleteEventRecord(userId, eventId);

        return res.status(204).json();
    }

    async attendEvent(req, res) {
        const userId = req.user.id;
        const eventId = req.params.id;
        
        await eventService.joinToEvent(userId, eventId);
        
        return res.status(200).json({
            message: `You have joint to the event id ${eventId}`
        });
    }
    
    async leaveEvent(req, res) {
        const userId = req.user.id;
        const eventId = req.params.id;

        await eventService.leaveTheEvent(userId, eventId);

        return res.status(200).json({
            message: 'You have left the event'
        });

    }
}

module.exports = new EventController();