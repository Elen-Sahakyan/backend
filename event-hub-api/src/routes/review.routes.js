const router = require('express').Router();
const reviewController = require('../controllers/review.controller');
const {
    asyncHandler
} = require('../../utils');
const {
    authMiddleware,
    validationMiddleware,
} = require('../middlewares');
const { createReviewSchema } = require('../validations'); 

router.get(
    '/:id/reviews', 
    asyncHandler(reviewController.findReviews)
);

router.post(
    '/:id/reviews',
    authMiddleware,
    validationMiddleware(createReviewSchema),
    asyncHandler(reviewController.createReview)
);

router.delete(
    '/reviews/:id',
    authMiddleware,
    asyncHandler(reviewController.deleteReview)
);

module.exports = router;