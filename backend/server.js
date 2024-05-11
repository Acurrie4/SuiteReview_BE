const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;

const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();
app.use(express.json()); // Middleware to parse JSON

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('DB connection successful!'));

// Routes
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});