const orderRepository = require('../repositories/order.repository');
const cartRepository = require('../repositories/cart.repository');
const productRepository = require('../repositories/product.repository');
const { sequelize } = require('../../models');
const {
    NotFoundError,
    BadRequestError
} = require('../errors')

class OrderService {
    async addOrder(userId) {
        await sequelize.transaction(async (transaction) => {
            const cart = await cartRepository.getCart(userId);
            
            const cartItems = await cartRepository.getCartItems(cart.id);

            const orderData = [];
            let totalAmount = 0;

            for (const cart of cartItems) {
                if(cart.quantity > cart.product.stock) {
                    throw new BadRequestError(
                        `Product with id ${cart.product.id} not enough in stock.
                         Check the quantity in cart to complete the order`,
                         'QUANTITY_ERR'
                    )
                }
                orderData.push({
                    productId: cart.product.id,
                    quantity: cart.quantity,
                    priceAtPurchase: cart.product.price
                });
                
                console.log(cart.product.price, cart.quantity);

                totalAmount += cart.product.price * cart.quantity;

            }

            const createdOrder = await orderRepository.generateOrder({
                userId,
                total: totalAmount
            }, 
            transaction);
            
            for(const order of orderData) {
                order.orderId = createdOrder.id;
                const product = await productRepository.findOneProduct(order.productId);
                const stock = product.stock;
    
                await orderRepository.generateOrderItems(order, transaction);

    
                await productRepository.decrimentStock(
                    stock,
                    order.quantity, 
                    order.productId,
                    transaction 
                );
            }

            await cartRepository.emptyCart(cart.id, transaction);
        })
    }

    async listOrders(userId, isAdmin) {
        if(!isAdmin) {
            return orderRepository.listOneUsersOrders(userId);
        }

        return orderRepository.listAllUsersOrders();
    }

    async listOneOrder(userId, orderId) {
        const userOrders = await orderRepository.listOneUsersOrders(userId);

        for(const order of userOrders) {
            if(order.id === orderId) {
                return order;
            }
        }

        throw new NotFoundError(
            `Order with id ${orderId} not found`,
            'ORDER_NOT_FOUND'
        );
    }

    async updateOrderStatus(orderId, status) {
        const updatedOrder = await orderRepository.changeOrderStatus(orderId, status);

        if(!updatedOrder) {
            throw new NotFoundError(
            `Order with id ${orderId} not found`,
            'ORDER_NOT_FOUND'
            );
        }
        return updatedOrder;
    }
}

module.exports = new OrderService(); 