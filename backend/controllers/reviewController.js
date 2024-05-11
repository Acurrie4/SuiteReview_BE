const Review = require('../models/Review');

// POST a new review
exports.createReview = async (req, res) => {
  const { hotelName, reviewText, rating } = req.body;
  try {
    const review = await Review.create({
      hotelName,
      reviewText,
      rating,
      user: req.user.id  // assuming user id is available in req.user
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user', 'username');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
