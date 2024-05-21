const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Hotel = require('../models/Hotel');

// POST a new review
router.post('/', async (req, res) => {
  const { hotelName, reviewText, rating, user } = req.body;
  try {
    const review = await Review.create({
      hotelName,
      reviewText,
      rating,
      user: req.user.id  
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('user', 'username');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// GET a single review by ID
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('user', 'username');
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// PUT update a review by ID
router.put('/:id', async (req, res) => {
  const { hotelName, reviewText, rating } = req.body;
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    review.hotelName = hotelName;
    review.reviewText = reviewText;
    review.rating = rating;
    await review.save();
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a review by ID
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    await review.remove();
    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all hotels
router.get('/hotels', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// GET a single hotel by ID
router.get('/hotels/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;