const path = require('node:path');
const fileWorkPath = path.join(process.cwd(), 'utils', 'fileWork.js'); 
const { readFile, writeFile } = require(fileWorkPath);

const clearCart = async(req, res, next) => {
    const userId = parseInt(req.params.userId);

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

    cart.items = [];
    cart.quantity = 0;

    await writeFile(cartsPath, carts);
    
    next();
}

module.exports = clearCart;