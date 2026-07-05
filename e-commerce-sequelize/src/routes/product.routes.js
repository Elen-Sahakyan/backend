const router = require('express').Router()
const productController = require('../controllers/product.controller');
const {
    authMiddleware,
    validateMiddleware,
    adminMiddleware
} = require('../middlewares');
const asyncHandler = require('../../utils/asyncHandler');
const createAndUpdateProductSchema = require('../validations/product.validation');

router.get('/', asyncHandler(productController.getProducts));
router.get('/:id', asyncHandler(productController.getProduct));
router.post(
    '/', 
    authMiddleware, 
    adminMiddleware, 
    validateMiddleware(createAndUpdateProductSchema), 
    asyncHandler(productController.generateProduct)
);
router.put(
    '/:id', 
    authMiddleware, 
    adminMiddleware, 
    validateMiddleware(createAndUpdateProductSchema), 
    asyncHandler(productController.updateProduct)
);
router.delete(
    '/:id',
    authMiddleware, 
    adminMiddleware, 
    asyncHandler(productController.deleteProduct)
);

module.exports = router;