const express = require('express');
const router = express.Router();
const Product = require('../models/Product')
const userController = require('../controllers/UsersController');
const {authJwt, verifySignup} = require('../middlewares')

// router.route('/')
//     .post(userController.create)

module.exports = router;
