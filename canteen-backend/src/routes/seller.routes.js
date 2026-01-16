const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/seller.controller');

// Register endpoint
router.post('/register/', sellerController.register);

// Login endpoint
router.post('/login/', sellerController.login);

module.exports = router;