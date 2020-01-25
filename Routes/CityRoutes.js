const express = require('express');
const City = require('../Controllers/CityController');

const router = express.Router();

router.post('/create', City.createCity);

module.exports = router;