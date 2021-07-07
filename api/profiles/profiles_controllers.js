const mongoose			= require("mongoose");
const globalVariable 	= require("../../nodemon.js");
const Profile           = require("../profiles/profiles_model.js");

exports.list_user = (req,res,next) => {
	Profile.find()
		.then(users => {
			if(users.length <= 0){
				res.status(200).json({
                                        errorCode   : 1,
                                        errorMsg    : "User Not Found",
                                        response    :  ""
                                    });
			}else{
				res.status(200).json({
                                        errorCode   : 0,
                                        errorMsg    : "List of Users",
                                        response    : users
                                    });
			}
		})
		.catch(err=>{
    		res.status(500).json({
                        error: err.message
                    });
    	})
    
};

exports.view_user = (req,res,next) => {
	console.log("usercode string ",parseInt(req.params.usercode))
	Profile.findOne({userCode: parseInt(req.params.usercode)})
		   .then(user => {
				if(!user){
					res.status(200).json({
	                                        errorCode   : 1,
	                                        errorMsg    : "User Not Found",
	                                        response    :  ""
	                                    });
				}else{
					res.status(200).json({
	                                        errorCode   : 0,
	                                        errorMsg    : "List of Users",
	                                        response    : user
	                                    });
				}
			})
			.catch(err=>{
				console.log("err ",err.message)
	    		res.status(500).json({
	                        error: err.message
	                    });
	    	})		
}
