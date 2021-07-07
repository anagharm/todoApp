const express 	= require("express");
const router 	= express.Router();
const StatusController = require('./statuses_controllers');

router.post('/post/data', StatusController.insert_data); 
router.patch('/patch/data', StatusController.update_data); 
router.get('/get/list/status',StatusController.list );
router.get('/get/list/statuskeyvalue',StatusController.list_statuskeyvalue );
router.delete('/delete/status',StatusController.delete_data );

module.exports = router;