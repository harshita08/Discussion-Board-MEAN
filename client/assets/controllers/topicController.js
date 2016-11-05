(function(){

	angular
		.module("myApp")
		.controller("topicCtrl", topicController);

		topicController.$inject = ['userFactory','topicFactory', '$location', '$routeParams', '$route'];

		function topicController(userFactory, topicFactory, $location, $routeParams, $route){
			var vm = this;
			vm.user = [];
			vm.oneTopic = {};
			vm.newPost = {};
			vm.allPosts = [];
			vm.newComment = {};
			vm.getTopic = getTopic;
			vm.addPost = addPost;
			vm.getSession = getSession;
			vm.addComment = addComment;
			vm.logout = logout;
			vm.errors = [];
			vm.reloadRoute = reloadRoute;
			vm.upVote = upVote;
			vm.downVote = downVote;


			if($routeParams.id){
				getSession();
				getTopic($routeParams.id);
			}

			function getTopic(index){
				topicFactory.getTopic(index, function(data){
					vm.oneTopic = data;
					topicFactory.getPosts(vm.oneTopic._id, function(data){
						vm.allPosts = data;				
					});
				})
			}

			function reloadRoute(){
				$route.reload();
			}

			function addPost(index){
				topicFactory.addPost(index, vm.newPost, function(data){
					vm.allPosts = data;
					reloadRoute();
				})
			}

			function addComment(index){
				//console.log(vm.newComment);
				var key = Object.keys(vm.newComment)[0];
				//console.log(vm.newComment[key]);
				
				topicFactory.addComment(index, vm.newComment, function(data){
					if(data.status){
						console.log("Success...comment added");
						reloadRoute();
					} else{
						console.log("Comment not added");
					}
				})
			}

			function upVote(index){
				topicFactory.upVote(index, function(data){
					if(data.status){
						reloadRoute();
					}
				})
			}

			function downVote(index){
				topicFactory.downVote(index, function(data){
					if(data.status){
						reloadRoute();
					}
				})
			}

			function getSession(){
				userFactory.getSession(function(data){
					vm.user = data.userInfo;
					if (!vm.user){
						$location.url('/');
					}
				})
			}

			function logout(){
				userFactory.logout(function(data){
					if(data.status){
						$location.url('/');
					} else {
						vm.errors = data.errors;
					}
				})
			}

		}


})();