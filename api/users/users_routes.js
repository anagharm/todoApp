const express 	= require("express");
const router 	= express.Router();
const UserController = require('./users_controllers');

//Signup and Login URL
router.post('/post/signup', UserController.create_user); 
router.post('/post/login', UserController.user_login);

module.exports = router;