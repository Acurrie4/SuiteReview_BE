const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 150 // Set maximum length for description
    },
    images: [String], // Array of image URLs
    hotel_Id: {
        type: Number,
        required: true
    },
ave_rating:{
        type: Number
    }
});