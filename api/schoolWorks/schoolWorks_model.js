const mongoose = require('mongoose');
const Joi 	   = require('joi');
const schoolWorksSchema = mongoose.Schema({
	_id						: mongoose.Schema.Types.ObjectId,
	createdAt				: { type : Date , default : Date.now},
	createdBy				: { type : Number },
	userCode 				: { type : Number },
	subject					: { type : String , required : true },
	subjectId				: { type : mongoose.Schema.Types.ObjectId , ref : 'subjects' },
	typeOfAssignment		: { type : String , required : true },
	typeOfAssignmentId		: { type : mongoose.Schema.Types.ObjectId , ref : 'typeofassignments' },
	status					: { type : String , required : true },
	statusId				: { type : mongoose.Schema.Types.ObjectId , ref : 'statuses' },
	workDate 				: { type : String },
	details 				: { type : String },
	docLink 				: { type : String },
});

module.exports = mongoose.model('schoolworks',schoolWorksSchema);
