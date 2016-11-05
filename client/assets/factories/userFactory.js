(function(){

	angular
		.module("myApp")
		.factory("userFactory", userFactory);

		function userFactory($http){
			var factory = {
				addUser: addUser,
				getSession: getSession,
				addTopic: addTopic,
				getTopics: getTopics,
				getUserProfile: getUserProfile,
				logout: logout,
			};
			return factory;

			 function addUser(newUser, callback){
			 	$http.post('/logreg', newUser)
			 	.success(function(data){
			 		callback(data);
			 	})
			 }

			 function getUserProfile(userName, callback){
			 	$http.get('/users/' + userName)
			 	.success(function(data){
			 		callback(data);
			 	})
			 }

			 function getSession(callback){
			 	$http.get('/session')
			 	.success(function(data){
			 		callback(data);
			 	})
			 }

			 function addTopic(newTopic, callback){
			 	$http.post('/topics', newTopic)
			 	.success(function(data){
			 		callback(data);
			 	})
			 }

			 function getTopics(callback){
			 	$http.get('/topics')
			 	.success(function(data){
			 		callback(data);
			 	})
			 }

			 function logout(callback){
				$http.post('/logout')
				.success(function(returnData){
					callback(returnData);
				})
			}

		}

})();