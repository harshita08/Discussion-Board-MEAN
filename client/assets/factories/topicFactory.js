(function(){

	angular
		.module("myApp")
		.factory("topicFactory", topicFactory);

		function topicFactory($http){
			var factory = {
				getTopic: getTopic,
				addPost: addPost,
				getPosts: getPosts,
				addComment: addComment,
				upVote: upVote,
				downVote: downVote,
			}
			return factory;

			function getTopic(index, callback){
				$http.get('/topics/' + index)
				.success(function(data){
					callback(data);
				})
			}

			function addPost(index, newPost, callback){
				$http.post('/posts/' + index, newPost)
				.success(function(data){
					callback(data);
				})
			}

			function upVote(index, callback){
				$http.post('/upPost/' + index)
				.success(function(data){
					callback(data);
				})
			}

			function downVote(index, callback){
				$http.post('/downPost/' + index)
				.success(function(data){
					callback(data);
				})
			}

			function addComment(index, newComment, callback){
				$http.post('/comments/' + index, newComment)
				.success(function(data){
					callback(data);
				})
			}

			function getPosts(index, callback){
				$http.get('/posts/' + index)
				.success(function(data){
					callback(data);
				})
			}

		}
})();
