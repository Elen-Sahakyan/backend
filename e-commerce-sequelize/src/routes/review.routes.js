const router = require('express').Router()
const reviewController = require('../controllers/review.controller');
const {
    authMiddleware,
    validateMiddleware
} = require('../middlewares');
const asyncHandler = require('../../utils/asyncHandler');
const createReviewSchema = require('../validations/review.validation');

router.get('/:id/reviews', asyncHandler(reviewController.getReviews));
router.post(
    '/:id/reviews', 
    authMiddleware, 
    validateMiddleware(createReviewSchema),
    asyncHandler(reviewController.createReview)
);
router.delete(
    '/reviews/:id', 
    authMiddleware, 
    asyncHandler(reviewController.deleteReview)
);

module.exports = router;