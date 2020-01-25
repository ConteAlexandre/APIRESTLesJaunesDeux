const express = require('express');
const {requireSignin} = require('../Controllers/AuthController');
const Admin = require('../Controllers/AdminController');
const ArticleAdmin = require('../Controllers/ArticleAdminController');

const router = express.Router();

router.get('/list', requireSignin, ArticleAdmin.getAllArcticleAdmin);
router.post('/create/:userId', requireSignin, ArticleAdmin.createArticleAdmin);

router.param('userId', Admin.AdminById);

module.exports = router;