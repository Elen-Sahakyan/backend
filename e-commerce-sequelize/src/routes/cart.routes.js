const router = require('express').Router()
const cartController = require('../controllers/cart.controller');
const {
    authMiddleware,
    validateMiddleware
} = require('../middlewares');
const asyncHandler = require('../../utils/asyncHandler');
const {
    createCartSchema,
    updateCartSchema
} = require('../validations/cart.validation');

router.get('/', authMiddleware, asyncHandler(cartController.listCart));
router.post(
    '/items', 
    authMiddleware, 
    validateMiddleware(createCartSchema),
    asyncHandler(cartController.addItem)
);
router.patch(
    '/items/:id', 
    authMiddleware, 
    validateMiddleware(updateCartSchema),
    asyncHandler(cartController.updateCart)
);
router.delete(
    '/items/:id',
    authMiddleware, 
    asyncHandler(cartController.deleteCartItem)
);

module.exports = router;