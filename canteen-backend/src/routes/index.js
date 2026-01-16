const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');

// Mount user routes at /users
router.use('/users', userRoutes);

module.exports = router;