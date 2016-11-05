var mongoose = require('mongoose')
var User = mongoose.model('User')
//var Post = mongoose.model('Post')

module.exports = {

	login: function(req,res){
		User.findOne({name: req.body.name}, function(err, user){
			if(err){
				console.log("Error encountered..");
			} else{
				if(user){
					//req.session.userInfo = user;
					req.session['userInfo'] = {
						id: user._id,
						name: user.name
					}
					res.json({status: true, userInfo: req.session['userInfo']});
				} else{
					console.log("Inside 2nd else, user not found");
					var user = new User(req.body);
					user.save(function(err, newUser){
						if(err){
							console.log("Error....");
							res.json({status: false, errors: 'User not created'});
						} else{
							console.log("Inside 3rd else....");
							req.session['userInfo'] = {
								id: user._id,
								name: user.name
							}
							res.json({status: true, userInfo: req.session['userInfo']});
						}
					})
				}
			}
		})
	},

	findOne: function(req,res){
		//console.log("req.body = " + req.params.id);
		User.findOne({name: req.params.id}, function(err, users){
			if(err){
				console.log("User not found");
			} else{
				//console.log(users);
				res.json(users);
			}
		})
	},

	session: function(req,res){
		if(req.session['userInfo'])
			res.json({status: true, userInfo: req.session['userInfo']})
		else
			res.json({status: false, userInfo: null})
	},

	logout: function(req,res){
		req.session.destroy(function(err){
			if(err) 
				res.json({status:false, errors:err})
			else{
				res.json({status: true});
			}
		})
	},


}