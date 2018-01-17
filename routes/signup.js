const express = require('express');
const router = express.Router();
const Signup = require('../controllers/signup')

router.post('/', Signup.create)

module.exports = router