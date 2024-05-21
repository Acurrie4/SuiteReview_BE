const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: String,
    state: String,
    city: String,
    address: String,
    description: String,
    images: [String],
    hotel_Id: Number
});

module.exports = mongoose.model('Hotel', hotelSchema);