const router = require('express').Router();
const userController = require('../controllers/user.controller');
const {
    asyncHandler
} = require('../../utils');
const {
    authMiddleware,
    validationMiddleware,
    organizerMiddleware
} = require('../middlewares');
const {
    registerUserSchema,
    loginUserSchema
} = require('../validations');

router.post(
    '/signup', 
    validationMiddleware(registerUserSchema), 
    asyncHandler(userController.signUp)
);

router.post(
    '/signup/organizer',
    authMiddleware,
    organizerMiddleware,
    validationMiddleware(registerUserSchema), 
    asyncHandler(userController.signUp)
);

router.post(
    '/signin',
    validationMiddleware(loginUserSchema),
    asyncHandler(userController.signIn)
);

router.get(
    '/me',
    authMiddleware,
    asyncHandler(userController.getProfile)
);

router.post(
    '/signout',
    authMiddleware,
    asyncHandler(userController.signOut)
);

router.post(
    '/refresh',
    asyncHandler(userController.refresh)
);

module.exports = router;


