const { Order, OrderItems, User } = require('../../models');

class OrderRepository {
    async generateOrder(orderData, transaction) {
        return Order.create(orderData, { transaction });
    }

    async generateOrderItems(orderItemsData, transaction) {
        return OrderItems.create(orderItemsData, { transaction });
    }

    async listAllUsersOrders() {
        return Order.findAll({
            include: [
                {
                    model: User,
                    as: 'user'
                } 
            ]
        });
    }

    async listOneUsersOrders(userId) {
        return Order.findAll({
            where: { userId },
            include: [
                {
                    model: User,
                    as: 'user'
                } 
            ]
        });
    }

    async listOneOrderItems(orderId) {
        return OrderItems.findOne({
            where: { orderId },
            include: [
                {
                    model: Order,
                    as: 'order'
                },
                {
                    model: Product,
                    as: 'product'
                } 
            ]
        });
    }

    async listAllOrderItems(orderId) {
        return OrderItems.findAll({
            where: { orderId }
        });
    }

    async changeOrderStatus(orderId, status) {
        const [, [updatedOrder]] = await Order.update(
            { status },
            {
                where: { id: orderId },
                returning: true
            }
        );

        return updatedOrder;
    }

}

module.exports = new OrderRepository();

