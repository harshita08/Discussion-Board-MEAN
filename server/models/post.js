var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	post: {
		type: String,
		minlength: 2,
		maxlength: 1000,
		required: true
	},
	upVotes: {
		type: Number,
		default: 0
	},
	downVotes: {
		type: Number,
		default: 0
	},
	_user: {
		type: String
	},
	_topic: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Topic'
	},
	_comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]

}, {timestamps: true})

mongoose.model('Post', PostSchema);
