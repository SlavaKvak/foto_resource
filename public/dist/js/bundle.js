(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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


},{"./common/mvNotifier":2,"./main/mvMainCtrl":3}],2:[function(require,module,exports){
var mvNotifier = function (mvToastr) {
	return {
		notify: function (msg) {
			mvToastr.success(msg);
			console.log(msg);
		},
		error: function (msg) {
			mvToastr.error(msg);
			console.log(msg);
		}
	};
};

mvNotifier.$inject = ['mvToastr'];

module.exports = mvNotifier;
},{}],3:[function(require,module,exports){
var mvMainCtrl = function ($scope) {
	$scope.helloWord = 'Hi from Angular'
};

mvMainCtrl.$inject = ['$scope'];

module.exports = mvMainCtrl;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwL2FwcC5qcyIsInB1YmxpYy9hcHAvY29tbW9uL212Tm90aWZpZXIuanMiLCJwdWJsaWMvYXBwL21haW4vbXZNYWluQ3RybC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcclxuLy9jb250cm9sbGVyc1xyXG52YXIgbXZNYWluQ3RybCA9IHJlcXVpcmUoJy4vbWFpbi9tdk1haW5DdHJsJyk7XHJcblxyXG4vL3NlcnZpY2VzXHJcbnZhciBtdk5vdGlmaWVyID0gcmVxdWlyZSgnLi9jb21tb24vbXZOb3RpZmllcicpO1xyXG5cclxudmFyIGFwcE1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ25nUmVzb3VyY2UnLCAnbmdSb3V0ZSddKVxyXG5cdC5jb250cm9sbGVyKCdtdk1haW5DdHJsJywgbXZNYWluQ3RybClcclxuXHQudmFsdWUoJ212VG9hc3RyJywgdG9hc3RyKVxyXG5cdC5mYWN0b3J5KCdtdk5vdGlmaWVyJywgbXZOb3RpZmllcik7XHJcblxyXG5hcHBNb2R1bGUuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcclxuXHJcblx0JGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHtcclxuICBcdFx0ZW5hYmxlZDogdHJ1ZSxcclxuICBcdFx0cmVxdWlyZUJhc2U6IGZhbHNlXHJcblx0fSk7XHJcblx0JHJvdXRlUHJvdmlkZXJcclxuXHRcdC53aGVuKCcvJywge1xyXG5cdFx0XHR0ZW1wbGF0ZVVybDogJy9wYXJ0aWFscy9tYWluL21haW4nLFxyXG5cdFx0XHRjb250cm9sbGVyOiAnbXZNYWluQ3RybCdcclxuXHRcdH0pO1xyXG59KTtcclxuXHJcbmFwcE1vZHVsZS5ydW4oZnVuY3Rpb24gKCRyb290U2NvcGUsICRsb2NhdGlvbikge1xyXG5cdCRyb290U2NvcGUuJG9uKCckcm91dGVDaGFuZ2VFcnJvcicsIGZ1bmN0aW9uIChldnQsIGN1cnJlbnQsIHByZXZpb3VzLCByZWplY3Rpb24pIHtcclxuXHRcdGlmIChyZWplY3Rpb24gPT09ICdub3QgYXV0aG9yaXplZCcpIHtcclxuXHRcdFx0JGxvY2F0aW9uLnBhdGgoJy8nKTtcclxuXHRcdH1cclxuXHR9KTtcclxufSk7XHJcblxyXG4iLCJ2YXIgbXZOb3RpZmllciA9IGZ1bmN0aW9uIChtdlRvYXN0cikge1xyXG5cdHJldHVybiB7XHJcblx0XHRub3RpZnk6IGZ1bmN0aW9uIChtc2cpIHtcclxuXHRcdFx0bXZUb2FzdHIuc3VjY2Vzcyhtc2cpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhtc2cpO1xyXG5cdFx0fSxcclxuXHRcdGVycm9yOiBmdW5jdGlvbiAobXNnKSB7XHJcblx0XHRcdG12VG9hc3RyLmVycm9yKG1zZyk7XHJcblx0XHRcdGNvbnNvbGUubG9nKG1zZyk7XHJcblx0XHR9XHJcblx0fTtcclxufTtcclxuXHJcbm12Tm90aWZpZXIuJGluamVjdCA9IFsnbXZUb2FzdHInXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbXZOb3RpZmllcjsiLCJ2YXIgbXZNYWluQ3RybCA9IGZ1bmN0aW9uICgkc2NvcGUpIHtcclxuXHQkc2NvcGUuaGVsbG9Xb3JkID0gJ0hpIGZyb20gQW5ndWxhcidcclxufTtcclxuXHJcbm12TWFpbkN0cmwuJGluamVjdCA9IFsnJHNjb3BlJ107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG12TWFpbkN0cmw7Il19
