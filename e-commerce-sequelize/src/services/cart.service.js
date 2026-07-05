const cartRepository = require('../repositories/cart.repository');
const productRepository = require('../repositories/product.repository');
const { 
    NotFoundError,
} = require('../errors');

class CartService {
    async showCart(userId) {
        const cart = await cartRepository.getCart(userId);

        if(!cart) {
            throw new NotFoundError('Cart not found', 'CART_NOT_FOUND');
        }

        const cartItems = await cartRepository.getCartItems(cart.id);

        if(!cartItems?.length) return cart;

        return cartItems;
    }

    async addProduct(userId, productId, quantity) {
        const cart = await cartRepository.getCart(userId);

        if(!cart) {
            throw new NotFoundError('Cart not found', 'CART_NOT_FOUND');
        }

        const product = await productRepository.findOneProduct(productId);
        
        if(!product) {
            throw new NotFoundError(`Product with ID ${productId} not found`, 'PROD_NOT_FOUND');
        }
                
        const cartItems = await cartRepository.getCartItems(cart.id);
        
        const cartProduct = cartItems.find(item => item.productId === productId);
        
        if(!cartProduct) {
            return cartRepository.addToCart(cart.id, productId, quantity);
        }

        const newQuantity = cartProduct.quantity + quantity;

        const updated = await cartRepository.changeProductQuantity(cart.id, productId, newQuantity);

        return updated;
    }

    async updateProductQuantity(userId, productId, quantity) {
        const cart = await cartRepository.getCart(userId);

        if(!cart) {
            throw new NotFoundError('Cart not found', 'CART_NOT_FOUND');
        }

        const product = await productRepository.findOneProduct(productId);
        
        if(!product) {
            throw new NotFoundError(`Product with ID ${productId} not found`, 'PROD_NOT_FOUND');
        }

        const cartItems = await cartRepository.getCartItems(cart.id);
        
        const cartProduct = cartItems.find(item => item.productId === productId);
        
        if(!cartProduct) {
            throw new NotFoundError(
                `Product with ID ${productId} not found, add it to cart et first`, 
                'CART_ITEM_NOT_FOUND'
            );
        }

        return cartRepository.changeProductQuantity(cart.id, productId, quantity);
    }

    async removeItem (userId, productId) {
        const cart = await cartRepository.getCart(userId);

        if(!cart) {
            throw new NotFoundError('Cart not found', 'CART_NOT_FOUND');
        }
        
        const deletedCount = await cartRepository.removeProduct(cart.id, productId);

        if(!deletedCount) {
            throw new NotFoundError(`Product with ID ${productId} not found`, 'PROD_NOT_FOUND');
        }

        return deletedCount;
    }
}

module.exports = new CartService();