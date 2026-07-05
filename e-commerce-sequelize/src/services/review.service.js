const reviewRepository = require('../repositories/review.repository');
const orderRepository = require('../repositories/order.repository');
const productRepository = require('../repositories/product.repository');
const { 
    UnauthorizedError,
    NotFoundError
} = require('../errors')

class ReviewService {
    async listAllReviews(productId) {
        return reviewRepository.getAllReviews(productId);
    }

    async generateReview(userId, productId, review) {
        const product = await productRepository.findOneProduct(productId);

        if(!product) {
            throw new NotFoundError(
                `Product with ID ${productId} not found`,
                'PROD_NOT_FOUND'
            );
        }

        const orders = await orderRepository.listOneUsersOrders(userId);

        for(const order of orders) {
            const orderItems = await orderRepository.listAllOrderItems(order.id);

            const orderItem = orderItems.find((orderItem => orderItem.productId === productId));
            
            if(orderItem) {
                review.userId = userId;
                review.productId = productId;
                return reviewRepository.addAReview(review);
            }
        }

        throw new UnauthorizedError(
            'You can only leave a review for products you have purchased',
            'PURCHASE_MISSING'
        );
    }

    async removeAReview(userId, reviewId, isAdmin) {
        const review = await reviewRepository.getAReview(userId, reviewId);

        if(!isAdmin && !review) {
            throw new UnauthorizedError(
                `Review doesn't belong to you`,
                'OTHER_REVIEW_ERR'
            )
        }
        const deletedCount = await reviewRepository.removeReview(reviewId);

        if(!deletedCount) {
            throw new NotFoundError(
                `Review with id ${reviewId} not found`,
                'REVIEW_NOT_FOUND'
            );
        }
    }
}

module.exports = new ReviewService();