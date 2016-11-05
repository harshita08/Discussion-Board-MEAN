(function(){

	angular
		.module("myApp")
		.controller("userProfileCtrl", userProfileController);

		userProfileController.$inject = ['userFactory', '$routeParams', '$location'];

		function userProfileController(userFactory, $routeParams, $location){
			var vm = this;
			vm.getUserProfile = getUserProfile;
			vm.logout = logout;
			vm.errors = [];
			vm.topic_count;
			vm.post_count;
			vm.comment_count;
			vm.userName;

			if($routeParams.id){
				getUserProfile($routeParams.id);
			}

			function getUserProfile(userName){
				vm.userName = userName;
				userFactory.getUserProfile(userName, function(data){
					vm.topic_count = data._topics.length;
					vm.post_count = data._post.length;
					vm.comment_count = data._comments.length;
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