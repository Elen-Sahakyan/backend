const { Cart, CartItems, User, Product } = require('../../models');

class CartRepository {
    async getCart(userId) {
        return Cart.findOne({
            where: {
                userId
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: {
                        exclude: ['password', 'role']
                    }
                }
            ]
        });
    }

    getCartItems(cartId) {
        return CartItems.findAll({
            where: { cartId },
            include: [
                {
                    model: Product,
                    as: 'product'
                }
            ]
        });
    }

    async addToCart(cartId, productId, quantity) {
        return CartItems.create({
            cartId,
            productId,
            quantity
        });
    }

    async changeProductQuantity(cartId, productId, quantity) {
        const [, [updatedCart]] = await CartItems.update({ quantity }, {
            where: {
                cartId,
                productId
            },
            returning: true
        });

        return updatedCart;
    }

    async emptyCart(cartId, transaction) {
        return CartItems.destroy({
            where: { cartId },
            transaction
        });
    }

    async removeProduct(cartId, productId) {
        const deletedCount = await CartItems.destroy({
            where: {
                cartId,
                productId
            }
        })
        return deletedCount;
    }
}

module.exports = new CartRepository();