var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: {
		type: String, 
		required: true, 
		minlength: 2, 
		maxlength: 256
	},
	_topics: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Topic'
		}
	],
	_post: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post'
		}
	],
	_comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	],
})

mongoose.model('User', UserSchema);