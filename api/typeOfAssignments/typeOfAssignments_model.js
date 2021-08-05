const mongoose = require('mongoose');
const Joi 	   = require('joi');
const typeOfAssignmentsSchema = mongoose.Schema({
	_id						: mongoose.Schema.Types.ObjectId,
	createdAt				: { type : Date , default : Date.now},
	createdBy				: { type : Number },
	typeOfAssignment		: { type : String , required : true , unique : true },
});

module.exports = mongoose.model('typeOfAssignments',typeOfAssignmentsSchema);
