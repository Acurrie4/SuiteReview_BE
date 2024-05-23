const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const methodOverride = require('method-override');
const User = require('./models/User');
const Hotel = require('./models/Hotel');
const Review = require('./models/Review');
// const seedDataUsers = require('./seedDataUsers');
// const seedDataHotels = require('./seedDataHotels');
// const seedDataReviews = require('./seedDataReviews');

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
const hotelRoutes = require('./controllers/reviewController')

// Use routes
app.use('/reviews', reviewRoutes);
app.use('/users', userRoutes);
app.use('/hotel', hotelRoutes);

// Temporary route for debugging
// app.get('/hotels', async (req, res) => {
//   try {
//     const hotels = await Hotel.find()
//     res.status(200).json(hotels);
//   }
//   catch (error) {
//     res.status(500).json({ message: error.message});
//   }
// });

// Database connection and server startup
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('DB connection successful!');
        initializeDB();
    })
    .catch(err => console.error('MongoDB connection error:', err));

async function initializeDB() {
    if (await User.countDocuments() === 0) {
        for (const user of seedDataUsers) {
            const newUser = new User(user);
            await newUser.save();
        }
        console.log('Users seeded!');
    }
    if (await Hotel.countDocuments() === 0) {
        for (const hotel of seedDataHotels) {
            const newHotel = new Hotel(hotel);
            await newHotel.save();
        }
        console.log('Hotels seeded!');
    }
    if (await Review.countDocuments() === 0) {
        const users = await User.find(); // Retrieve all users once they are created
        for (const review of seedDataReviews) {
            // Find the user corresponding to the user_Id in the review seed data
            const user = users.find(u => u.user_Id === review.user_Id);
            if (user) {
                const newReview = new Review({
                    ...review,
                    user: user._id, // Use the MongoDB Object ID of the user
                });
                await newReview.save();
            }
        }
        console.log('Reviews seeded!');
    }
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});