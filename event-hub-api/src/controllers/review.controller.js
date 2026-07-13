const review = require('../models/review');
const reviewRepository = require('../repositories/review.repository');
const reviewService = require('../services/review.service');

class ReviewController {
    async findReviews(req, res) {
        const { id } = req.params;
        const reviews = await reviewService.getAllReviews(id);

        return res.status(200).json(reviews);
    }

    async createReview(req, res) {
        const userId = req.user.id;
        const eventId = req.params.id;
        const review = req.body;        
        
        const createdReview = await reviewService.generateReview(
            userId, 
            eventId, 
            review
        );
        
        return res.status(201).json({
            message: 'Review created successfully',
            createdReview
        });
    }

    async deleteReview(req, res) {
        const reviewId = req.params.id;
        const userId = req.user.id;

        await reviewService.deleteAReview(
            reviewId, 
            userId
        );

        return res.status(204).json();
    }
}

module.exports = new ReviewController();