const express = require('express');
const Controller = require('../controller/AuthController');
const validation = require('../middleware/validation/auth');

const router = express.Router();

router.post('/login', validation.login, validation.login_sanitize, Controller.login)

module.exports = router;