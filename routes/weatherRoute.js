const express = require('express');
const weatherController = require('./../controllers/weatherController')

const router = express.Router();

router.route('/')
    .get(weatherController.getResults,weatherController.createWeather)

router.route('/history')
    .get(weatherController.getAll)

module.exports = router;