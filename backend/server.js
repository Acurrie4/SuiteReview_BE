const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const methodOverride = require('method-override');
const User = require('./models/User');
const Hotel = require('./models/Hotel');
const Review = require('./models/Review');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.static('public'));

// Import routes
const reviewRoutes = require('./controllers/reviewController');
const userRoutes = require('./controllers/userController');
const hotelRoutes = require('./controllers/hotelController');

// Use routes
app.use('/reviews', reviewRoutes);
app.use('/users', userRoutes);
app.use('/hotels', hotelRoutes);


// Database connection and server startup
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('DB connection successful!');
    })
    .catch(err => console.error('MongoDB connection error:', err));


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});