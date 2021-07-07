const mongoose			= require("mongoose");
const bcrypt			= require("bcrypt");
const jwt				= require("jsonwebtoken");
const globalVariable 	= require("../../nodemon.js");
const User 				= require('./users_model');
const moment            = require("moment");
const Profile           = require("../profiles/profiles_model.js");

exports.create_user = (req,res,next) => {
	User.findOne({email : req.body.emailId})
		.then(usrStatus => {
			if(usrStatus){
				res.status(200).json({
                                        errorCode   : 1,
                                        errorMsg    : "Email Id Already Exists",
                                        response    :  ""
                                    });
			}else{
				User.find()
					.sort({"userCode" : -1})
					.limit(1)
				    .then(usr => {
				    	const user = new User({
			                            _id 		: new mongoose.Types.ObjectId(),
			                            userCode 	: (usr && usr[0] && usr[0].userCode) ? usr[0].userCode + 1 : 10001,
			    						firstName 	: req.body.firstName, 
			    						lastName 	: req.body.lastName, 
			                            email       : req.body.emailId,
			                            role      	: req.body.role,
			                            verified    : true, 
			                        });
				    	console.log("user ",user)
						user.save()
							.then(user => {
								const profile = new Profile({
									_id 		: new mongoose.Types.ObjectId(),
									userCode 	: user.userCode,
									user_Id 	: user._id,
									fullName 	: req.body.firstName + " " + req.body.lastName, 
									firstName	: req.body.firstName,
									lastName 	: req.body.lastName,
									emailId		: req.body.emailId,
			                        role        : req.body.role,
								});
								profile.save()
									   .then(data => {
					    					res.status(200).json({
					                                        errorCode   : 0,
					                                        errorMsg    : "User created",
					                                        response    :  {
					                                        					"userCode" : user.userCode,
					                                        					"fullName" : data.fullName,
					                                        					"mobileNo" : data.mobNum
					                                        				}
					                                    });		
									   })
									   .catch(err=>{
								    		res.status(500).json({
								                        error: err.message
								                    });
								    	})			
							})
							.catch(err=>{
					    		return res.status(200).json({
			                                                    errorCode   : 1,
			                                                    errorMsg    : err.message,
			                                                    response    :  ""
			                                                });
					    	})			
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

exports.user_login = (req,res,next) => {
    User.findOne({email : req.body.emailId})
    .exec()
    .then(user => {
        if(user){
        	console.log("user ",user)
            var pwd = user.password;
            if(user.password === req.body.password){
               const token = jwt.sign({
                            email    : req.body.emailId,
                            userId   :  user._id ,
                            password : req.body.password,
                            date     : new Date()
                        },
                            globalVariable.JWT_KEY,
                        {
                            expiresIn: "365 days"
                        });
                        User.updateOne(
                        { 
                            email : req.body.emailId
                        },
                        {
                            $push : {
                                "loginTokens" : {
                                    when: new Date(),
                                    hashedToken : token
                                }
                            },
                            $set : {
                            	lastLogin : new Date()
                            }
                        }
                        )
                        .exec()
                        .then(updateUser=>{
                            if(updateUser.nModified == 1){
                                return res.status(200).json({
                                                                errorCode   : 0,
                                                                errorMsg    : "AUTH - SUCCESSFULLY",
                                                                response    :  {
                                                                                    token               : token,
                                                                                    userCode            : user.userCode,
                                                                                    firstName           : user.firstName,
                                                                                    lastName            : user.lastName,
                                                                                    role                : user.role
                                                                                }
                                                            });                              
                            }
                        })
                        .catch(err=>{
                            console.log("500 err ",err);
                            res.status(500).json(err.message);
                        });
            }else{
                res.status(200).json({message:"Please verify your password"});
            }
        }else{
            console.log("401 Error - User Not FounD");
            res.status(200).json({message:"User is not registered"});
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

