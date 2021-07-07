const express 	= require("express");
const router 	= express.Router();
const ProfileController = require('./profiles_controllers');

router.get('/get/listofusers', ProfileController.list_user); 
router.get('/get/user/:usercode', ProfileController.view_user); 

module.exports = router;