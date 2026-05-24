const path = require('node:path');
const fileWorkPath = path.join(process.cwd(), 'utils', 'fileWork.js'); 
const { readFile, writeFile } = require(fileWorkPath);
const constants = path.join(process.cwd(), 'constants.js');
const { PENDING } = require(constants);

const createOrder = async(req, res, next) => {
    const userId = parseInt(req.params.userId);

    if(userId !== req.user.id) {
        return res.status(400).json({
            message: 'user-ID in URL incorrect'
        });
    }

    const productsPath = path.join(process.cwd(), 'data', 'products.json');
    const products = await readFile(productsPath);
    
    const cartsPath = path.join(process.cwd(), 'data', 'carts.json');
    const carts = await readFile(cartsPath);
    
    let cart = carts.find(cart => userId === cart.userId);
    
    if(!cart || cart.items.length === 0) {
        return res.status(404).json({
            message: 'cart is empty'
        });
    }
    
    const order = {
        'orderId': Date.now(),
        'userId': userId,
        'orderDate': new Date().toISOString(),
        'totalAmount': 0,
        'status': PENDING,
        'items': []
    }
    
    const idxToRemove = [];

    for(const item of cart.items) {
        const product = products.find(product => product.id === item.productId);
        
        if(!product || item.quantity > product.quantity) continue;
        
        order.items.push({
            'itemId': product.id,
            'quantity': item.quantity,
            'price': product.price
        });

        order.totalAmount += (item.quantity * product.price);
        product.quantity -= item.quantity;

        const itemIndex = cart.items.indexOf(item);
        idxToRemove.push(itemIndex);
    }

    idxToRemove.sort((a, b) => b - a);

    for(const idx of idxToRemove) {
        cart.items.splice(idx, 1);
    }

    if(!order.totalAmount) {
        return res.status(400).json({
            message: 'order failed, items are sold out'
        })
    }

    const ordersPath = path.join(process.cwd(), 'data', 'orders.json');
    const orders = await readFile(ordersPath);

    orders.push(order);

    await writeFile(ordersPath, orders);    

    await writeFile(cartsPath, carts);

    await writeFile(productsPath, products);

    next();

}

module.exports = createOrder;