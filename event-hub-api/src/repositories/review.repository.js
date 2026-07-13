const event = require('../models/event');
const Review = require('../models/review');

class ReviewRepository {
    async getReviews(eventId) {
        return Review.find({eventId})
        .populate({
            path: 'userId',
            select: 'email'
        })
        .populate({
            path: 'eventId',
            select: 'title'
        });
    }

    async addReview(review) {
        return Review.create(review);
    }

    async removeReview(reviewId, userId) {
        return Review.findOneAndDelete({ _id: reviewId, userId });
    }
}

module.exports = new ReviewRepository();