const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const constantsPath = path.resolve('constants.js');
const { GET, POST, PUT, PATCH, DELETE, OPTIONS } = require(constantsPath);
const libraryPath = path.resolve('books.json');
require('dotenv').config({ quiet : true} );
const PORT = process.env.PORT;
const HOST = process.env.HOST;
let ID = 0;

const server = http.createServer((req, res) => {
    
    if(req.method === GET && req.url === '/books') {
        fs.readFile(libraryPath, 'utf-8', (err, data) => {
            if(err) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 500;
                return res.end(JSON.stringify({ message: 'server error'}));
            }
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            return res.end(data);
        });
    }
    
    if(req.method === GET && req.url.startsWith('/books/')) {
        const parts = req.url.split('/');
        const id = parseInt(parts[2]);
        if(isNaN(id)) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 404;
            return res.end(JSON.stringify({ message: 'Invalid ID' }));
        }

        fs.readFile(libraryPath, 'utf-8', (err, data) => {
            if(err) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 500;
                return res.end(JSON.stringify({ message: 'server error' }));
            }

            const books = JSON.parse(data);
                
            for(const bookId in books) {
                if(parseInt(bookId) === id) {
                    res.setHeader('Content-Type', 'application/json');
                    res.statusCode = 200;
                    return res.end(JSON.stringify(books.bookId));
                } 
            }

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 404;
            return res.end(JSON.stringify({ message: 'resource not found' }));
        });
    }

    if(req.method === POST && req.url === '/books') {
        const contentType = req.headers['content-type'];

        if(contentType !== 'application/json') {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 400;
            res.end('invalid content-type');
            return req.destroy();
        }
        
        const chunks = [];

        req.on('data', (chunk) => {
            chunks.push(chunk);
        });
        
        req.on('end', () => {
            let newBook = null;
            
            try {
                const combinedChunks = Buffer.concat(chunks);
                newBook = JSON.parse(combinedChunks.toString());
            } catch (err) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 400;
                return res.end(JSON.stringify({ message: 'bad JSON'}));
            }

            if(!(newBook.title) || !(newBook.author) || !(newBook.year)) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 400;
                return res.end(JSON.stringify({ message: 'title/author/year required' }));
            }

            fs.readFile(libraryPath, 'utf-8', (err, data) => {
                if(err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.statusCode = 500;
                    return res.end(JSON.stringify({ message: 'server error' }));
                }

                const books = JSON.parse(data);
                books[++ID] = newBook;

                fs.writeFile(
                    libraryPath,
                    JSON.stringify(books, null, 2),
                    (err) => {
                        if(err) {
                            res.setHeader('Content-Type', 'application/json');
                            res.statusCode = 500;
                            return res.end(JSON.stringify({ message: 'server error' }));
                        }
                        res.setHeader('Content-Type', 'application/json');
                        res.statusCode = 201;
                        return res.end(JSON.stringify({ message: 'book added' }));
                    })

            })                
        })
    }

    if(req.method === PUT && req.url.startsWith('/books/')) {
        const contentType = req.headers['content-type'];

        if(contentType !== 'application/json') {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 400;
            res.end('invalid content-type');
            return req.destroy();
        }

        const parts = req.url.split('/');
        const id = parseInt(parts[2]);
        if(isNaN(id)) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 404;
            return res.end(JSON.stringify({ message: 'invalid/missing ID' }));
        }
        
        const chunks = [];

        req.on('data', (chunk) => {
            chunks.push(chunk);
        });
        
        req.on('end', () => {
            let changedBook = null;
            
            try {
                const combinedChunks = Buffer.concat(chunks);
                changedBook = JSON.parse(combinedChunks.toString());
            } catch (err) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 400;
                return res.end(JSON.stringify({ message: 'bad JSON'}));
            }
    
            if(!(changedBook.title) || !(changedBook.author) || !(changedBook.year)) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 400;
                return res.end(JSON.stringify({ message: 'title/author/year required' }));
            }
                
            fs.readFile(libraryPath, 'utf-8', (err, data) => {
                if(err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.statusCode = 500;
                    return res.end(JSON.stringify({ message: 'server error' }));
                }

                const books = JSON.parse(data);

                for(const key in books) {
                    if(parseInt(key) === id) {
                        books[key].title = changedBook.title;
                        books[key].author = changedBook.author;
                        books[key].year = changedBook.year;
                    }
                }

                fs.writeFile(
                    libraryPath,
                    JSON.stringify(books, null, 2),
                    (err) => {
                        if(err) {
                            res.setHeader('Content-Type', 'application/json');
                            res.statusCode = 500;
                            return res.end(JSON.stringify({ message: 'server error' }));
                        }
                        res.setHeader('Content-Type', 'application/json');
                        res.statusCode = 200;
                        return res.end(JSON.stringify({ message: 'book modified' }));
                    })

            }) 


        });
    }

    if(req.method === PATCH && req.url.startsWith('/books/')) {
        const contentType = req.headers['content-type'];

        if(contentType !== 'application/json') {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 400;
            res.end('invalid content-type');
            return req.destroy();
        }

        const parts = req.url.split('/');
        const id = parseInt(parts[2]);

        if(isNaN(id)) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 404;
            return res.end(JSON.stringify({ message: 'invalid/missing ID' }));
        }
        
        const chunks = [];

        req.on('data', (chunk) => {
            chunks.push(chunk);
        });

        req.on('end', () => {
            let changedBook = null;

            try {
                const combinedChunks = Buffer.concat(chunks);
                changedBook = JSON.parse(combinedChunks.toString());
            } catch (err) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 400;
                return res.end(JSON.stringify({ message: 'bad JSON'}));
            }
    
            if(!(changedBook.title) && !(changedBook.author) && !(changedBook.year)) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 400;
                return res.end(JSON.stringify({ message: 'information missing' }));
            }

            fs.readFile(libraryPath, 'utf-8', (err, data) => {
                if(err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.statusCode = 500;
                    return res.end(JSON.stringify({ message: 'server error' }));
                }

                const books = JSON.parse(data);

                for(const key in books) {
                    if(parseInt(key) === id) {
                        books[key].title = changedBook?.title ? changedBook.title : books[key].title;
                        books[key].year = changedBook?.year ? changedBook.year : books[key].year;
                        books[key].author = changedBook?.author ? changedBook.author : books[key].author;
                    }
                }

                fs.writeFile(
                    libraryPath,
                    JSON.stringify(books, null, 2),
                    (err) => {
                        if(err) {
                            res.setHeader('Content-Type', 'application/json');
                            res.statusCode = 500;
                            return res.end(JSON.stringify({ message: 'server error' }));
                        }
                        res.setHeader('Content-Type', 'application/json');
                        res.statusCode = 200;
                        return res.end(JSON.stringify({ message: 'book modified' }));
                })

            }) 

        });

    }

    if(req.method === DELETE && req.url.startsWith('/books/')) {
        const contentType = req.headers['content-type'];

        if(contentType !== 'application/json') {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 400;
            res.end('invalid content-type');
            return req.destroy();
        }

        const parts = req.url.split('/');
        const id = parseInt(parts[2]);

        if(isNaN(id)) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 404;
            return res.end(JSON.stringify({ message: 'invalid/missing ID' }));
        }

        fs.readFile(libraryPath, 'utf-8', (err, data) => {
            if(err) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 500;
                return res.end(JSON.stringify({ message: 'server error' }));
            }

            const books = JSON.parse(data);

            for(const key in books) {
                if(parseInt(key) === id) {
                    delete books[key];
                }
            }

            fs.writeFile(
                libraryPath,
                JSON.stringify(books, null, 2),
                (err) => {
                    if(err) {
                        res.setHeader('Content-Type', 'application/json');
                        res.statusCode = 500;
                        return res.end(JSON.stringify({ message: 'server error' }));
                    }
                    res.setHeader('Content-Type', 'application/json');
                    res.statusCode = 204;
                    return res.end();
            });
        }); 
    }

    if(req.method === OPTIONS && req.url === '/books') {
        res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        res.statusCode = 204;
        return res.end();
    }

});

server.listen(PORT, HOST, () => {
    console.log(`server is running on port: ${PORT}`);
});
