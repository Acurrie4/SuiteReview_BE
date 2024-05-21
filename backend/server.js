const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const User = require('./models/User');
const Hotel = require('./models/Hotel');
const Review = require('./models/Review');
const seedDataUsers = require('./seedDataUsers');
const seedDataHotels = require('./seedDataHotels');
const seedDataReviews = require('./seedDataReviews');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Import routes
const reviewRoutes = require('./controllers/reviewController');
const userRoutes = require('./controllers/userController');

// Use routes
app.use('/api/reviews', reviewRoutes); // update for hotel & reviews
app.use('/api/users', userRoutes);

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