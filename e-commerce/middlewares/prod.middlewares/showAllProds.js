const path = require('node:path');
const fileWorkPath = path.join(process.cwd(), 'utils', 'fileWork.js'); 
const { readFile } = require(fileWorkPath);

const listAll = async (req, res) => {
    const productsPath = path.join(process.cwd(), 'data', 'products.json');
    const products = await readFile(productsPath);

    res.status(200).json(products);
}

module.exports = listAll;