const path = require('node:path');
const { 
    AppError,
    generateId
} = require(path.join(process.cwd(), 'utils'));
const {
    getAll,
    getOne,
    addBook,
    updateBook,
    deleteBook
} = require(path.join(process.cwd(), 'src', 'models', 'book.model'));
const STATUS = {
    TO_READ: 'TO-READ',
    READING: 'READING',
    FINISHED: 'FINISHED'
}

exports.listAll = async (ownerId, status) => {
    const books = await getAll(ownerId);
    
    if(!books.length) throw new AppError('books not found', 404);

    if(!status) return books;

    const filtered = books.filter(book => status.toUpperCase() === book.status);

    if(!filtered.length) {
        throw new AppError(`books with status ${status} not found`, 404);
    }

    return filtered;
}

exports.listOne = async (ownerId, bookId) => {
    const book = await getOne(bookId);

    if(!book || book.ownerId !== ownerId) {
        throw new AppError('book not found', 404);
    }
    
    return book;
}

exports.add = async (ownerId, title, author, status = STATUS.TO_READ, rating = null) => {
    if(status !== STATUS.FINISHED && rating) {
        throw new AppError('cannot rate unless status is "FINISHED"', 400);
    }

    const bookId = generateId('b_');

    const book = {
        'id': bookId,
        'ownerId': ownerId,
        'title': title,
        'author': author,
        'status': status,
        'rating': rating,
        'createdAt': new Date().toISOString(),
        'updatedAt': new Date().toISOString()
    }

    await addBook(book);
}

exports.changeBook = async (bookId, title, author, status, rating) => {
    const book = await getOne(bookId);
    if(title) book.title = title; 
    if(author) book.author = author;
    if(status) book.status = status;
    if(status !== STATUS.FINISHED && rating) {
        throw new AppError('cannot rate unless status is "FINISHED"', 400);
    } else book.rating = rating;

    book.updatedAt = new Date().toISOString();

    await updateBook(book);
}

exports.removeBook = async (bookId) => {
    const deleted = await deleteBook(bookId);

    if(!deleted) throw new AppError('book not found', 404);
}