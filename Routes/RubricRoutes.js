const express = require('express');
const Rubric = require('../Controllers/RubricController');
const Admin = require('../Controllers/AdminController');
const {requireSignin} = require('../Controllers/AuthController');

const router = express.Router();

router.post('/create/:userId', requireSignin, Rubric.createRubric);

router.param('userId', Admin.AdminById);

module.exports = router;