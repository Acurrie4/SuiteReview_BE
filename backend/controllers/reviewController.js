const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// POST a new review
router.post('/', async (req, res) => {
  const { hotelName, reviewText, rating, user } = req.body;
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
});

//  Show reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('user', 'username');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// add delete route
// add updat route 
// add update route 
// add edit route
// add hotel routes 2 get 1 show 
module.exports = router;