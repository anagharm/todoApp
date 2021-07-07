const mongoose			= require("mongoose");
const globalVariable 	= require("../../nodemon.js");
const Status            = require("../statuses/statuses_model.js");
const ObjectID          		= require('mongodb').ObjectID;

exports.insert_data = (req,res,next) => { 
	Status.findOne({status : req.body.status})
		  .then(status => {
		  		if(status){
		  			res.status(200).json({
                                        errorCode   : 1,
                                        errorMsg    : "Status Already Exists",
                                        response    :  ""
                                    });
		  		}else{
		  			const status = new Status({
		  											_id 		: new mongoose.Types.ObjectId(),
		  											status 		: req.body.status,
		  											createdAt 	: new Date()
		  										})
		  			status  .save()
		  				    .then(data =>{
		  						res.status(200).json({
				                                        errorCode   : 0,
				                                        errorMsg    : "Status Added",
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
	Status  .updateOne(
						{ _id : ObjectID(req.body.id) },
						{
							$set : {
										status : req.body.status
									}
						}
					  )
		    .then(data =>{
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "Status Updated",
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
	Status.find()
		  .then(data =>{
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "Status List",
	                                    response    :  data
	                                });	    	
		    })
		  	.catch(err=>{
	    		res.status(500).json({
	                        error: err.message
	                    });
	    	})
};

exports.list_statuskeyvalue = (req,res,next) => {
	Status.aggregate([
							{
								$project : {
												"key" 		: "$status",
												"value"		: "$status"
											}
							}
					])
		  .then(data =>{
		  			data.unshift({"key":"Select",value:"Select"})
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "Status List",
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
	Status.deleteOne({ _id : ObjectID(req.body.id) })
		  .then(data =>{
					res.status(200).json({
	                                    errorCode   : 0,
	                                    errorMsg    : "Status Detete",
	                                    response    :  ""
	                                });	    	
		    })
		  	.catch(err=>{
	    		res.status(500).json({
	                        error: err.message
	                    });
	    	})
};