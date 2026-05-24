const path = require('node:path');
const fileWorkPath = path.join(process.cwd(), 'utils', 'fileWork.js'); 
const { readFile, writeFile } = require(fileWorkPath);
const constants = path.join(process.cwd(), 'constants.js');
const { PENDING, SHIPPED, DELEVERED, CANCELLED } = require(constants);

const changeStatus = async(req, res, next) => {
    const orderId = parseInt(req.params.orderId);

    const usersDataPath = path.join(process.cwd(), 'data', 'users.json');
    const users = await readFile(usersDataPath);

    const user = users.find((user) => user.id === req.user.id);

    if(user.role !== 'admin') {
        return res.status(403).json({
            message: 'not authorized'
        });
    }

    const ordersPath = path.join(process.cwd(), 'data', 'orders.json');
    const orders = await readFile(ordersPath);

    const order = orders.find(order => order.orderId === orderId);

    if(!order) {
        return res.status(404).json({
            message: 'order not found'
        });
    }

    order.status = SHIPPED;

    writeFile(ordersPath, orders);

    next();
}

module.exports = changeStatus;