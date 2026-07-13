const router = require('express').Router();
const eventController = require('../controllers/event.controller');
const {
    asyncHandler
} = require('../../utils');
const {
    authMiddleware,
    validationMiddleware,
    organizerMiddleware
} = require('../middlewares');
const {
    createEventSchema,
    updateEventSchema
} = require('../validations');

router.get('/', asyncHandler(eventController.findEvents));
router.get('/:id', asyncHandler(eventController.findEvent));
router.post(
    '/',
    authMiddleware,
    organizerMiddleware,
    validationMiddleware(createEventSchema),
    eventController.createEvent
);
router.patch(
    '/:id',
    authMiddleware,
    organizerMiddleware,
    validationMiddleware(updateEventSchema),
    eventController.updateEvent
);
router.delete(
    '/:id',
    authMiddleware,
    organizerMiddleware,
    validationMiddleware(updateEventSchema),
    eventController.deleteEvent
);
router.post(
    '/:id/attendances',
    authMiddleware,
    eventController.attendEvent
);
router.delete(
    '/:id/attendances',
    authMiddleware,
    eventController.leaveEvent
);

module.exports = router;

