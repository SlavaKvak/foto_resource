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
var galleryDetailsCtrl = require('./galleries/galleryDetails/galleryDetailsCtrl');

//services
var mvNotifier = require('./common/mvNotifier');
var galleriesResource = require('./galleries/galleriesResource');
var assetService = require('./galleries/galleryDetails/assetService')

var appModule = angular.module('app', ['ngResource', 'ui.router', 'angular-flexslider'])
	.controller('mvMainCtrl', mvMainCtrl)
  .controller('galleriesCtrl', galleriesCtrl)
  .controller('contactCtrl', contactCtrl)
  .controller('galleryDetailsCtrl', galleryDetailsCtrl)
	.value('mvToastr', toastr)
	.factory('mvNotifier', mvNotifier)
  .factory('galleriesResource', galleriesResource)
  .factory('assetService', assetService);

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
    .state('galleries.galleryDetails', {
      url: "/{galleryId}",
      templateUrl: "/partials/galleries/galleryDetails/galleryDetails",
      controller: 'galleryDetailsCtrl'
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

