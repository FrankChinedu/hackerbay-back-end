const express = require('express');
const Auth = require('../middleware/validation/auth');
const Controller = require('../controller/ThumbNailController');

const router = express.Router();

router.post(
    '/thumbnail',
    Auth.isAuthenticated,
    Auth.thumbnail,
    Controller.createThumbNail
);

module.exports = router;
