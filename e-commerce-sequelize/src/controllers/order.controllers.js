const orderService = require('../services/order.service');

class OrderController {
    async createOrder(req, res) {
        const { id } = req.user;

        const newOrder = await orderService.addOrder(parseInt(id));

        return res.status(201).json({
            message: 'Order completed successfully',
            newOrder
        });
    }

    async getOrders(req, res) {
        const { id } = req.user;
        let isAdmin = false;

        if(req.user.role === 'admin') {
            isAdmin = true;
        }

        const orders = await orderService.listOrders(parseInt(id), isAdmin);

        return res.status(200).json(orders);
    }

    async getOrder(req, res) {
        const userId = req.user.id;
        const { id } = req.params;

        const order = await orderService.listOneOrder(parseInt(userId), parseInt(id));

        return res.status(200).json(order);
    }

    async updateStatus(req, res) {
        const { id } = req.params;
        const { status } = req.body;
        
        const updatedOrder = await orderService.updateOrderStatus(parseInt(id), status);

        return res.status(201).json({
            message: `Status updated to ${status}`,
            updatedOrder
        });
    }
}

module.exports = new OrderController();