const mongoose = require('mongoose');
const Joi 	   = require('joi');
const todoListSchema = mongoose.Schema({
	_id			: mongoose.Schema.Types.ObjectId,
	createdAt	: { type : Date , default : Date.now},
	userCode 	: { type : Number },
	task 		: { type : String },
	status 		: { type : String },
});

module.exports = mongoose.model('todolists',todoListSchema);
