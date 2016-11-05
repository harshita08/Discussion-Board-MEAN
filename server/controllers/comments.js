var mongoose = require('mongoose')
var Topic = mongoose.model('Topic')
var User = mongoose.model('User')
var Post = mongoose.model('Post')
var Comment = mongoose.model('Comment')

module.exports = {

	create: function(req,res){
		console.log(req.body);
		var comment = new Comment(req.body);
		comment._user = req.session.userInfo.name;
		comment._post = req.params.id;
		console.log(comment);
		comment.save(function(err){
			if(err){
				console.log("Error...comment could not be saved");
			} else{
				User.findOne({_id: req.session.userInfo.id}, function(err, user){
					if(err){
						console.log("Error....user not found");
					} else{
						user._comments.push(comment);
						user.save();
						Post.findOne({_id: req.params.id}, function(err, post){
							if(err){
								console.log("Error....post not found!");
							} else{
								post._comments.push(comment);
								res.json({status: true});
							}
						})
					}
				})
			}
		})
	},

}