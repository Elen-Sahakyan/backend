const path = require('node:path');
const fileWorkPath = path.join(process.cwd(), 'utils', 'fileWork.js'); 
const { readFile, writeFile } = require(fileWorkPath);

const updateProduct = async(req, res, next) => {
    if(!req.body) {
        return res.status(400).json({
            message: 'invalid body'
        })
    }
    
    const id = parseInt(req.params.id);

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

    const product = products.find(product => product.id === id);

    if(!product) {
        return res.status(404).json({
            message: 'item not found'
        });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;

    await writeFile(productsPath, products);

    next();
}

module.exports = updateProduct;