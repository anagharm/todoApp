const mongoose = require('mongoose');
const Joi 	   = require('joi');
const subjectsSchema = mongoose.Schema({
	_id			: mongoose.Schema.Types.ObjectId,
	createdAt	: { type : Date , default : Date.now},
	createdBy	: { type : Number },
	subject		: { type : String , required : true , unique : true },
});

module.exports = mongoose.model('subjects',subjectsSchema);
