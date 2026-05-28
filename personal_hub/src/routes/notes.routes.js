const path = require('node:path');
router = require('express').Router();

const { asyncHandler } = require(path.join(process.cwd(), 'utils'));
const { auth } = require(path.join(process.cwd(), 'src', 'middlewares', 'auth.middleware'));
const { 
    validateNoteAdd,
    validateNoteUpdate
} = require(path.join(process.cwd(), 'src', 'middlewares', 'validate.middleware'));
const {
    getAll,
    getOne,
    add,
    update,
    remove
} = require(path.join(process.cwd(), 'src', 'controllers', 'notes.controller'));

router.get('/', auth, asyncHandler(getAll));
router.get('/:id', auth, asyncHandler(getOne));
router.post('/', auth, validateNoteAdd, asyncHandler(add));
router.patch('/:id', auth, validateNoteUpdate, asyncHandler(update));
router.delete('/:id', auth, asyncHandler(remove));

module.exports = router;