const path = require('node:path');
const fileWorkPath = path.join(process.cwd(), 'utils', 'fileWork.js'); 
const { readFile } = require(fileWorkPath);

const listOrders = async (req, res) => {
    const userId = parseInt(req.params.userId);

    if(userId !== req.user.id) {
        return res.status(400).json({
            message: 'user-ID in URL incorrect'
        });
    }

    const ordersPath = path.join(process.cwd(), 'data', 'orders.json');
    const orders = await readFile(ordersPath);

    const userOrders = [];

    for(const order of orders) {
        if(order.userId === userId) {
            userOrders.push(order);
        }
    }

    if(!userOrders.length) {
        return res.status(404).json({
            message: 'orders not found'
        });
    }

    return res.status(200).json(userOrders);
}

module.exports = listOrders;