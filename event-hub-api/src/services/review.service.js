const reviewRepository = require('../repositories/review.repository');
const eventRepository = require('../repositories/event.repository');
const { 
    BadRequestError,
    NotFoundError
 } = require('../errors')


class ReviewService {
    async getAllReviews(eventId) {
        return reviewRepository.getReviews(eventId); 
    }

    /**
    * Creates a review only if the user attended the event.
    */
    async generateReview(userId, eventId, review) {
        const attended = await eventRepository.getUserEvent(userId, eventId);

        if(!attended) {
            throw new BadRequestError(
                'You can only review events you have attended',
                'REVIEW_NOT_ALLOWED'
            )
        }

        review.userId = userId;
        review.eventId = eventId;        

        return reviewRepository.addReview(review);
    }

    /**
    * Deletes a review owned by the specified user.
    */
    async deleteAReview(reviewId, userId) {
        const deleted = await reviewRepository.removeReview(reviewId, userId);

        if(!deleted) {
            throw new NotFoundError(
                'Review not found',
                'REVIEW_NOT_FOUND'
            );
        }
    }
}

module.exports = new ReviewService();