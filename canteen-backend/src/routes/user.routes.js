const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Register endpoint (no OTP required)
router.post('/register/', userController.register);

// Login endpoint
router.post('/login/', userController.login);

module.exports = router;