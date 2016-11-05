var mongoose = require('mongoose');

var TopicSchema = new mongoose.Schema({
	topic: {
		type: String,
		minlength: 2,
		maxlength: 1000,
		required: true
	},
	description: {
		type: String,
		minlength: 2,
		maxlength: 1000,
		required: true
	},
	category: {
		type: String,
	},
	_user: {
		type: String,
	},
	_post: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post'
		}
	]

}, {timestamps: true})

mongoose.model('Topic', TopicSchema);