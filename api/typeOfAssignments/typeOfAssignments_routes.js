const express 	= require("express");
const router 	= express.Router();
const TypeOfAssignmentsController = require('./typeOfAssignments_controllers');

router.post('/post/data', TypeOfAssignmentsController.insert_data); 
router.patch('/patch/data', TypeOfAssignmentsController.update_data); 
router.get('/get/list/typeofassignment',TypeOfAssignmentsController.list );
router.get('/get/list/typeofassignmentkeyvalue',TypeOfAssignmentsController.list_TypeOfAssignmentkeyvalue );
router.delete('/delete/typeofassignment',TypeOfAssignmentsController.delete_data );

module.exports = router;