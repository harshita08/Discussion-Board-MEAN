var mongoose = require('mongoose')
var Topic = mongoose.model('Topic')
var User = mongoose.model('User')

module.exports = {

	create: function(req,res){
		var topic = new Topic(req.body);
		// topic._user = req.session.userInfo.id;
		topic._user = req.session.userInfo.name;
		topic.save(function(err){
			if(err){
				console.log("1st error");
				res.json({status: false});
			} else {
				User.findOne({_id: req.session.userInfo.id}, function(err, user){
					if(err){
						console.log("2nd error");
						res.json({status: false});
					} else{
						user._topics.push(topic);
						user.save();
						console.log("Success!!!!!!!!");
						res.json({status: true});	
					}
				})
			}
		})
	},

	index: function(req,res){
		Topic.find({}, null, {sort: {createdAt : -1}}, function(err, topics){
			if(err){
				res.json(err);
			} else{
				// var current_topic;
				
				// for(var i=0; i<topics.length; i++){
				// 	console.log("--------------------");
				// 	console.log(topics[i]);
				// 	current_topic = topics[i];		
				// 	User.findOne({_id: topics[i]._user}, function(err, userName){
				// 		var key = "user_name";
				// 		var value = userName.name;
				// 		current_topic[key] = value;
				// 		//current_topic["user_name"] = "userName.name";
				// 		console.log(userName.name);
				// 		console.log(current_topic);
				// 	})
				// }
				res.json(topics);
			}
		})
	},

	findOne: function(req,res){
		Topic.findOne({_id: req.params.id}, function(err, oneTopic){
			if(err){
				console.log("Error encountered");
				res.json(err);
			} else{
				res.json(oneTopic);
			}
		})
	}



}

















