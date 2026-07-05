const { Review, User, Product } = require('../../models');

class ReviewRepository {
    async getAllReviews(productId) {
        return Review.findAll({
            where: { productId },
            include: [
                {
                    model: User,
                    as: 'user'
                },
                {
                    model: Product,
                    as: 'product'
                }
            ]
        });
    }

    async getAReview(userId, reviewId) {
        return Review.findOne({
            where: { 
                id: reviewId,
                userId 
            }
        });
    }

    async addAReview(review) {
        return Review.create(review);
    }

    async removeReview(reviewId) {
        return Review.destroy({
            where: { id: reviewId }
        });
    }
}

module.exports = new ReviewRepository();