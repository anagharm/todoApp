const express 	= require("express");
const router 	= express.Router();
const ToDoListController = require('./todoLists_controllers');

router.post('/post/data', ToDoListController.insert_data); 
router.patch('/patch/data', ToDoListController.update_data); 
router.patch('/patch/status', ToDoListController.update_status); 
router.get('/get/list',ToDoListController.list );
router.get('/get/tasklistuserwise/:usercode',ToDoListController.tasklistuserwise );
router.delete('/delete/task',ToDoListController.deletes_task );

module.exports = router;