const path = require('node:path');
const fileWorkPath = path.join(process.cwd(), 'utils', 'fileWork.js'); 
const { readFile, writeFile } = require(fileWorkPath);

const addItem = async(req, res, next) => {
    if(!req.body) {
        return res.status(400).json({
            message: 'invalid body'
        })
    }
    const { itemId } = req.body;
    
    const userId = parseInt(req.params.userId);

    if(userId !== req.user.id) {
        return res.status(400).json({
            message: 'user-ID in URL incorrect'
        });
    }

    const productsPath = path.join(process.cwd(), 'data', 'products.json');
    const products = await readFile(productsPath);
    
    const product = products.find(product => product.id === itemId);
    
    if(!product) {
        return res.status(404).json({
            message: 'item not found'
        });
    }

    if(product.quantity === 0) {
        return res.status(404).json({
            message: 'item is out of stock'
        });
    }
    
    const cartsPath = path.join(process.cwd(), 'data', 'carts.json');
    const carts = await readFile(cartsPath);
    
    let cart = carts.find(cart => userId === cart.userId);
    
    if(!cart) {
        const cartId = Date.now();
        cart = {
            'id': cartId,
            'userId': userId,
            'items': []
        }
        carts.push(cart)
    } 

    let item = cart.items.find(item => itemId === item.productId);

    if(!item) {
        item = { 'productId': itemId, 'quantity': 0 };
        cart.items.push(item);
    } 

    ++item.quantity;

    await writeFile(cartsPath, carts);

    next();
}

module.exports = addItem;