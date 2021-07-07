const mongoose = require('mongoose');
const Joi 	   = require('joi');
const userSchema = mongoose.Schema({
	_id			: mongoose.Schema.Types.ObjectId,
	createdAt	: { type : Date , default : Date.now},
	password 	: { type : String , required : true , default : function() { return Math.random().toString(16).substr(2, 8)}},
	userCode 	: { type : Number , required : true , unique : true , min : 10001 , max : 199999 },
	firstName 	: { type : String },
	lastName 	: { type : String },
	email		: { type : String , required : true , unique : true},
	verified	: { type : Boolean },
	role 		: { type : String , required : true },
	loginTokens : [
					{
						when : Date,
						hashedToken : String
					}
				],
	lastLogin	: { type : Date}
});

module.exports = mongoose.model('users',userSchema);
