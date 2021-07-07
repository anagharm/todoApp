const mongoose				= require("mongoose");
const globalVariable 		= require("../../nodemon.js");
const ToDoList            	= require("../todoLists/todoLists_model.js");
const ObjectID          	= require('mongodb').ObjectID;

exports.insert_data = (req,res,next) => { 
	const toDoList = new ToDoList({
									_id 		: new mongoose.Types.ObjectId(),
									userCode 	: req.body.userCode,
									task 		: req.body.task,
									status 		: req.body.status,
									createdAt 	: new Date()
								});
	toDoList    .save()
			    .then(data =>{
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "Task Added",
	                                    response    :  ""
	                                });	    	
			    })
			  	.catch(err=>{
	    			res.status(500).json({
	                        error: err.message
	                    });
	    		})
};

exports.update_data = (req,res,next) => {
	ToDoList.updateOne(
						{ _id : ObjectID(req.body.id) },
						{
							$set : {
										task 		: req.body.task,
										status 		: req.body.status
									}
						}
					  )
		    .then(data =>{
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "ToDo List Updated",
	                                    response    :  ""
	                                });	    	
		    })
		  	.catch(err=>{
	    		res.status(500).json({
	                        error: err.message
	                    });
	    	})
};

exports.update_status = (req,res,next) => {
	ToDoList.updateOne(
						{ _id : ObjectID(req.body.id) },
						{
							$set : {
										status 		: req.body.status,
									}
						}
					  )
		    .then(data =>{
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "ToDo List Updated",
	                                    response    :  ""
	                                });	    	
		    })
		  	.catch(err=>{
	    		res.status(500).json({
	                        error: err.message
	                    });
	    	})
};

exports.list = (req,res,next) => {
	ToDoList.find()
		  	.then(data =>{
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "To Do List",
	                                    response    :  data
	                                });	    	
		    })
		  	.catch(err=>{
	    		res.status(500).json({
	                        error: err.message
	                    });
	    	})
};

exports.tasklistuserwise = (req,res,next) => {
	console.log("tasklistuserwise ",req.params.usercode)
	ToDoList.find({userCode : parseInt(req.params.usercode)})
		  	.then(data =>{
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "To Do List",
	                                    response    :  data
	                                });	    	
		    })
		  	.catch(err=>{
	    		res.status(500).json({
	                        error: err.message
	                    });
	    	})
};

exports.deletes_task = (req,res,next) => {
	ToDoList.deleteOne({ _id : ObjectID(req.body.id) })
		  .then(data =>{
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "To Do List Detete",
	                                    response    :  ""
	                                });	    	
		    })
		  	.catch(err=>{
	    		res.status(500).json({
	                        error: err.message
	                    });
	    	})
};