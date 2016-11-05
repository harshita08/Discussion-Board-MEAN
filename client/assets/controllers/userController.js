(function(){

	angular
		.module("myApp")
		.controller("userCtrl", userController);

		userController.$inject = ['userFactory', '$location', '$route'];

		function userController(userFactory, $location, $route){
			var vm = this;
			vm.addUser = addUser;
			vm.newUser = {};
			vm.user = {};
			vm.newTopic = {};
			vm.allTopics = [];
			vm.getSession = getSession;
			vm.addTopic = addTopic;
			vm.getTopics = getTopics;
			vm.logout = logout;
			vm.errors = [];
			vm.reloadRoute = reloadRoute;
			//vm.getUserId = getUserId;

			getTopics();

			function reloadRoute(){
				$route.reload();
			}

			function getSession(){
				userFactory.getSession(function(data){
					vm.user = data.userInfo;
					if (!vm.user){
						$location.url('/');
					}
				})
			}

			function getTopics(){
				getSession();
				userFactory.getTopics(function(data){				
						vm.allTopics = data;
						for (var i=0; i<vm.allTopics.length; i++){
							var post_count = vm.allTopics[i]._post.length;
							vm.allTopics[i].post_count = post_count;
						}					
				})
			}

			function addUser(){
				userFactory.addUser(vm.newUser, function(data){
					if(data.status){
						vm.user = data.userInfo;
						$location.url('/dashboard');
					} else{
						console.log("Error...");
					}
				});
			}

			function addTopic(){
				userFactory.addTopic(vm.newTopic, function(data){
					if(data.status){
						reloadRoute();
						//$location.url('/dashboard');
					} else{
						console.log("Error");
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