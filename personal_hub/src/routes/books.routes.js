const path = require('node:path');
router = require('express').Router();

const { asyncHandler } = require(path.join(process.cwd(), 'utils'));
const { auth } = require(path.join(process.cwd(), 'src', 'middlewares', 'auth.middleware'));
const { 
    validateBookAdd,
    validateBookUpdate
} = require(path.join(process.cwd(), 'src', 'middlewares', 'validate.middleware'));
const {
    listBooks,
    listBook,
    create,
    update,
    remove
} = require(path.join(process.cwd(), 'src', 'controllers', 'books.controller'));

router.get('/', auth, asyncHandler(listBooks));
router.get('/:id', auth, asyncHandler(listBook));
router.post('/', auth, validateBookAdd, asyncHandler(create));
router.patch('/:id', auth, validateBookUpdate, asyncHandler(update));
router.delete('/:id', auth, asyncHandler(remove));

module.exports = router;