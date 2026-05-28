const path = require('node:path');

const {
    readJson,
    writeJson,
} = require(path.join(process.cwd(), 'utils'));

const booksPath = path.join(process.cwd(), 'src', 'data', 'books.json');

exports.getAll = async (ownerId) => {
    const books = await readJson(booksPath);

    return books.filter(book => book.ownerId === ownerId);
}

exports.getOne = async (bookId) => {
    const books = await readJson(booksPath);

    return books.find(book => book.id === bookId);
}

exports.addBook = async (bookObject) => {
    const books = await readJson(booksPath);

    books.push(bookObject);

    await writeJson(booksPath, books);
}

exports.updateBook = async (updatedBook) => {
    const books = await readJson(booksPath);
    const bookId = updatedBook.id;

    const filtered = books.filter(book => book.id !== bookId);
    filtered.push(updatedBook);

    await writeJson(booksPath, filtered);
}

exports.deleteBook = async (bookId) => {
    const books = await readJson(booksPath);

    for(let i = 0; i < books.length; ++i) {
        if(books[i].id === bookId) {
            books.splice(i, 1);
            await writeJson(booksPath, books);
            return true;
        }
    }
    return false;
}