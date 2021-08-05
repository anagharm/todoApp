const mongoose			= require("mongoose");
const globalVariable 	= require("../../nodemon.js");
const SchoolWork        = require("./schoolWorks_model.js");
const ObjectID          = require('mongodb').ObjectID;

exports.insert_data = (req,res,next) => { 
	const schoolWork = new SchoolWork({
									_id 					: new mongoose.Types.ObjectId(),
									createdAt 				: new Date(),
									subject					: req.body.subject,
									subjectId				: req.body.subjectId,
									typeOfAssignment		: req.body.typeOfAssignment,
									typeOfAssignmentId		: req.body.typeOfAssignmentId,
									status					: req.body.status,
									statusId				: req.body.statusId,
									workDate 				: req.body.workDate,
									userCode 				: req.body.userCode,
								})
	schoolWork  .save()
			    .then(data =>{
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "School Work Added",
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
	SchoolWork  .updateOne(
						{ _id : ObjectID(req.body.id) },
						{
							$set : {
										subject					: req.body.subject,
										subjectId				: req.body.subjectId,
										typeOfAssignment		: req.body.typeOfAssignment,
										typeOfAssignmentId		: req.body.typeOfAssignmentId,
										status					: req.body.status,
										statusId				: req.body.statusId,
										workDate 				: req.body.workDate,
										details 				: req.body.details,
										docLink 				: req.body.docLink
									}
						}
					  )
		    .then(data =>{
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "School Work Updated",
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
	SchoolWork.find()
		  .then(data =>{
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "School Work List",
	                                    response    :  data
	                                });	    	
		    })
		  	.catch(err=>{
	    		res.status(500).json({
	                        error: err.message
	                    });
	    	})
};

exports.listUserWise = (req,res,next) => {
	SchoolWork.find({userCode : parseInt(req.params.usercode)})
			  .then(data =>{
						res.status(200).json({
		                                    errorCode   : 0,
		                                    errorMsg    : "School Work List",
		                                    response    :  data
		                                });	    	
			    })
			  	.catch(err=>{
		    		res.status(500).json({
		                        error: err.message
		                    });
		    	})
};

exports.delete_data = (req,res,next) => {
	SchoolWork.deleteOne({ _id : ObjectID(req.body.id) })
		  .then(data =>{
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "School Work Detete",
	                                    response    :  ""
	                                });	    	
		    })
		  	.catch(err=>{
	    		res.status(500).json({
	                        error: err.message
	                    });
	    	})
};