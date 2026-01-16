const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const sellerRoutes = require('./seller.routes');

// Mount user routes at /users
router.use('/users', userRoutes);

// Mount seller routes at /sellers
router.use('/sellers', sellerRoutes);

module.exports = router;