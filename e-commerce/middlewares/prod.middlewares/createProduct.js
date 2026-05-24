const path = require('node:path');
const fileWorkPath = path.join(process.cwd(), 'utils', 'fileWork.js'); 
const { readFile, writeFile } = require(fileWorkPath);

const createProduct = async(req, res, next) => {
    if(!req.body) {
        return res.status(400).json({
            message: 'invalid body'
        })
    }
    const {username, name, description, price, quantity} = req.body;

    if(!username || !name || !description || !price || !quantity) {
        return res.status(400).json({
            message: 'username & name & description & price & quantity required'
        });
    }

    const usersDataPath = path.join(process.cwd(), 'data', 'users.json');
    const users = await readFile(usersDataPath);

    const user = users.find((user) => user.username === username);

    if(user.role !== 'admin') {
        return res.status(403).json({
            message: 'not authorized'
        });
    }

    const productsPath = path.join(process.cwd(), 'data', 'products.json');
    const products = await readFile(productsPath);

    const id = Date.now();

    const product = {
        'id': id,
        'name': name,
        'description': description,
        'price': price,
        'quantity': quantity
    }

    products.push(product);

    await writeFile(productsPath, products);

    next();
}

module.exports = createProduct;