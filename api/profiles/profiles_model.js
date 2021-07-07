const mongoose = require('mongoose');
const Joi 	   = require('joi');
const profileSchema = mongoose.Schema({
	_id			: mongoose.Schema.Types.ObjectId,
	userCode 	: { type: Number },
	user_Id 	: String,
	fullName 	: String,
	firstName	: String,
	lastName 	: String,
	mobNum		: String,
	emailId		: String,
	dob 		: String,
	gender 		: String,
    role        : String,
    picUrl 		: String,
});

module.exports = mongoose.model('profiles',profileSchema);
