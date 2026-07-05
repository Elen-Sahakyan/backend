const cartService = require('../services/cart.service');

class CartController {
    async listCart(req, res) {
        const { id } = req.user;

        const cart = await cartService.showCart(parseInt(id));

        return res.status(200).json(cart);
    }

    async addItem(req, res) {
        const {
            productId,
            quantity
        } = req.body;
        const { id } = req.user;

        console.log(productId, quantity, id);

        const cartItems = await cartService.addProduct(parseInt(id), parseInt(productId), quantity);
        
        return res.status(201).json({
            message: 'Item added successfully',
            cartItems
        });
    }

    async updateCart(req, res) {
        const { id } = req.user;
        const productId = req.params.id;
        const { quantity } = req.body;

        const updatedCart = await cartService.updateProductQuantity(parseInt(id), parseInt(productId), quantity);
        
        return res.status(201).json({
            message: 'Quantity updated successfully',
            updatedCart
        });
    }

    async deleteCartItem(req, res) {
        const { id } = req.user;
        const productId = req.params.id;

        await cartService.removeItem(parseInt(id), productId);

        return res.status(204).json();
    }
}

module.exports = new CartController()