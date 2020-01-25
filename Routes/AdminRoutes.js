const express = require('express');
const Admin = require('../Controllers/AdminController');

const router = express.Router();

router.post('/signup/', Admin.createAdmin);

module.exports = router;