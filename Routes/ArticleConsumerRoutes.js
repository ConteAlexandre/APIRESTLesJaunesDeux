const articleConsumer = require('../Controllers/ArticleConsumerController');
const {requireSignin} = require('../Controllers/AuthController');
const Consumer = require('../Controllers/ConsumerController');
const express = require('express');

const router = express.Router();

router.post('/create/:userId', requireSignin, articleConsumer.createArticleConsumer);

router.param('userId', Consumer.consumerById);
module.exports = router;