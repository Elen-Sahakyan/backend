const router = require('express').Router()
const orderController = require('../controllers/order.controllers');
const {
    authMiddleware,
    validateMiddleware,
    adminMiddleware
} = require('../middlewares');
const asyncHandler = require('../../utils/asyncHandler');
const updateOrderSchema = require('../validations/order.validation');

router.post(
    '/checkout', 
    authMiddleware, 
    asyncHandler(orderController.createOrder)
);
router.get('/', authMiddleware, asyncHandler(orderController.getOrders));
router.get('/:id', authMiddleware, asyncHandler(orderController.getOrder));
router.patch(
    '/:id/status', 
    authMiddleware, 
    adminMiddleware,
    validateMiddleware(updateOrderSchema),
    asyncHandler(orderController.updateStatus)
);

module.exports = router;