const path = require('node:path');
const fileWorkPath = path.join(process.cwd(), 'utils', 'fileWork.js'); 
const { readFile } = require(fileWorkPath);

const listOne = async (req, res) => {

    const id = parseInt(req.params.id);

    const productsPath = path.join(process.cwd(), 'data', 'products.json');
    const products = await readFile(productsPath);
        
    const product = products.find(product => product.id === id);


    if(!product) {
        return res.status(404).json({
            message: 'item not found'
        });
    }

    res.status(200).json(product);
}

module.exports = listOne;