const path = require('node:path');

const router = require('express').Router();

const { asyncHandler } = require(path.join(process.cwd(), 'utils'));
const { validateRegister } = require(path.join(process.cwd(), 'src', 'middlewares', 'validate.middleware'));
const { auth } = require(path.join(process.cwd(), 'src', 'middlewares', 'auth.middleware'));
const { 
    register,
    login,
    logout,
    me
} = require(path.join(process.cwd(), 'src', 'controllers', 'auth.controller'));


router.post('/register', validateRegister, asyncHandler(register));
router.post('/login', asyncHandler(login));
router.post('/logout', auth, asyncHandler(logout));
router.get('/me', auth, asyncHandler(me));


module.exports = router;