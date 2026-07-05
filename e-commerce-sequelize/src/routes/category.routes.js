const router = require('express').Router();
const categoryController = require('../controllers/category.controller');
const {
    authMiddleware,
    validateMiddleware,
    adminMiddleware
} = require('../middlewares');
const asyncHandler = require('../../utils/asyncHandler');
const createCategorySchema = require('../validations/category.validation');

router.get('/', asyncHandler(categoryController.getAllCategories));
router.post(
    '/', 
    authMiddleware, 
    adminMiddleware, 
    validateMiddleware(createCategorySchema), 
    asyncHandler(categoryController.createCategory)
);
router.delete(
    '/:id', 
    authMiddleware, 
    adminMiddleware, 
    asyncHandler(categoryController.deleteCategory)
);

module.exports = router;

