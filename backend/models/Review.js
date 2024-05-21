const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  hotel_Id: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  images: [String]
});

module.exports = mongoose.model('Review', reviewSchema);