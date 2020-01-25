const express = require('express');
const Consumer = require('../Controllers/ConsumerController');

const router = express.Router();

router.post('/signin', Consumer.loginConsumer);
router.post('/signup', Consumer.signup);

module.exports = router;