const express 	= require("express");
const router 	= express.Router();
const SchoolWorkController = require('./schoolWorks_controllers');

router.post('/post/data', SchoolWorkController.insert_data); 
router.patch('/patch/data', SchoolWorkController.update_data); 
router.get('/get/list/schoolwork',SchoolWorkController.list );
router.get('/get/list/schoolworkusrwise/:usercode',SchoolWorkController.listUserWise );
router.delete('/delete/schoolwork',SchoolWorkController.delete_data );

module.exports = router;