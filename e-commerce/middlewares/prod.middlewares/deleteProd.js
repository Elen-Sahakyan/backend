const path = require('node:path');
const fileWorkPath = path.join(process.cwd(), 'utils', 'fileWork.js'); 
const { readFile, writeFile } = require(fileWorkPath);

const deleteProduct = async(req, res, next) => {

    const id = parseInt(req.params.id);

    const username = req.user.username;

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

    const filtered = products.filter(product => product.id !== id);

    await writeFile(productsPath, filtered);

    next();
}

module.exports = deleteProduct;