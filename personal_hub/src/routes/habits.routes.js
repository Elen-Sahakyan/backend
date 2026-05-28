const path = require('node:path');
router = require('express').Router();

const { asyncHandler } = require(path.join(process.cwd(), 'utils'));
const { auth } = require(path.join(process.cwd(), 'src', 'middlewares', 'auth.middleware'));
const { 
    validateHabitAdd,
    validateHabitUpdate
} = require(path.join(process.cwd(), 'src', 'middlewares', 'validate.middleware'));
const {
    listHabits,
    listHabit,
    create,
    update,
    checkIn,
    remove
} = require(path.join(process.cwd(), 'src', 'controllers', 'habits.controller'));

router.get('/', auth, asyncHandler(listHabits));
router.get('/:id', auth, asyncHandler(listHabit));
router.post('/', auth, validateHabitAdd, asyncHandler(create));
router.patch('/:id', auth, validateHabitUpdate, asyncHandler(update));
router.post('/:id/check-in', auth, asyncHandler(checkIn));
router.delete('/:id', auth, asyncHandler(remove));

module.exports = router;