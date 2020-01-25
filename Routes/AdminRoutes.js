const express = require('express');
const Admin = require('../Controllers/AdminController');

const router = express.Router();

router.post('/create/', Admin.createAdmin);

module.exports = router;