const mongoose				= require("mongoose");
const globalVariable 		= require("../../nodemon.js");
const TypeOfAssignment     = require("./typeOfAssignments_model.js");
const ObjectID          	= require('mongodb').ObjectID;

exports.insert_data = (req,res,next) => { 
	console.log("typeOfAssignment ",req.body)
	TypeOfAssignment.findOne({typeOfAssignment : req.body.typeOfAssignment})
				  .then(typeOfAssignment => {
				  		if(typeOfAssignment){
				  			res.status(200).json({
		                                        errorCode   : 1,
		                                        errorMsg    : "Type Of Assignment Already Exists",
		                                        response    :  ""
		                                    });
				  		}else{
				  			const typeOfAssignments = new TypeOfAssignment({
				  											_id 				: new mongoose.Types.ObjectId(),
				  											typeOfAssignment 	: req.body.typeOfAssignment,
				  											createdAt 			: new Date()
				  										})
				  			typeOfAssignments  .save()
				  				    .then(data =>{
				  						res.status(200).json({
						                                        errorCode   : 0,
						                                        errorMsg    : "Type Of Assignment Added",
						                                        response    :  ""
						                                    });	    	
				  				    })
				  				  	.catch(err=>{
							    		res.status(500).json({
							                        error: err.message
							                    });
							    	})
				  		}
				  })
				  .catch(err=>{
		    		res.status(500).json({
		                        error: err.message
		                    });
		    	 })
};

exports.update_data = (req,res,next) => {
	TypeOfAssignment  .updateOne(
						{ _id : ObjectID(req.body.id) },
						{
							$set : {
										typeOfAssignment : req.body.typeOfAssignment
									}
						}
					  )
		    .then(data =>{
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "Type Of Assignment Updated",
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
	TypeOfAssignment.find()
		  .then(data =>{
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "Type Of Assignment List",
	                                    response    :  data
	                                });	    	
		    })
		  	.catch(err=>{
	    		res.status(500).json({
	                        error: err.message
	                    });
	    	})
};

exports.list_TypeOfAssignmentkeyvalue = (req,res,next) => {
	TypeOfAssignment.aggregate([
							{
								$project : {
												"key" 		: "$typeOfAssignment",
												"value"		: "$_id"
											}
							}
					])
		  .then(data =>{
		  			data.unshift({"key":"Select",value:"Select"})
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "Type Of Assignment List",
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
	console.log("id ",req.body)
	TypeOfAssignment.deleteOne({ _id : ObjectID(req.body.id) })
		  .then(data =>{
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "TypeOfAssignment Detete",
	                                    response    :  ""
	                                });	    	
		    })
		  	.catch(err=>{
	    		res.status(500).json({
	                        error: err.message
	                    });
	    	})
};