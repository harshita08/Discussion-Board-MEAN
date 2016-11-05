var mongoose = require('mongoose');
var users = require('../controllers/users.js');
var topics = require('../controllers/topics.js');
var posts = require('../controllers/posts.js');
var comments = require('../controllers/comments.js');

module.exports = function(app){

	app.post('/logreg', function(req,res){
		users.login(req,res);
	})

	app.get('/session', function(req,res){
		users.session(req,res);
	})

	app.get('/users/:id', function(req,res){
		users.findOne(req,res);
	})

	app.post('/logout', function(req,res){
		users.logout(req,res);
	})

	app.post('/topics', function(req,res){
		topics.create(req,res);
	})

	app.get('/topics', function(req,res){
		topics.index(req,res);
	})

	app.get('/topics/:id', function(req,res){
		topics.findOne(req,res);
	})

	app.post('/posts/:id', function(req,res){
		posts.create(req,res);
	})

	app.get('/posts/:id', function(req,res){
		posts.index(req,res);
	})

	app.post('/upPost/:id', function(req,res){
		posts.upVote(req,res);
	})

	app.post('/downPost/:id', function(req,res){
		posts.downVote(req,res);
	})

	app.post('/comments/:id', function(req,res){
		comments.create(req,res);
	})


}