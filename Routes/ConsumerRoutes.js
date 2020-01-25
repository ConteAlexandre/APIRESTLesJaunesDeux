const express = require('express');
const Consumer = require('../Controllers/ConsumerController');

const router = express.Router();

router.post('/signup', Consumer.signup);

module.exports = router;