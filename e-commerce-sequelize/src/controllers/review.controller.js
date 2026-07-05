const reviewService = require('../services/review.service');

class ReviewController {
    async getReviews(req, res) {
        const { id } = req.params;

        const reviews = await reviewService.listAllReviews(parseInt(id));

        return res.status(200).json(reviews);
    }

    async createReview(req, res) {
        const userId = parseInt(req.user.id);
        const productId = parseInt(req.params.id);
        const review = req.body;

        const newReview = await reviewService.generateReview(userId, productId, review);

        return res.status(201).json({
            message: 'Review posted',
            review
        });
    }

    async deleteReview(req, res) {
        const userId = parseInt(req.user.id);
        const reviewId = parseInt(req.params.id);
        let isAdmin = false;

        if(req.user.role === 'admin') {
            isAdmin = true;
        }

        await reviewService.removeAReview(userId, reviewId, isAdmin);

        return res.status(204).json({
            message: `Review with id ${reviewId} deleted successfully`
        });
    }
}

module.exports = new ReviewController();