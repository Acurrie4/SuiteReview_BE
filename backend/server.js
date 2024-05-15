const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use(cors({
  origin: 'http://localhost:3000' 
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('DB connection successful!'))
.catch(err => console.error('MongoDB connection error:', err)); // Add error handling

const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);

// Export the app for use in other files such as during testing
module.exports = app;

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});