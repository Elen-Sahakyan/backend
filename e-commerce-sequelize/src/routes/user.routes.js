const router = require('express').Router();
const userController = require('../controllers/user.controller');
const {
    authMiddleware,
    validateMiddleware
} = require('../middlewares');
const {
    createUserSchema,
    loginSchema
} = require('../validations/user.validation');
const asyncHandler = require('../../utils/asyncHandler');

router.post('/register', validateMiddleware(createUserSchema), asyncHandler(userController.signUp));
router.post('/login', validateMiddleware(loginSchema), asyncHandler(userController.signIn));
router.get('/me', authMiddleware, asyncHandler(userController.me));

module.exports = router;