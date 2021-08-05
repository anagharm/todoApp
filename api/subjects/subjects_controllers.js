const mongoose			= require("mongoose");
const globalVariable 	= require("../../nodemon.js");
const Subject           = require("../subjects/subjects_model.js");
const ObjectID          		= require('mongodb').ObjectID;

exports.insert_data = (req,res,next) => { 
	Subject.findOne({subject : req.body.subject})
		  .then(subject => {
		  		if(subject){
		  			res.status(200).json({
                                        errorCode   : 1,
                                        errorMsg    : "Subject Already Exists",
                                        response    :  ""
                                    });
		  		}else{
		  			const subject = new Subject({
		  											_id 		: new mongoose.Types.ObjectId(),
		  											subject 	: req.body.subject,
		  											createdAt 	: new Date()
		  										})
		  			subject  .save()
		  				    .then(data =>{
		  						res.status(200).json({
				                                        errorCode   : 0,
				                                        errorMsg    : "Subject Added",
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
	Subject  .updateOne(
						{ _id : ObjectID(req.body.id) },
						{
							$set : {
										subject : req.body.subject
									}
						}
					  )
		    .then(data =>{
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "Subject Updated",
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
	Subject.find()
		  .then(data =>{
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "Subject List",
	                                    response    :  data
	                                });	    	
		    })
		  	.catch(err=>{
	    		res.status(500).json({
	                        error: err.message
	                    });
	    	})
};

exports.list_subjectkeyvalue = (req,res,next) => {
	Subject.aggregate([
							{
								$project : {
												"key" 		: "$subject",
												"value"		: "$_id"
											}
							}
					])
		  .then(data =>{
		  			data.unshift({"key":"Select",value:"Select"})
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "Subject List",
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
	Subject.deleteOne({ _id : ObjectID(req.body.id) })
		  .then(data =>{
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "Subject Detete",
	                                    response    :  ""
	                                });	    	
		    })
		  	.catch(err=>{
	    		res.status(500).json({
	                        error: err.message
	                    });
	    	})
};