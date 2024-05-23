const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error });
  }
});

// GET user profile by user ID
router.get('/:user_Id', async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.params.user_Id); // Convert to ObjectId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Sign up
// POST create a new user
router.post('/new', async (req, res) => {
  const { userName, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName, 
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Log in
// POST login a user
router.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  try {
    // Find user by userName
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add seed data
router.get('/newUser', async (req, res) => {
  const Users = await User.create([
    {
      userName: 'janedoe84',
      firstName: 'Jane',
      lastName: 'Doe',
      userImage: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/777.png',
      description: 'Hi there! I\'m Jane, a travel enthusiast who loves exploring new places and trying out local cuisines.',
      password: 'user123',
      user_Id: 100
  },
  {
      userName: 'mike_smith',
      firstName: 'Mike',
      lastName: 'Smith',
      userImage: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png',
      description: 'Hey, I\'m Mike! I enjoy hiking, photography, and spending time with my dog.',
      password: 'user456',
      user_Id: 101
  },
  {
      userName: 'sara_jones',
      firstName: 'Sara',
      lastName: 'Jones',
      userImage: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/311.png',
      description: 'Hello, I\'m Sara. I\'m passionate about cooking, reading, and gardening.',
      password: 'user789',
      user_Id: 102
  },
  {
      userName: 'alex_wilson',
      firstName: 'Alex',
      lastName: 'Wilson',
      userImage: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/702.png',
      description: 'Hi, I\'m Alex! I\'m a fitness enthusiast and love trying out new workout routines.',
      password: 'password1234',
      user_Id: 103
  },
  {
      userName: 'emily_brown',
      firstName: 'Emily',
      lastName: 'Brown',
      userImage: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/429.png',
      description: 'Nice to meet you! I\'m Emily. I enjoy painting, writing, and exploring art galleries.',
      password: 'securePassword567',
      user_Id: 104
  }
  ])
})

module.exports = router;