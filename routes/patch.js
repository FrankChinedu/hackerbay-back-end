const express = require('express');
const Auth = require('../middleware/validation/auth');
const Controller = require('../controller/PatchController');

const router = express.Router();

router.patch('/patch',  Auth.isAuthenticated, Auth.patch, Controller.patch)

module.exports = router;