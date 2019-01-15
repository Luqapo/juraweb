const express = require('express');

const cragsController = require('../controllers/crags/CragsController');

const router = express.Router();

router.get('/regiony/:region_id', cragsController.getRejony);

router.get('/rejony/:rejon_id', cragsController.getSkaly);

router.get('/skaly/:skala_id', cragsController.getRoutes);

router.post('/droga/add', cragsController.addRoute);

router.post('/search', cragsController.searchRoute);

module.exports = router;