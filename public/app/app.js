//libs
window['jQuery'] = require('../vendor/jquery/dist/jquery.js');
require('../vendor/flexslider/jquery.flexslider.js');
require('../vendor/bootstrap/dist/js/bootstrap.js');
require('../vendor/toastr/toastr.js');
require('../vendor/angular/angular.js');
require('../vendor/angular-resource/angular-resource.js');
require('../vendor/angular-ui-router/release/angular-ui-router.js');
require('../vendor/angular-flexslider/angular-flexslider.js');

//controllers
var mvMainCtrl = require('./main/mvMainCtrl');
var galleriesCtrl = require('./galleries/galleriesCtrl');
var contactCtrl = require('./contact/contactCtrl');
var categoryDetailsCtrl = require('./galleries/categoryDetails/categoryDetailsCtrl');

//services
var mvNotifier = require('./common/mvNotifier');
var galleriesResource = require('./galleries/galleriesResource');

var appModule = angular.module('app', ['ngResource', 'ui.router', 'angular-flexslider'])
	.controller('mvMainCtrl', mvMainCtrl)
  .controller('galleriesCtrl', galleriesCtrl)
  .controller('contactCtrl', contactCtrl)
  .controller('categoryDetailsCtrl', categoryDetailsCtrl)
	.value('mvToastr', toastr)
	.factory('mvNotifier', mvNotifier)
  .factory('galleriesResource', galleriesResource);

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
      controller: 'mvMainCtrl'
    })
    .state('galleries', {
      abstract: true,
      url: "/galleries",
      template: "<ui-view/>"
    })
    .state('galleries.list', {
      url: "/",
      templateUrl: "/partials/galleries/galleries",
      controller: 'galleriesCtrl'
    })
    .state('galleries.categoryDetails', {
      url: "/category/{categoryId}",
      templateUrl: "/partials/galleries/categoryDetails/categoryDetails",
      controller: 'categoryDetailsCtrl'
    })
    .state('contact', {
      url: "/contact",
      templateUrl: "/partials/contact/contact",
      controller: 'contactCtrl'
    });
}]);

appModule.run(function ($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
		if (rejection === 'not authorized') {
			$location.path('/');
		}
	});
});

