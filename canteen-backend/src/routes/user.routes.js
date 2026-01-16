const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Send OTP endpoint
router.post('/send-otp/', userController.sendOTP);

// Register endpoint
router.post('/register/', userController.register);

module.exports = router;