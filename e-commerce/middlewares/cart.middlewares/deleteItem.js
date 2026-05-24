const path = require('node:path');
const fileWorkPath = path.join(process.cwd(), 'utils', 'fileWork.js'); 
const { readFile, writeFile } = require(fileWorkPath);

const deleteItem = async (req, res, next) => {
    const userId = parseInt(req.params.userId);
    const itemId = parseInt(req.params.productId);

    if(userId !== req.user.id) {
        return res.status(400).json({
            message: 'user-ID in URL incorrect'
        });
    }

    const cartsPath = path.join(process.cwd(), 'data', 'carts.json');
    const carts = await readFile(cartsPath);

    let cart = carts.find(cart => req.user.id === cart.userId);
        
    if(!cart) {
        return res.status(404).json({
            message: 'cart is empty'
        });
    }

    const filtered = cart.items.filter(item => item.productId !== itemId);

    cart.items = filtered;
    
    await writeFile(cartsPath, carts);

    next();
}

module.exports = deleteItem;