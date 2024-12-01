// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser,updateUser } = require('../controllers/authController');


// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

router.put('/update/:id', updateUser);

module.exports = router;
