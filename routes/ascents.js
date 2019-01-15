const express = require('express');

const ascentController = require('../controllers/ascent/AscentController');
const isAuth = require('../middelware/is-auth');

const router = express.Router();

router.get('/:user', ascentController.getAscents);

router.post('/add', isAuth, ascentController.postAscent);

module.exports = router;