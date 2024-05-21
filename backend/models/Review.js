const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Review', reviewSchema);