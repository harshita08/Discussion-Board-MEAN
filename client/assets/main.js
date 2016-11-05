var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {

	$routeProvider

		.when("/", {
			templateUrl: "./partials/login.html"
		})

		.when("/dashboard", {
			templateUrl: "./partials/dashboard.html"
		})

		.when("/topic/:id", {
			templateUrl: "./partials/topic.html"
		})		

		.when("/user/:id", {
			templateUrl: "./partials/user.html"
		})

		.otherwise({
			redirectTo:"/"
		});
})

//app.factory("customersFactory")