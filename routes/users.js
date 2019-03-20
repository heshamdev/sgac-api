const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')

router.get('/me', auth, userController.me);

router.post('/', userController.post);

module.exports = router; 
