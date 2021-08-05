const express 	= require("express");
const router 	= express.Router();
const SubjectController = require('./subjects_controllers');

router.post('/post/data', SubjectController.insert_data); 
router.patch('/patch/data', SubjectController.update_data); 
router.get('/get/list/subject',SubjectController.list );
router.get('/get/list/subjectkeyvalue',SubjectController.list_subjectkeyvalue );
router.delete('/delete/subject',SubjectController.delete_data );

module.exports = router;