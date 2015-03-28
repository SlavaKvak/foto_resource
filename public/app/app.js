
//controllers
var mvMainCtrl = require('./main/mvMainCtrl');

//services
var mvNotifier = require('./common/mvNotifier');

var appModule = angular.module('app', ['ngResource', 'ngRoute'])
	.controller('mvMainCtrl', mvMainCtrl)
	.value('mvToastr', toastr)
	.factory('mvNotifier', mvNotifier);

appModule.config(function ($routeProvider, $locationProvider) {

	$locationProvider.html5Mode({
  		enabled: true,
  		requireBase: false
	});
	$routeProvider
		.when('/', {
			templateUrl: '/partials/main/main',
			controller: 'mvMainCtrl'
		});
});

appModule.run(function ($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
		if (rejection === 'not authorized') {
			$location.path('/');
		}
	});
});

