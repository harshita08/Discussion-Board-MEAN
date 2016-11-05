var mongoose = require('mongoose')
var Topic = mongoose.model('Topic')
var User = mongoose.model('User')
var Post = mongoose.model('Post')
var Comment = mongoose.model('Comment');

module.exports = {

	create: function(req,res){
		var post = new Post(req.body);
		post._user = req.session.userInfo.name;
		post._topic = req.params.id;
		post.save(function(err){
			if(err){
				console.log("Error..post not saved!");
			} else{
				User.findOne({_id: req.session.userInfo.id}, function(err, user){
					if(err){
						console.log("Error.....User not found");
					} else{
					user._post.push(post);
					user.save();
					Topic.findOne({_id: req.params.id}, function(err, oneTopic){
						if(err){
							console.log("Error....Topic not found");
						}
						else{
						oneTopic._post.push(post);
						//oneTopic._post
						oneTopic.save();
						Post.find({_topic: req.params.id}, function(err, posts){
							if(err){
								console.log("Posts not found");
							} else {
								res.json(posts);
							}
						})
					}
					})
				}
				})
			}
		})
	},

	index: function(req,res){
		Post.find({_topic: req.params.id}, null, {sort: {createdAt : -1}}, 
			function(err, posts){
			if(err){
				console.log("Error....posts not found");
			} else {
				//res.json(posts);
				//console.log(posts);
				for (var i=0; i<posts.length; i++){
					Comment.find({_post: posts[i]._id}, function(err, comments){
						// console.log(posts[i]);
						// console.log("---------------");
						// console.log(comments);
					})
				}
				res.json(posts);
			}
		})
	},

	upVote: function(req,res){
		Post.findOne({_id: req.params.id}, function(err, post){
			if(err){
				res.json({status: false});
			} else{
				post.upVotes++;
				post.save(function(err){
					if(err){
						console.log("Post not saved..");
					} else{
						res.json({status: true});
					}
				})
			}
		})
	},

	downVote: function(req,res){
		Post.findOne({_id: req.params.id}, function(err, post){
			if(err){
				res.json({status: false});
			} else{
				post.downVotes++;
				post.save(function(err){
					if(err){
						console.log("Post not saved..");
					} else{
						res.json({status: true});
					}
				})
			}
		})
	},

}







