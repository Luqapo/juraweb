const express = require('express');

const ascentController = require('../controllers/ascent/AscentController');

const router = express.Router();

router.get('/:user', ascentController.getAscents);

router.post('/add', ascentController.postAscent);

module.exports = router;