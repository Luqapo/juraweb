const express = require('express');
const { body } = require('express-validator/check');

const cragsController = require('../controllers/crags/CragsController');
const isAuth = require('../middelware/is-auth');

const router = express.Router();

router.get('/regiony/:region_id', cragsController.getRejony);

router.get('/rejony/:rejon_id', cragsController.getSkaly);

router.get('/skaly/:skala_id', cragsController.getRoutes);

router.post('/droga/add', 
[
    body('droga')
      .trim()
      .not()
      .isEmpty(),
    body('wycena')
      .trim()
      .not()
      .isEmpty()
], isAuth, cragsController.addRoute);

router.post('/search', cragsController.searchRoute);

module.exports = router;