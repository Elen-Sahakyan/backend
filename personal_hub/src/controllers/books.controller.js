const path = require('node:path');
const {
    listAll,
    listOne,
    add,
    changeBook,
    removeBook
} = require(path.join(process.cwd(), 'src', 'services', 'books.service'));

exports.listBooks = async (req, res) => {
    const ownerId = req.user.userId;
    const status = req.query.status;

    const books = await listAll(ownerId, status);

    return res.status(200).json(books);
}

exports.listBook = async (req, res) => {
    const ownerId = req.user.userId;
    const bookId = req.params.id;

    const book = await listOne(ownerId, bookId);

    return res.status(200).json(book);
}

exports.create = async (req, res) => {
    const ownerId = req.user.userId;
    const { title, author, status, rating } = req.body;

    await add(ownerId, title, author, status, rating);

    return res.status(204).json();
}

exports.update = async (req, res) => {
    const bookId = req.params.id;
    const { title, author, status, rating } = req.body;

    await changeBook(bookId, title, author, status, rating);

    return res.status(204).json();
}

exports.remove = async (req, res) => {
    const bookId = req.params.id;

    await removeBook(bookId);

    return res.status(204).json();
}