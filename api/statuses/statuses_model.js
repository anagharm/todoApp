const mongoose = require('mongoose');
const Joi 	   = require('joi');
const statusSchema = mongoose.Schema({
	_id			: mongoose.Schema.Types.ObjectId,
	createdAt	: { type : Date , default : Date.now},
	createdBy	: { type : Number },
	status 		: { type : String , required : true , unique : true },
});

module.exports = mongoose.model('statuses',statusSchema);
