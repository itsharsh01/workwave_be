const express = require('express');
const router = express.Router();
const {register, login} = require('./user.controller');

// Define a route for GET /
router.post('/register', register);

// Define a route for GET /about
router.post('/login', login);

module.exports = router;
