const express = require('express');

const authController = require('../controllers/auth/AuthController');

const router = express.Router();

router.get('/me', authController.getUser);

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.get('/logout', authController.logoutUser)

module.exports = router;