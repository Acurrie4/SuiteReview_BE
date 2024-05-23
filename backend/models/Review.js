const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  hotel_Id: { type: Number, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  user_Id: { type: Number, required: true },
  images: [String]
});

module.exports = mongoose.model('Review', reviewSchema);