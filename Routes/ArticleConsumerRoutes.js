const articleConsumer = require('../Controllers/ArticleConsumerController');
const {requireSignin} = require('../Controllers/AuthController');
const Consumer = require('../Controllers/ConsumerController');
const express = require('express');

const router = express.Router();

router.get('/list', requireSignin, articleConsumer.getAllArticleConsumer);
router.get('/:id', requireSignin, articleConsumer.uniqueArticleConsumer);

router.post('/create/:userId', requireSignin, articleConsumer.createArticleConsumer);

router.param('userId', Consumer.consumerById);
router.param('id', articleConsumer.getArticleConsumerById);
module.exports = router;