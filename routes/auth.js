const express = require('express');
const { body } = require('express-validator/check');

const authController = require('../controllers/auth/AuthController');
const User = require('../models/User');

const router = express.Router();

router.post('/register',[
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('login')
      .trim()
      .not()
      .isEmpty()
  ], authController.registerUser);

router.post('/login', authController.loginUser);

//router.get('/logout', authController.logoutUser);

module.exports = router;