const path = require('node:path');
const fileWorkPath = path.join(process.cwd(), 'utils', 'fileWork.js'); 
const { readFile } = require(fileWorkPath);

const getOrder = async(req, res) => {
    const orderId = parseInt(req.params.orderId);

    const ordersPath = path.join(process.cwd(), 'data', 'orders.json');
    const orders = await readFile(ordersPath);

    const order = orders.find(order => order.orderId === orderId);

    if(!order) {
        return res.status(404).json({
            message: 'order not found'
        });
    }

    return res.status(200).json(order);
}

module.exports = getOrder;