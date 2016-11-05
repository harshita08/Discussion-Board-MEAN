var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	comment: {
		type: String,
		minlength: 2,
		maxlength: 1000,
		required: true
	},
	_user: {
		type: String
		// type: mongoose.Schema.Types.ObjectId,
		// ref: 'User'
	},
	_post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	}

}, {timestamps: true})

mongoose.model('Comment', CommentSchema);