//libs
window['jQuery'] = require('../vendor/jquery/dist/jquery.js');
require('../vendor/bootstrap/dist/js/bootstrap.js');
require('../vendor/toastr/toastr.js');
require('../vendor/angular/angular.js');
require('../vendor/angular-resource/angular-resource.js');
require('../vendor/angular-ui-router/release/angular-ui-router.js');

//controllers
var mvMainCtrl = require('./main/mvMainCtrl');

//services
var mvNotifier = require('./common/mvNotifier');

var appModule = angular.module('app', ['ngResource', 'ui.router'])
	.controller('mvMainCtrl', mvMainCtrl)
	.value('mvToastr', toastr)
	.factory('mvNotifier', mvNotifier);

appModule.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

	$locationProvider.html5Mode({
  		enabled: true,
  		requireBase: false
	});

	//$urlRouterProvider.otherwise("/");
	$stateProvider
    .state('main', {
      url: "/",
      templateUrl: "/partials/main/main",
      controller: mvMainCtrl
    });
}]);

appModule.run(function ($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
		if (rejection === 'not authorized') {
			$location.path('/');
		}
	});
});

