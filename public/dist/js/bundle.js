(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

//controllers
var mvMainCtrl = require('./main/mvMainCtrl');
var mvCourseListCtrl = require('./courses/mvCourseListCtrl');
var mvCourseDetailCtrl = require('./courses/mvCourseDetailCtrl');
var mvUserListCtrl = require('./admin/mvUserListCtrl');
var mvSignupCtrl = require('./account/mvSignupCtrl');
var mvProfileCtrl = require('./account/mvProfileCtrl');
var mvNavBarLoginCtrl = require('./account/mvNavBarLoginCtrl');

//services
var mvCourse = require('./courses/mvCourse');
var mvCashedCourses = require('./courses/mvCashedCourses');
var mvNotifier = require('./common/mvNotifier');
var mvUser = require('./account/mvUser');
var mvIdentity = require('./account/mvIdentity');
var mvAuth = require('./account/mvAuth');

var appModule = angular.module('app', ['ngResource', 'ngRoute'])
	.controller('mvMainCtrl', mvMainCtrl)
	.controller('mvCourseListCtrl', mvCourseListCtrl)
	.controller('mvCourseDetailCtrl', mvCourseDetailCtrl)
	.controller('mvUserListCtrl', mvUserListCtrl)
	.controller('mvSignupCtrl', mvSignupCtrl)
	.controller('mvProfileCtrl', mvProfileCtrl)
	.controller('mvNavBarLoginCtrl', mvNavBarLoginCtrl)
	.factory('mvCourse', mvCourse)
	.factory('mvCashedCourses', mvCashedCourses)
	.value('mvToastr', toastr)
	.factory('mvNotifier', mvNotifier)
	.factory('mvUser', mvUser)
	.factory('mvIdentity', mvIdentity)
	.factory('mvAuth', mvAuth);

appModule.config(function ($routeProvider, $locationProvider) {
	var routeRoleChecks = {
		admin: {auth: function (mvAuth) {
			return mvAuth.authorizeCurrentUserForRoute('admin');
		}},
		user: {auth: function (mvAuth) {
			return mvAuth.authorizeAuthenticatedUserForRoute();
		}}
	};

	$locationProvider.html5Mode({
  		enabled: true,
  		requireBase: false
	});
	$routeProvider
		.when('/', {
			templateUrl: '/partials/main/main',
			controller: 'mvMainCtrl'
		});
		// .when('/admin/users', {
		// 	templateUrl: '/partials/admin/user-list',
		// 	controller: 'mvUserListCtrl',
		// 	resolve: routeRoleChecks.admin
		// })
		// .when('/signup', {
		// 	templateUrl: '/partials/account/signup',
		// 	controller: 'mvSignupCtrl'
		// })
		// .when('/profile', {
		// 	templateUrl: '/partials/account/profile',
		// 	controller: 'mvProfileCtrl',
		// 	resolve: routeRoleChecks.user
		// })
		// .when('/courses', {
		// 	templateUrl: '/partials/courses/course-list',
		// 	controller: 'mvCourseListCtrl'
		// })
		// .when('/courses/:id', {
		// 	templateUrl: '/partials/courses/course-details',
		// 	controller: 'mvCourseDetailCtrl'
		// });
});

appModule.run(function ($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
		if (rejection === 'not authorized') {
			$location.path('/');
		}
	});
});


},{"./account/mvAuth":2,"./account/mvIdentity":3,"./account/mvNavBarLoginCtrl":4,"./account/mvProfileCtrl":5,"./account/mvSignupCtrl":6,"./account/mvUser":7,"./admin/mvUserListCtrl":8,"./common/mvNotifier":9,"./courses/mvCashedCourses":10,"./courses/mvCourse":11,"./courses/mvCourseDetailCtrl":12,"./courses/mvCourseListCtrl":13,"./main/mvMainCtrl":14}],2:[function(require,module,exports){
/*angular.module('app').factory('mvAuth', function($http, $q, mvIdentity, mvUser){
	return {
		authenticateUser: function(username, password){
			var dfd = $q.defer();
			$http.post('/login', {username: username, password: password}).then(function (response) {
				if(response.data.success){
					var user = new mvUser();
					angular.extend(user, response.data.user);
					mvIdentity.currentUser = user;
					dfd.resolve(true);
				} else{
					dfd.resolve(false);
				}
			});

			return dfd.promise;
		},
		createUser: function (newUserData) {
			var newUser = new mvUser(newUserData);
			var dfd = $q.defer();

			newUser.$save().then(function () {
				mvIdentity.currentUser = newUser;
				dfd.resolve();
			}, function (response) {
				dfd.reject(response.data.reason);
			});	

			return dfd.promise;
		},
		updateCurrentUser: function (newUserData) {
			var dfd = $q.defer();
			var clone = angular.copy(mvIdentity.currentUser);
			angular.extend(clone, newUserData);
			clone.$update().then(function () {
				mvIdentity.currentUser = clone;
				dfd.resolve();
			}, function (response) {
				dfd.reject(response.data.reason);
			});

			return dfd.promise;
		},
		logoutUser: function(){
			var dfd = $q.defer();
			$http.post('/logout', {logout: true}).then(function () {
				mvIdentity.currentUser = undefined;
				dfd.resolve();
			});

			return dfd.promise;	
		},
		authorizeCurrentUserForRoute: function (role) {
			if (mvIdentity.isAuthorized(role)) {
				return true;
			} else{
				return $q.reject('not authorized');
			}
		},
		authorizeAuthenticatedUserForRoute: function () {
			if (mvIdentity.isAuthenticated()) {
				return true;
			} else{
				return $q.reject('not authorized');
			}
		}
	};
});*/

var mvAuth = function ($http, $q, mvIdentity, mvUser) {
	return {
		authenticateUser: function(username, password){
			var dfd = $q.defer();
			$http.post('/login', {username: username, password: password}).then(function (response) {
				if(response.data.success){
					var user = new mvUser();
					angular.extend(user, response.data.user);
					mvIdentity.currentUser = user;
					dfd.resolve(true);
				} else{
					dfd.resolve(false);
				}
			});

			return dfd.promise;
		},
		createUser: function (newUserData) {
			var newUser = new mvUser(newUserData);
			var dfd = $q.defer();

			newUser.$save().then(function () {
				mvIdentity.currentUser = newUser;
				dfd.resolve();
			}, function (response) {
				dfd.reject(response.data.reason);
			});	

			return dfd.promise;
		},
		updateCurrentUser: function (newUserData) {
			var dfd = $q.defer();
			var clone = angular.copy(mvIdentity.currentUser);
			angular.extend(clone, newUserData);
			clone.$update().then(function () {
				mvIdentity.currentUser = clone;
				dfd.resolve();
			}, function (response) {
				dfd.reject(response.data.reason);
			});

			return dfd.promise;
		},
		logoutUser: function(){
			var dfd = $q.defer();
			$http.post('/logout', {logout: true}).then(function () {
				mvIdentity.currentUser = undefined;
				dfd.resolve();
			});

			return dfd.promise;	
		},
		authorizeCurrentUserForRoute: function (role) {
			if (mvIdentity.isAuthorized(role)) {
				return true;
			} else{
				return $q.reject('not authorized');
			}
		},
		authorizeAuthenticatedUserForRoute: function () {
			if (mvIdentity.isAuthenticated()) {
				return true;
			} else{
				return $q.reject('not authorized');
			}
		}
	};
};

mvAuth.$inject = ['$http', '$q', 'mvIdentity', 'mvUser'];

module.exports = mvAuth;
},{}],3:[function(require,module,exports){
/*angular.module('app').factory('mvIdentity', function ($window, mvUser) {
	var currentUser;
	if (!!$window.bootstrappedUserObject){
		currentUser = new mvUser();
		angular.extend(currentUser, $window.bootstrappedUserObject);
	}
	return {
		currentUser: currentUser,
		isAuthenticated: function () {
			return !!this.currentUser;
		},
		isAuthorized: function (role) {
			return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
		}
	};
});*/

var mvIdentity = function ($window, mvUser) {
	var currentUser;
	if (!!$window.bootstrappedUserObject){
		currentUser = new mvUser();
		angular.extend(currentUser, $window.bootstrappedUserObject);
	}
	return {
		currentUser: currentUser,
		isAuthenticated: function () {
			return !!this.currentUser;
		},
		isAuthorized: function (role) {
			return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
		}
	};
};

mvIdentity.$inject = ['$window', 'mvUser'];

module.exports = mvIdentity;
},{}],4:[function(require,module,exports){
/*angular.module('app').controller('mvNavBarLoginCtrl', function ($scope, $http, $location, mvIdentity, mvNotifier, mvAuth) {
	$scope.identity = mvIdentity;
	$scope.signin = function(username, password) {
		mvAuth.authenticateUser(username, password).then(function(success){
			if(success){
				mvNotifier.notify('You have Successfuly signed in!');
			} else{
				mvNotifier.notify('Username/Password combination incorrect');
			}
		});
	};

	$scope.signout = function(){
		mvAuth.logoutUser().then(function(){
			$scope.username = '';
			$scope.password = '';
			mvNotifier.notify('You have successfully signed out!');
			$location.path('/');	
		});	
	};
});*/

var mvNavBarLoginCtrl = function ($scope, $http, $location, mvIdentity, mvNotifier, mvAuth) {
	$scope.identity = mvIdentity;
	$scope.signin = function(username, password) {
		mvAuth.authenticateUser(username, password).then(function(success){
			if(success){
				mvNotifier.notify('You have Successfuly signed in!');
			} else{
				mvNotifier.notify('Username/Password combination incorrect');
			}
		});
	};

	$scope.signout = function(){
		mvAuth.logoutUser().then(function(){
			$scope.username = '';
			$scope.password = '';
			mvNotifier.notify('You have successfully signed out!');
			$location.path('/');	
		});	
	};
};

mvNavBarLoginCtrl.$inject = ['$scope', '$http', '$location', 'mvIdentity', 'mvNotifier', 'mvAuth'];

module.exports = mvNavBarLoginCtrl;
},{}],5:[function(require,module,exports){
/*angular.module('app').controller('mvProfileCtrl', function ($scope, mvAuth, mvIdentity, mvNotifier) {
	$scope.email = mvIdentity.currentUser.username;
	$scope.fname = mvIdentity.currentUser.firstName;
	$scope.lname = mvIdentity.currentUser.lastName;

	$scope.update = function () {
		var newUserData = {
			username: $scope.email,
			firstName: $scope.fname,
			lastName: $scope.lname
		};

		if($scope.password && $scope.password.length > 0){
			newUserData.password = $scope.password;
		}

		mvAuth.updateCurrentUser(newUserData).then(function () {
			mvNotifier.notify('Your user account has been update');
		}, function (reason) {
			mvNotifier.error(reason);
		});
	};
});*/

var mvProfileCtrl = function ($scope, mvAuth, mvIdentity, mvNotifier) {
	$scope.email = mvIdentity.currentUser.username;
	$scope.fname = mvIdentity.currentUser.firstName;
	$scope.lname = mvIdentity.currentUser.lastName;

	$scope.update = function () {
		var newUserData = {
			username: $scope.email,
			firstName: $scope.fname,
			lastName: $scope.lname
		};

		if($scope.password && $scope.password.length > 0){
			newUserData.password = $scope.password;
		}

		mvAuth.updateCurrentUser(newUserData).then(function () {
			mvNotifier.notify('Your user account has been update');
		}, function (reason) {
			mvNotifier.error(reason);
		});
	};	
};

mvProfileCtrl.$inject = ['$scope', 'mvAuth', 'mvIdentity', 'mvNotifier'];

module.exports = mvProfileCtrl;
},{}],6:[function(require,module,exports){
/*angular.module('app').controller('mvSignupCtrl', function ($scope, $location, mvAuth, mvNotifier) {
	
	$scope.signup = function(){
		var newUserData = {
			username: $scope.email,
			password: $scope.password,
			firstName: $scope.fname,
			lastName: $scope.lname
		};	

		mvAuth.createUser(newUserData).then(function () {
			mvNotifier.notify('User account created!');
			$location.path('/');
		}, function (reason) {
			mvNotifier.error(reason);
		});
	}
});*/

var mvSignupCtrl = function ($scope, $location, mvAuth, mvNotifier) {
	$scope.signup = function() {
		var newUserData = {
			username: $scope.email,
			password: $scope.password,
			firstName: $scope.fname,
			lastName: $scope.lname
		};	

		mvAuth.createUser(newUserData).then(function () {
			mvNotifier.notify('User account created!');
			$location.path('/');
		}, function (reason) {
			mvNotifier.error(reason);
		});
	}
};

mvSignupCtrl.$inject = ['$scope', '$location', 'mvAuth', 'mvNotifier'];

module.exports = mvSignupCtrl;
},{}],7:[function(require,module,exports){
/*angular.module('app').factory('mvUser', function ($resource) {
	var UserResource = $resource('/api/users/:id', {id: '@id'}, {
		update: {method: 'PUT', isArray:false}
	});

	UserResource.prototype.isAdmin = function() {
		return this.roles && this.roles.indexOf('admin') > -1;
	};

	return UserResource;
})*/

var mvUser = function ($resource) {
	var UserResource = $resource('/api/users/:id', {id: '@id'}, {
		update: {method: 'PUT', isArray:false}
	});

	UserResource.prototype.isAdmin = function() {
		return this.roles && this.roles.indexOf('admin') > -1;
	};

	return UserResource;
};

mvUser.$inject = ['$resource'];

module.exports = mvUser;
},{}],8:[function(require,module,exports){
/*angular.module('app').controller('mvUserListCtrl', function ($scope, mvUser) {
	$scope.users = mvUser.query();
});*/

var mvUserListCtrl = function ($scope, mvUser) {
	$scope.users = mvUser.query();
};

mvUserListCtrl.$inject = ['$scope', 'mvUser'];

module.exports = mvUserListCtrl;
},{}],9:[function(require,module,exports){
/*angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('mvNotifier', function (mvToastr) {
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
});*/

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
},{}],10:[function(require,module,exports){
/*angular.module('app').factory('mvCashedCourses', function (mvCourse) {
	var courseList;

	return{
		query: function () {
			if (!courseList) {
				courseList = mvCourse.query();
			};

			return courseList;
		}
	}
});*/

var mvCashedCourses = function (mvCourse) {
	var courseList;

	return{
		query: function () {
			if (!courseList) {
				courseList = mvCourse.query();
			};

			return courseList;
		}
	}
};

mvCashedCourses.$inject = ['mvCourse'];

module.exports = mvCashedCourses;
},{}],11:[function(require,module,exports){
/*angular.module('app').factory('mvCourse', function ($resource) {
	var CourseResource = $resource('/api/courses/:_id', {_id: "@id"}, {
		update: {method:'PUT', isArray:false}
	});

	return CourseResource;
});*/

var mvCourse = function ($resource) {
	var CourseResource = $resource('/api/courses/:_id', {_id: "@id"}, {
		update: {method:'PUT', isArray:false}
	});

	return CourseResource;
};

mvCourse.$inject = ['$resource'];

module.exports = mvCourse;
},{}],12:[function(require,module,exports){
/*angular.module('app').controller('mvCourseDetailCtrl', function ($scope, $routeParams, mvCourse) {
	$scope.course = mvCourse.get({_id:$routeParams.id});
});*/

var mvCourseDetailCtrl = function ($scope, $routeParams, mvCourse) {
	$scope.course = mvCourse.get({_id:$routeParams.id});
};

mvCourseDetailCtrl.$inject = ['$scope', '$routeParams', 'mvCourse'];

module.exports = mvCourseDetailCtrl;
},{}],13:[function(require,module,exports){
var mvCourseListCtrl = function ($scope, mvCashedCourses) {
	$scope.courses = mvCashedCourses.query();

	$scope.sortOptions = [{value:"title", text:"Sort by Title"},
			{value: "published", text:"Sort by Publish Date"}];

	$scope.sortOrder = $scope.sortOptions[0].value;
};

mvCourseListCtrl.$inject = ['$scope', 'mvCashedCourses'];

module.exports = mvCourseListCtrl;
},{}],14:[function(require,module,exports){
var mvMainCtrl = function ($scope, mvCashedCourses) {
	$scope.helloWord = 'Hi from Angular'
	//$scope.courses = mvCashedCourses.query();
};

mvMainCtrl.$inject = ['$scope', 'mvCashedCourses'];

module.exports = mvMainCtrl;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwL2FwcC5qcyIsInB1YmxpYy9hcHAvYWNjb3VudC9tdkF1dGguanMiLCJwdWJsaWMvYXBwL2FjY291bnQvbXZJZGVudGl0eS5qcyIsInB1YmxpYy9hcHAvYWNjb3VudC9tdk5hdkJhckxvZ2luQ3RybC5qcyIsInB1YmxpYy9hcHAvYWNjb3VudC9tdlByb2ZpbGVDdHJsLmpzIiwicHVibGljL2FwcC9hY2NvdW50L212U2lnbnVwQ3RybC5qcyIsInB1YmxpYy9hcHAvYWNjb3VudC9tdlVzZXIuanMiLCJwdWJsaWMvYXBwL2FkbWluL212VXNlckxpc3RDdHJsLmpzIiwicHVibGljL2FwcC9jb21tb24vbXZOb3RpZmllci5qcyIsInB1YmxpYy9hcHAvY291cnNlcy9tdkNhc2hlZENvdXJzZXMuanMiLCJwdWJsaWMvYXBwL2NvdXJzZXMvbXZDb3Vyc2UuanMiLCJwdWJsaWMvYXBwL2NvdXJzZXMvbXZDb3Vyc2VEZXRhaWxDdHJsLmpzIiwicHVibGljL2FwcC9jb3Vyc2VzL212Q291cnNlTGlzdEN0cmwuanMiLCJwdWJsaWMvYXBwL21haW4vbXZNYWluQ3RybC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxyXG4vL2NvbnRyb2xsZXJzXHJcbnZhciBtdk1haW5DdHJsID0gcmVxdWlyZSgnLi9tYWluL212TWFpbkN0cmwnKTtcclxudmFyIG12Q291cnNlTGlzdEN0cmwgPSByZXF1aXJlKCcuL2NvdXJzZXMvbXZDb3Vyc2VMaXN0Q3RybCcpO1xyXG52YXIgbXZDb3Vyc2VEZXRhaWxDdHJsID0gcmVxdWlyZSgnLi9jb3Vyc2VzL212Q291cnNlRGV0YWlsQ3RybCcpO1xyXG52YXIgbXZVc2VyTGlzdEN0cmwgPSByZXF1aXJlKCcuL2FkbWluL212VXNlckxpc3RDdHJsJyk7XHJcbnZhciBtdlNpZ251cEN0cmwgPSByZXF1aXJlKCcuL2FjY291bnQvbXZTaWdudXBDdHJsJyk7XHJcbnZhciBtdlByb2ZpbGVDdHJsID0gcmVxdWlyZSgnLi9hY2NvdW50L212UHJvZmlsZUN0cmwnKTtcclxudmFyIG12TmF2QmFyTG9naW5DdHJsID0gcmVxdWlyZSgnLi9hY2NvdW50L212TmF2QmFyTG9naW5DdHJsJyk7XHJcblxyXG4vL3NlcnZpY2VzXHJcbnZhciBtdkNvdXJzZSA9IHJlcXVpcmUoJy4vY291cnNlcy9tdkNvdXJzZScpO1xyXG52YXIgbXZDYXNoZWRDb3Vyc2VzID0gcmVxdWlyZSgnLi9jb3Vyc2VzL212Q2FzaGVkQ291cnNlcycpO1xyXG52YXIgbXZOb3RpZmllciA9IHJlcXVpcmUoJy4vY29tbW9uL212Tm90aWZpZXInKTtcclxudmFyIG12VXNlciA9IHJlcXVpcmUoJy4vYWNjb3VudC9tdlVzZXInKTtcclxudmFyIG12SWRlbnRpdHkgPSByZXF1aXJlKCcuL2FjY291bnQvbXZJZGVudGl0eScpO1xyXG52YXIgbXZBdXRoID0gcmVxdWlyZSgnLi9hY2NvdW50L212QXV0aCcpO1xyXG5cclxudmFyIGFwcE1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ25nUmVzb3VyY2UnLCAnbmdSb3V0ZSddKVxyXG5cdC5jb250cm9sbGVyKCdtdk1haW5DdHJsJywgbXZNYWluQ3RybClcclxuXHQuY29udHJvbGxlcignbXZDb3Vyc2VMaXN0Q3RybCcsIG12Q291cnNlTGlzdEN0cmwpXHJcblx0LmNvbnRyb2xsZXIoJ212Q291cnNlRGV0YWlsQ3RybCcsIG12Q291cnNlRGV0YWlsQ3RybClcclxuXHQuY29udHJvbGxlcignbXZVc2VyTGlzdEN0cmwnLCBtdlVzZXJMaXN0Q3RybClcclxuXHQuY29udHJvbGxlcignbXZTaWdudXBDdHJsJywgbXZTaWdudXBDdHJsKVxyXG5cdC5jb250cm9sbGVyKCdtdlByb2ZpbGVDdHJsJywgbXZQcm9maWxlQ3RybClcclxuXHQuY29udHJvbGxlcignbXZOYXZCYXJMb2dpbkN0cmwnLCBtdk5hdkJhckxvZ2luQ3RybClcclxuXHQuZmFjdG9yeSgnbXZDb3Vyc2UnLCBtdkNvdXJzZSlcclxuXHQuZmFjdG9yeSgnbXZDYXNoZWRDb3Vyc2VzJywgbXZDYXNoZWRDb3Vyc2VzKVxyXG5cdC52YWx1ZSgnbXZUb2FzdHInLCB0b2FzdHIpXHJcblx0LmZhY3RvcnkoJ212Tm90aWZpZXInLCBtdk5vdGlmaWVyKVxyXG5cdC5mYWN0b3J5KCdtdlVzZXInLCBtdlVzZXIpXHJcblx0LmZhY3RvcnkoJ212SWRlbnRpdHknLCBtdklkZW50aXR5KVxyXG5cdC5mYWN0b3J5KCdtdkF1dGgnLCBtdkF1dGgpO1xyXG5cclxuYXBwTW9kdWxlLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XHJcblx0dmFyIHJvdXRlUm9sZUNoZWNrcyA9IHtcclxuXHRcdGFkbWluOiB7YXV0aDogZnVuY3Rpb24gKG12QXV0aCkge1xyXG5cdFx0XHRyZXR1cm4gbXZBdXRoLmF1dGhvcml6ZUN1cnJlbnRVc2VyRm9yUm91dGUoJ2FkbWluJyk7XHJcblx0XHR9fSxcclxuXHRcdHVzZXI6IHthdXRoOiBmdW5jdGlvbiAobXZBdXRoKSB7XHJcblx0XHRcdHJldHVybiBtdkF1dGguYXV0aG9yaXplQXV0aGVudGljYXRlZFVzZXJGb3JSb3V0ZSgpO1xyXG5cdFx0fX1cclxuXHR9O1xyXG5cclxuXHQkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUoe1xyXG4gIFx0XHRlbmFibGVkOiB0cnVlLFxyXG4gIFx0XHRyZXF1aXJlQmFzZTogZmFsc2VcclxuXHR9KTtcclxuXHQkcm91dGVQcm92aWRlclxyXG5cdFx0LndoZW4oJy8nLCB7XHJcblx0XHRcdHRlbXBsYXRlVXJsOiAnL3BhcnRpYWxzL21haW4vbWFpbicsXHJcblx0XHRcdGNvbnRyb2xsZXI6ICdtdk1haW5DdHJsJ1xyXG5cdFx0fSk7XHJcblx0XHQvLyAud2hlbignL2FkbWluL3VzZXJzJywge1xyXG5cdFx0Ly8gXHR0ZW1wbGF0ZVVybDogJy9wYXJ0aWFscy9hZG1pbi91c2VyLWxpc3QnLFxyXG5cdFx0Ly8gXHRjb250cm9sbGVyOiAnbXZVc2VyTGlzdEN0cmwnLFxyXG5cdFx0Ly8gXHRyZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MuYWRtaW5cclxuXHRcdC8vIH0pXHJcblx0XHQvLyAud2hlbignL3NpZ251cCcsIHtcclxuXHRcdC8vIFx0dGVtcGxhdGVVcmw6ICcvcGFydGlhbHMvYWNjb3VudC9zaWdudXAnLFxyXG5cdFx0Ly8gXHRjb250cm9sbGVyOiAnbXZTaWdudXBDdHJsJ1xyXG5cdFx0Ly8gfSlcclxuXHRcdC8vIC53aGVuKCcvcHJvZmlsZScsIHtcclxuXHRcdC8vIFx0dGVtcGxhdGVVcmw6ICcvcGFydGlhbHMvYWNjb3VudC9wcm9maWxlJyxcclxuXHRcdC8vIFx0Y29udHJvbGxlcjogJ212UHJvZmlsZUN0cmwnLFxyXG5cdFx0Ly8gXHRyZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MudXNlclxyXG5cdFx0Ly8gfSlcclxuXHRcdC8vIC53aGVuKCcvY291cnNlcycsIHtcclxuXHRcdC8vIFx0dGVtcGxhdGVVcmw6ICcvcGFydGlhbHMvY291cnNlcy9jb3Vyc2UtbGlzdCcsXHJcblx0XHQvLyBcdGNvbnRyb2xsZXI6ICdtdkNvdXJzZUxpc3RDdHJsJ1xyXG5cdFx0Ly8gfSlcclxuXHRcdC8vIC53aGVuKCcvY291cnNlcy86aWQnLCB7XHJcblx0XHQvLyBcdHRlbXBsYXRlVXJsOiAnL3BhcnRpYWxzL2NvdXJzZXMvY291cnNlLWRldGFpbHMnLFxyXG5cdFx0Ly8gXHRjb250cm9sbGVyOiAnbXZDb3Vyc2VEZXRhaWxDdHJsJ1xyXG5cdFx0Ly8gfSk7XHJcbn0pO1xyXG5cclxuYXBwTW9kdWxlLnJ1bihmdW5jdGlvbiAoJHJvb3RTY29wZSwgJGxvY2F0aW9uKSB7XHJcblx0JHJvb3RTY29wZS4kb24oJyRyb3V0ZUNoYW5nZUVycm9yJywgZnVuY3Rpb24gKGV2dCwgY3VycmVudCwgcHJldmlvdXMsIHJlamVjdGlvbikge1xyXG5cdFx0aWYgKHJlamVjdGlvbiA9PT0gJ25vdCBhdXRob3JpemVkJykge1xyXG5cdFx0XHQkbG9jYXRpb24ucGF0aCgnLycpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59KTtcclxuXHJcbiIsIi8qYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ212QXV0aCcsIGZ1bmN0aW9uKCRodHRwLCAkcSwgbXZJZGVudGl0eSwgbXZVc2VyKXtcclxuXHRyZXR1cm4ge1xyXG5cdFx0YXV0aGVudGljYXRlVXNlcjogZnVuY3Rpb24odXNlcm5hbWUsIHBhc3N3b3JkKXtcclxuXHRcdFx0dmFyIGRmZCA9ICRxLmRlZmVyKCk7XHJcblx0XHRcdCRodHRwLnBvc3QoJy9sb2dpbicsIHt1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0aWYocmVzcG9uc2UuZGF0YS5zdWNjZXNzKXtcclxuXHRcdFx0XHRcdHZhciB1c2VyID0gbmV3IG12VXNlcigpO1xyXG5cdFx0XHRcdFx0YW5ndWxhci5leHRlbmQodXNlciwgcmVzcG9uc2UuZGF0YS51c2VyKTtcclxuXHRcdFx0XHRcdG12SWRlbnRpdHkuY3VycmVudFVzZXIgPSB1c2VyO1xyXG5cdFx0XHRcdFx0ZGZkLnJlc29sdmUodHJ1ZSk7XHJcblx0XHRcdFx0fSBlbHNle1xyXG5cdFx0XHRcdFx0ZGZkLnJlc29sdmUoZmFsc2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gZGZkLnByb21pc2U7XHJcblx0XHR9LFxyXG5cdFx0Y3JlYXRlVXNlcjogZnVuY3Rpb24gKG5ld1VzZXJEYXRhKSB7XHJcblx0XHRcdHZhciBuZXdVc2VyID0gbmV3IG12VXNlcihuZXdVc2VyRGF0YSk7XHJcblx0XHRcdHZhciBkZmQgPSAkcS5kZWZlcigpO1xyXG5cclxuXHRcdFx0bmV3VXNlci4kc2F2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdG12SWRlbnRpdHkuY3VycmVudFVzZXIgPSBuZXdVc2VyO1xyXG5cdFx0XHRcdGRmZC5yZXNvbHZlKCk7XHJcblx0XHRcdH0sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cdFx0XHRcdGRmZC5yZWplY3QocmVzcG9uc2UuZGF0YS5yZWFzb24pO1xyXG5cdFx0XHR9KTtcdFxyXG5cclxuXHRcdFx0cmV0dXJuIGRmZC5wcm9taXNlO1xyXG5cdFx0fSxcclxuXHRcdHVwZGF0ZUN1cnJlbnRVc2VyOiBmdW5jdGlvbiAobmV3VXNlckRhdGEpIHtcclxuXHRcdFx0dmFyIGRmZCA9ICRxLmRlZmVyKCk7XHJcblx0XHRcdHZhciBjbG9uZSA9IGFuZ3VsYXIuY29weShtdklkZW50aXR5LmN1cnJlbnRVc2VyKTtcclxuXHRcdFx0YW5ndWxhci5leHRlbmQoY2xvbmUsIG5ld1VzZXJEYXRhKTtcclxuXHRcdFx0Y2xvbmUuJHVwZGF0ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdG12SWRlbnRpdHkuY3VycmVudFVzZXIgPSBjbG9uZTtcclxuXHRcdFx0XHRkZmQucmVzb2x2ZSgpO1xyXG5cdFx0XHR9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRkZmQucmVqZWN0KHJlc3BvbnNlLmRhdGEucmVhc29uKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gZGZkLnByb21pc2U7XHJcblx0XHR9LFxyXG5cdFx0bG9nb3V0VXNlcjogZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIGRmZCA9ICRxLmRlZmVyKCk7XHJcblx0XHRcdCRodHRwLnBvc3QoJy9sb2dvdXQnLCB7bG9nb3V0OiB0cnVlfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0bXZJZGVudGl0eS5jdXJyZW50VXNlciA9IHVuZGVmaW5lZDtcclxuXHRcdFx0XHRkZmQucmVzb2x2ZSgpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBkZmQucHJvbWlzZTtcdFxyXG5cdFx0fSxcclxuXHRcdGF1dGhvcml6ZUN1cnJlbnRVc2VyRm9yUm91dGU6IGZ1bmN0aW9uIChyb2xlKSB7XHJcblx0XHRcdGlmIChtdklkZW50aXR5LmlzQXV0aG9yaXplZChyb2xlKSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2V7XHJcblx0XHRcdFx0cmV0dXJuICRxLnJlamVjdCgnbm90IGF1dGhvcml6ZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGF1dGhvcml6ZUF1dGhlbnRpY2F0ZWRVc2VyRm9yUm91dGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKG12SWRlbnRpdHkuaXNBdXRoZW50aWNhdGVkKCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNle1xyXG5cdFx0XHRcdHJldHVybiAkcS5yZWplY3QoJ25vdCBhdXRob3JpemVkJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59KTsqL1xyXG5cclxudmFyIG12QXV0aCA9IGZ1bmN0aW9uICgkaHR0cCwgJHEsIG12SWRlbnRpdHksIG12VXNlcikge1xyXG5cdHJldHVybiB7XHJcblx0XHRhdXRoZW50aWNhdGVVc2VyOiBmdW5jdGlvbih1c2VybmFtZSwgcGFzc3dvcmQpe1xyXG5cdFx0XHR2YXIgZGZkID0gJHEuZGVmZXIoKTtcclxuXHRcdFx0JGh0dHAucG9zdCgnL2xvZ2luJywge3VzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRpZihyZXNwb25zZS5kYXRhLnN1Y2Nlc3Mpe1xyXG5cdFx0XHRcdFx0dmFyIHVzZXIgPSBuZXcgbXZVc2VyKCk7XHJcblx0XHRcdFx0XHRhbmd1bGFyLmV4dGVuZCh1c2VyLCByZXNwb25zZS5kYXRhLnVzZXIpO1xyXG5cdFx0XHRcdFx0bXZJZGVudGl0eS5jdXJyZW50VXNlciA9IHVzZXI7XHJcblx0XHRcdFx0XHRkZmQucmVzb2x2ZSh0cnVlKTtcclxuXHRcdFx0XHR9IGVsc2V7XHJcblx0XHRcdFx0XHRkZmQucmVzb2x2ZShmYWxzZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBkZmQucHJvbWlzZTtcclxuXHRcdH0sXHJcblx0XHRjcmVhdGVVc2VyOiBmdW5jdGlvbiAobmV3VXNlckRhdGEpIHtcclxuXHRcdFx0dmFyIG5ld1VzZXIgPSBuZXcgbXZVc2VyKG5ld1VzZXJEYXRhKTtcclxuXHRcdFx0dmFyIGRmZCA9ICRxLmRlZmVyKCk7XHJcblxyXG5cdFx0XHRuZXdVc2VyLiRzYXZlKCkudGhlbihmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0bXZJZGVudGl0eS5jdXJyZW50VXNlciA9IG5ld1VzZXI7XHJcblx0XHRcdFx0ZGZkLnJlc29sdmUoKTtcclxuXHRcdFx0fSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0ZGZkLnJlamVjdChyZXNwb25zZS5kYXRhLnJlYXNvbik7XHJcblx0XHRcdH0pO1x0XHJcblxyXG5cdFx0XHRyZXR1cm4gZGZkLnByb21pc2U7XHJcblx0XHR9LFxyXG5cdFx0dXBkYXRlQ3VycmVudFVzZXI6IGZ1bmN0aW9uIChuZXdVc2VyRGF0YSkge1xyXG5cdFx0XHR2YXIgZGZkID0gJHEuZGVmZXIoKTtcclxuXHRcdFx0dmFyIGNsb25lID0gYW5ndWxhci5jb3B5KG12SWRlbnRpdHkuY3VycmVudFVzZXIpO1xyXG5cdFx0XHRhbmd1bGFyLmV4dGVuZChjbG9uZSwgbmV3VXNlckRhdGEpO1xyXG5cdFx0XHRjbG9uZS4kdXBkYXRlKCkudGhlbihmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0bXZJZGVudGl0eS5jdXJyZW50VXNlciA9IGNsb25lO1xyXG5cdFx0XHRcdGRmZC5yZXNvbHZlKCk7XHJcblx0XHRcdH0sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cdFx0XHRcdGRmZC5yZWplY3QocmVzcG9uc2UuZGF0YS5yZWFzb24pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBkZmQucHJvbWlzZTtcclxuXHRcdH0sXHJcblx0XHRsb2dvdXRVc2VyOiBmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgZGZkID0gJHEuZGVmZXIoKTtcclxuXHRcdFx0JGh0dHAucG9zdCgnL2xvZ291dCcsIHtsb2dvdXQ6IHRydWV9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRtdklkZW50aXR5LmN1cnJlbnRVc2VyID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdGRmZC5yZXNvbHZlKCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRmZC5wcm9taXNlO1x0XHJcblx0XHR9LFxyXG5cdFx0YXV0aG9yaXplQ3VycmVudFVzZXJGb3JSb3V0ZTogZnVuY3Rpb24gKHJvbGUpIHtcclxuXHRcdFx0aWYgKG12SWRlbnRpdHkuaXNBdXRob3JpemVkKHJvbGUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZXtcclxuXHRcdFx0XHRyZXR1cm4gJHEucmVqZWN0KCdub3QgYXV0aG9yaXplZCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0YXV0aG9yaXplQXV0aGVudGljYXRlZFVzZXJGb3JSb3V0ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAobXZJZGVudGl0eS5pc0F1dGhlbnRpY2F0ZWQoKSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2V7XHJcblx0XHRcdFx0cmV0dXJuICRxLnJlamVjdCgnbm90IGF1dGhvcml6ZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn07XHJcblxyXG5tdkF1dGguJGluamVjdCA9IFsnJGh0dHAnLCAnJHEnLCAnbXZJZGVudGl0eScsICdtdlVzZXInXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbXZBdXRoOyIsIi8qYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ212SWRlbnRpdHknLCBmdW5jdGlvbiAoJHdpbmRvdywgbXZVc2VyKSB7XHJcblx0dmFyIGN1cnJlbnRVc2VyO1xyXG5cdGlmICghISR3aW5kb3cuYm9vdHN0cmFwcGVkVXNlck9iamVjdCl7XHJcblx0XHRjdXJyZW50VXNlciA9IG5ldyBtdlVzZXIoKTtcclxuXHRcdGFuZ3VsYXIuZXh0ZW5kKGN1cnJlbnRVc2VyLCAkd2luZG93LmJvb3RzdHJhcHBlZFVzZXJPYmplY3QpO1xyXG5cdH1cclxuXHRyZXR1cm4ge1xyXG5cdFx0Y3VycmVudFVzZXI6IGN1cnJlbnRVc2VyLFxyXG5cdFx0aXNBdXRoZW50aWNhdGVkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiAhIXRoaXMuY3VycmVudFVzZXI7XHJcblx0XHR9LFxyXG5cdFx0aXNBdXRob3JpemVkOiBmdW5jdGlvbiAocm9sZSkge1xyXG5cdFx0XHRyZXR1cm4gISF0aGlzLmN1cnJlbnRVc2VyICYmIHRoaXMuY3VycmVudFVzZXIucm9sZXMuaW5kZXhPZihyb2xlKSA+IC0xO1xyXG5cdFx0fVxyXG5cdH07XHJcbn0pOyovXHJcblxyXG52YXIgbXZJZGVudGl0eSA9IGZ1bmN0aW9uICgkd2luZG93LCBtdlVzZXIpIHtcclxuXHR2YXIgY3VycmVudFVzZXI7XHJcblx0aWYgKCEhJHdpbmRvdy5ib290c3RyYXBwZWRVc2VyT2JqZWN0KXtcclxuXHRcdGN1cnJlbnRVc2VyID0gbmV3IG12VXNlcigpO1xyXG5cdFx0YW5ndWxhci5leHRlbmQoY3VycmVudFVzZXIsICR3aW5kb3cuYm9vdHN0cmFwcGVkVXNlck9iamVjdCk7XHJcblx0fVxyXG5cdHJldHVybiB7XHJcblx0XHRjdXJyZW50VXNlcjogY3VycmVudFVzZXIsXHJcblx0XHRpc0F1dGhlbnRpY2F0ZWQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuICEhdGhpcy5jdXJyZW50VXNlcjtcclxuXHRcdH0sXHJcblx0XHRpc0F1dGhvcml6ZWQ6IGZ1bmN0aW9uIChyb2xlKSB7XHJcblx0XHRcdHJldHVybiAhIXRoaXMuY3VycmVudFVzZXIgJiYgdGhpcy5jdXJyZW50VXNlci5yb2xlcy5pbmRleE9mKHJvbGUpID4gLTE7XHJcblx0XHR9XHJcblx0fTtcclxufTtcclxuXHJcbm12SWRlbnRpdHkuJGluamVjdCA9IFsnJHdpbmRvdycsICdtdlVzZXInXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbXZJZGVudGl0eTsiLCIvKmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdtdk5hdkJhckxvZ2luQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsICRodHRwLCAkbG9jYXRpb24sIG12SWRlbnRpdHksIG12Tm90aWZpZXIsIG12QXV0aCkge1xyXG5cdCRzY29wZS5pZGVudGl0eSA9IG12SWRlbnRpdHk7XHJcblx0JHNjb3BlLnNpZ25pbiA9IGZ1bmN0aW9uKHVzZXJuYW1lLCBwYXNzd29yZCkge1xyXG5cdFx0bXZBdXRoLmF1dGhlbnRpY2F0ZVVzZXIodXNlcm5hbWUsIHBhc3N3b3JkKS50aGVuKGZ1bmN0aW9uKHN1Y2Nlc3Mpe1xyXG5cdFx0XHRpZihzdWNjZXNzKXtcclxuXHRcdFx0XHRtdk5vdGlmaWVyLm5vdGlmeSgnWW91IGhhdmUgU3VjY2Vzc2Z1bHkgc2lnbmVkIGluIScpO1xyXG5cdFx0XHR9IGVsc2V7XHJcblx0XHRcdFx0bXZOb3RpZmllci5ub3RpZnkoJ1VzZXJuYW1lL1Bhc3N3b3JkIGNvbWJpbmF0aW9uIGluY29ycmVjdCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQkc2NvcGUuc2lnbm91dCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRtdkF1dGgubG9nb3V0VXNlcigpLnRoZW4oZnVuY3Rpb24oKXtcclxuXHRcdFx0JHNjb3BlLnVzZXJuYW1lID0gJyc7XHJcblx0XHRcdCRzY29wZS5wYXNzd29yZCA9ICcnO1xyXG5cdFx0XHRtdk5vdGlmaWVyLm5vdGlmeSgnWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNpZ25lZCBvdXQhJyk7XHJcblx0XHRcdCRsb2NhdGlvbi5wYXRoKCcvJyk7XHRcclxuXHRcdH0pO1x0XHJcblx0fTtcclxufSk7Ki9cclxuXHJcbnZhciBtdk5hdkJhckxvZ2luQ3RybCA9IGZ1bmN0aW9uICgkc2NvcGUsICRodHRwLCAkbG9jYXRpb24sIG12SWRlbnRpdHksIG12Tm90aWZpZXIsIG12QXV0aCkge1xyXG5cdCRzY29wZS5pZGVudGl0eSA9IG12SWRlbnRpdHk7XHJcblx0JHNjb3BlLnNpZ25pbiA9IGZ1bmN0aW9uKHVzZXJuYW1lLCBwYXNzd29yZCkge1xyXG5cdFx0bXZBdXRoLmF1dGhlbnRpY2F0ZVVzZXIodXNlcm5hbWUsIHBhc3N3b3JkKS50aGVuKGZ1bmN0aW9uKHN1Y2Nlc3Mpe1xyXG5cdFx0XHRpZihzdWNjZXNzKXtcclxuXHRcdFx0XHRtdk5vdGlmaWVyLm5vdGlmeSgnWW91IGhhdmUgU3VjY2Vzc2Z1bHkgc2lnbmVkIGluIScpO1xyXG5cdFx0XHR9IGVsc2V7XHJcblx0XHRcdFx0bXZOb3RpZmllci5ub3RpZnkoJ1VzZXJuYW1lL1Bhc3N3b3JkIGNvbWJpbmF0aW9uIGluY29ycmVjdCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQkc2NvcGUuc2lnbm91dCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRtdkF1dGgubG9nb3V0VXNlcigpLnRoZW4oZnVuY3Rpb24oKXtcclxuXHRcdFx0JHNjb3BlLnVzZXJuYW1lID0gJyc7XHJcblx0XHRcdCRzY29wZS5wYXNzd29yZCA9ICcnO1xyXG5cdFx0XHRtdk5vdGlmaWVyLm5vdGlmeSgnWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNpZ25lZCBvdXQhJyk7XHJcblx0XHRcdCRsb2NhdGlvbi5wYXRoKCcvJyk7XHRcclxuXHRcdH0pO1x0XHJcblx0fTtcclxufTtcclxuXHJcbm12TmF2QmFyTG9naW5DdHJsLiRpbmplY3QgPSBbJyRzY29wZScsICckaHR0cCcsICckbG9jYXRpb24nLCAnbXZJZGVudGl0eScsICdtdk5vdGlmaWVyJywgJ212QXV0aCddO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtdk5hdkJhckxvZ2luQ3RybDsiLCIvKmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdtdlByb2ZpbGVDdHJsJywgZnVuY3Rpb24gKCRzY29wZSwgbXZBdXRoLCBtdklkZW50aXR5LCBtdk5vdGlmaWVyKSB7XHJcblx0JHNjb3BlLmVtYWlsID0gbXZJZGVudGl0eS5jdXJyZW50VXNlci51c2VybmFtZTtcclxuXHQkc2NvcGUuZm5hbWUgPSBtdklkZW50aXR5LmN1cnJlbnRVc2VyLmZpcnN0TmFtZTtcclxuXHQkc2NvcGUubG5hbWUgPSBtdklkZW50aXR5LmN1cnJlbnRVc2VyLmxhc3ROYW1lO1xyXG5cclxuXHQkc2NvcGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIG5ld1VzZXJEYXRhID0ge1xyXG5cdFx0XHR1c2VybmFtZTogJHNjb3BlLmVtYWlsLFxyXG5cdFx0XHRmaXJzdE5hbWU6ICRzY29wZS5mbmFtZSxcclxuXHRcdFx0bGFzdE5hbWU6ICRzY29wZS5sbmFtZVxyXG5cdFx0fTtcclxuXHJcblx0XHRpZigkc2NvcGUucGFzc3dvcmQgJiYgJHNjb3BlLnBhc3N3b3JkLmxlbmd0aCA+IDApe1xyXG5cdFx0XHRuZXdVc2VyRGF0YS5wYXNzd29yZCA9ICRzY29wZS5wYXNzd29yZDtcclxuXHRcdH1cclxuXHJcblx0XHRtdkF1dGgudXBkYXRlQ3VycmVudFVzZXIobmV3VXNlckRhdGEpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRtdk5vdGlmaWVyLm5vdGlmeSgnWW91ciB1c2VyIGFjY291bnQgaGFzIGJlZW4gdXBkYXRlJyk7XHJcblx0XHR9LCBmdW5jdGlvbiAocmVhc29uKSB7XHJcblx0XHRcdG12Tm90aWZpZXIuZXJyb3IocmVhc29uKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcbn0pOyovXHJcblxyXG52YXIgbXZQcm9maWxlQ3RybCA9IGZ1bmN0aW9uICgkc2NvcGUsIG12QXV0aCwgbXZJZGVudGl0eSwgbXZOb3RpZmllcikge1xyXG5cdCRzY29wZS5lbWFpbCA9IG12SWRlbnRpdHkuY3VycmVudFVzZXIudXNlcm5hbWU7XHJcblx0JHNjb3BlLmZuYW1lID0gbXZJZGVudGl0eS5jdXJyZW50VXNlci5maXJzdE5hbWU7XHJcblx0JHNjb3BlLmxuYW1lID0gbXZJZGVudGl0eS5jdXJyZW50VXNlci5sYXN0TmFtZTtcclxuXHJcblx0JHNjb3BlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBuZXdVc2VyRGF0YSA9IHtcclxuXHRcdFx0dXNlcm5hbWU6ICRzY29wZS5lbWFpbCxcclxuXHRcdFx0Zmlyc3ROYW1lOiAkc2NvcGUuZm5hbWUsXHJcblx0XHRcdGxhc3ROYW1lOiAkc2NvcGUubG5hbWVcclxuXHRcdH07XHJcblxyXG5cdFx0aWYoJHNjb3BlLnBhc3N3b3JkICYmICRzY29wZS5wYXNzd29yZC5sZW5ndGggPiAwKXtcclxuXHRcdFx0bmV3VXNlckRhdGEucGFzc3dvcmQgPSAkc2NvcGUucGFzc3dvcmQ7XHJcblx0XHR9XHJcblxyXG5cdFx0bXZBdXRoLnVwZGF0ZUN1cnJlbnRVc2VyKG5ld1VzZXJEYXRhKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0bXZOb3RpZmllci5ub3RpZnkoJ1lvdXIgdXNlciBhY2NvdW50IGhhcyBiZWVuIHVwZGF0ZScpO1xyXG5cdFx0fSwgZnVuY3Rpb24gKHJlYXNvbikge1xyXG5cdFx0XHRtdk5vdGlmaWVyLmVycm9yKHJlYXNvbik7XHJcblx0XHR9KTtcclxuXHR9O1x0XHJcbn07XHJcblxyXG5tdlByb2ZpbGVDdHJsLiRpbmplY3QgPSBbJyRzY29wZScsICdtdkF1dGgnLCAnbXZJZGVudGl0eScsICdtdk5vdGlmaWVyJ107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG12UHJvZmlsZUN0cmw7IiwiLyphbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignbXZTaWdudXBDdHJsJywgZnVuY3Rpb24gKCRzY29wZSwgJGxvY2F0aW9uLCBtdkF1dGgsIG12Tm90aWZpZXIpIHtcclxuXHRcclxuXHQkc2NvcGUuc2lnbnVwID0gZnVuY3Rpb24oKXtcclxuXHRcdHZhciBuZXdVc2VyRGF0YSA9IHtcclxuXHRcdFx0dXNlcm5hbWU6ICRzY29wZS5lbWFpbCxcclxuXHRcdFx0cGFzc3dvcmQ6ICRzY29wZS5wYXNzd29yZCxcclxuXHRcdFx0Zmlyc3ROYW1lOiAkc2NvcGUuZm5hbWUsXHJcblx0XHRcdGxhc3ROYW1lOiAkc2NvcGUubG5hbWVcclxuXHRcdH07XHRcclxuXHJcblx0XHRtdkF1dGguY3JlYXRlVXNlcihuZXdVc2VyRGF0YSkudGhlbihmdW5jdGlvbiAoKSB7XHJcblx0XHRcdG12Tm90aWZpZXIubm90aWZ5KCdVc2VyIGFjY291bnQgY3JlYXRlZCEnKTtcclxuXHRcdFx0JGxvY2F0aW9uLnBhdGgoJy8nKTtcclxuXHRcdH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcclxuXHRcdFx0bXZOb3RpZmllci5lcnJvcihyZWFzb24pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59KTsqL1xyXG5cclxudmFyIG12U2lnbnVwQ3RybCA9IGZ1bmN0aW9uICgkc2NvcGUsICRsb2NhdGlvbiwgbXZBdXRoLCBtdk5vdGlmaWVyKSB7XHJcblx0JHNjb3BlLnNpZ251cCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIG5ld1VzZXJEYXRhID0ge1xyXG5cdFx0XHR1c2VybmFtZTogJHNjb3BlLmVtYWlsLFxyXG5cdFx0XHRwYXNzd29yZDogJHNjb3BlLnBhc3N3b3JkLFxyXG5cdFx0XHRmaXJzdE5hbWU6ICRzY29wZS5mbmFtZSxcclxuXHRcdFx0bGFzdE5hbWU6ICRzY29wZS5sbmFtZVxyXG5cdFx0fTtcdFxyXG5cclxuXHRcdG12QXV0aC5jcmVhdGVVc2VyKG5ld1VzZXJEYXRhKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0bXZOb3RpZmllci5ub3RpZnkoJ1VzZXIgYWNjb3VudCBjcmVhdGVkIScpO1xyXG5cdFx0XHQkbG9jYXRpb24ucGF0aCgnLycpO1xyXG5cdFx0fSwgZnVuY3Rpb24gKHJlYXNvbikge1xyXG5cdFx0XHRtdk5vdGlmaWVyLmVycm9yKHJlYXNvbik7XHJcblx0XHR9KTtcclxuXHR9XHJcbn07XHJcblxyXG5tdlNpZ251cEN0cmwuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2NhdGlvbicsICdtdkF1dGgnLCAnbXZOb3RpZmllciddO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtdlNpZ251cEN0cmw7IiwiLyphbmd1bGFyLm1vZHVsZSgnYXBwJykuZmFjdG9yeSgnbXZVc2VyJywgZnVuY3Rpb24gKCRyZXNvdXJjZSkge1xyXG5cdHZhciBVc2VyUmVzb3VyY2UgPSAkcmVzb3VyY2UoJy9hcGkvdXNlcnMvOmlkJywge2lkOiAnQGlkJ30sIHtcclxuXHRcdHVwZGF0ZToge21ldGhvZDogJ1BVVCcsIGlzQXJyYXk6ZmFsc2V9XHJcblx0fSk7XHJcblxyXG5cdFVzZXJSZXNvdXJjZS5wcm90b3R5cGUuaXNBZG1pbiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucm9sZXMgJiYgdGhpcy5yb2xlcy5pbmRleE9mKCdhZG1pbicpID4gLTE7XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIFVzZXJSZXNvdXJjZTtcclxufSkqL1xyXG5cclxudmFyIG12VXNlciA9IGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcclxuXHR2YXIgVXNlclJlc291cmNlID0gJHJlc291cmNlKCcvYXBpL3VzZXJzLzppZCcsIHtpZDogJ0BpZCd9LCB7XHJcblx0XHR1cGRhdGU6IHttZXRob2Q6ICdQVVQnLCBpc0FycmF5OmZhbHNlfVxyXG5cdH0pO1xyXG5cclxuXHRVc2VyUmVzb3VyY2UucHJvdG90eXBlLmlzQWRtaW4gPSBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiB0aGlzLnJvbGVzICYmIHRoaXMucm9sZXMuaW5kZXhPZignYWRtaW4nKSA+IC0xO1xyXG5cdH07XHJcblxyXG5cdHJldHVybiBVc2VyUmVzb3VyY2U7XHJcbn07XHJcblxyXG5tdlVzZXIuJGluamVjdCA9IFsnJHJlc291cmNlJ107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG12VXNlcjsiLCIvKmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdtdlVzZXJMaXN0Q3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIG12VXNlcikge1xyXG5cdCRzY29wZS51c2VycyA9IG12VXNlci5xdWVyeSgpO1xyXG59KTsqL1xyXG5cclxudmFyIG12VXNlckxpc3RDdHJsID0gZnVuY3Rpb24gKCRzY29wZSwgbXZVc2VyKSB7XHJcblx0JHNjb3BlLnVzZXJzID0gbXZVc2VyLnF1ZXJ5KCk7XHJcbn07XHJcblxyXG5tdlVzZXJMaXN0Q3RybC4kaW5qZWN0ID0gWyckc2NvcGUnLCAnbXZVc2VyJ107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG12VXNlckxpc3RDdHJsOyIsIi8qYW5ndWxhci5tb2R1bGUoJ2FwcCcpLnZhbHVlKCdtdlRvYXN0cicsIHRvYXN0cik7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnYXBwJykuZmFjdG9yeSgnbXZOb3RpZmllcicsIGZ1bmN0aW9uIChtdlRvYXN0cikge1xyXG5cdHJldHVybiB7XHJcblx0XHRub3RpZnk6IGZ1bmN0aW9uIChtc2cpIHtcclxuXHRcdFx0bXZUb2FzdHIuc3VjY2Vzcyhtc2cpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhtc2cpO1xyXG5cdFx0fSxcclxuXHRcdGVycm9yOiBmdW5jdGlvbiAobXNnKSB7XHJcblx0XHRcdG12VG9hc3RyLmVycm9yKG1zZyk7XHJcblx0XHRcdGNvbnNvbGUubG9nKG1zZyk7XHJcblx0XHR9XHJcblx0fTtcclxufSk7Ki9cclxuXHJcbnZhciBtdk5vdGlmaWVyID0gZnVuY3Rpb24gKG12VG9hc3RyKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdG5vdGlmeTogZnVuY3Rpb24gKG1zZykge1xyXG5cdFx0XHRtdlRvYXN0ci5zdWNjZXNzKG1zZyk7XHJcblx0XHRcdGNvbnNvbGUubG9nKG1zZyk7XHJcblx0XHR9LFxyXG5cdFx0ZXJyb3I6IGZ1bmN0aW9uIChtc2cpIHtcclxuXHRcdFx0bXZUb2FzdHIuZXJyb3IobXNnKTtcclxuXHRcdFx0Y29uc29sZS5sb2cobXNnKTtcclxuXHRcdH1cclxuXHR9O1xyXG59O1xyXG5cclxubXZOb3RpZmllci4kaW5qZWN0ID0gWydtdlRvYXN0ciddO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtdk5vdGlmaWVyOyIsIi8qYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ212Q2FzaGVkQ291cnNlcycsIGZ1bmN0aW9uIChtdkNvdXJzZSkge1xyXG5cdHZhciBjb3Vyc2VMaXN0O1xyXG5cclxuXHRyZXR1cm57XHJcblx0XHRxdWVyeTogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoIWNvdXJzZUxpc3QpIHtcclxuXHRcdFx0XHRjb3Vyc2VMaXN0ID0gbXZDb3Vyc2UucXVlcnkoKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHJldHVybiBjb3Vyc2VMaXN0O1xyXG5cdFx0fVxyXG5cdH1cclxufSk7Ki9cclxuXHJcbnZhciBtdkNhc2hlZENvdXJzZXMgPSBmdW5jdGlvbiAobXZDb3Vyc2UpIHtcclxuXHR2YXIgY291cnNlTGlzdDtcclxuXHJcblx0cmV0dXJue1xyXG5cdFx0cXVlcnk6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKCFjb3Vyc2VMaXN0KSB7XHJcblx0XHRcdFx0Y291cnNlTGlzdCA9IG12Q291cnNlLnF1ZXJ5KCk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRyZXR1cm4gY291cnNlTGlzdDtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5tdkNhc2hlZENvdXJzZXMuJGluamVjdCA9IFsnbXZDb3Vyc2UnXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbXZDYXNoZWRDb3Vyc2VzOyIsIi8qYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ212Q291cnNlJywgZnVuY3Rpb24gKCRyZXNvdXJjZSkge1xyXG5cdHZhciBDb3Vyc2VSZXNvdXJjZSA9ICRyZXNvdXJjZSgnL2FwaS9jb3Vyc2VzLzpfaWQnLCB7X2lkOiBcIkBpZFwifSwge1xyXG5cdFx0dXBkYXRlOiB7bWV0aG9kOidQVVQnLCBpc0FycmF5OmZhbHNlfVxyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gQ291cnNlUmVzb3VyY2U7XHJcbn0pOyovXHJcblxyXG52YXIgbXZDb3Vyc2UgPSBmdW5jdGlvbiAoJHJlc291cmNlKSB7XHJcblx0dmFyIENvdXJzZVJlc291cmNlID0gJHJlc291cmNlKCcvYXBpL2NvdXJzZXMvOl9pZCcsIHtfaWQ6IFwiQGlkXCJ9LCB7XHJcblx0XHR1cGRhdGU6IHttZXRob2Q6J1BVVCcsIGlzQXJyYXk6ZmFsc2V9XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBDb3Vyc2VSZXNvdXJjZTtcclxufTtcclxuXHJcbm12Q291cnNlLiRpbmplY3QgPSBbJyRyZXNvdXJjZSddO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtdkNvdXJzZTsiLCIvKmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdtdkNvdXJzZURldGFpbEN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCAkcm91dGVQYXJhbXMsIG12Q291cnNlKSB7XHJcblx0JHNjb3BlLmNvdXJzZSA9IG12Q291cnNlLmdldCh7X2lkOiRyb3V0ZVBhcmFtcy5pZH0pO1xyXG59KTsqL1xyXG5cclxudmFyIG12Q291cnNlRGV0YWlsQ3RybCA9IGZ1bmN0aW9uICgkc2NvcGUsICRyb3V0ZVBhcmFtcywgbXZDb3Vyc2UpIHtcclxuXHQkc2NvcGUuY291cnNlID0gbXZDb3Vyc2UuZ2V0KHtfaWQ6JHJvdXRlUGFyYW1zLmlkfSk7XHJcbn07XHJcblxyXG5tdkNvdXJzZURldGFpbEN0cmwuJGluamVjdCA9IFsnJHNjb3BlJywgJyRyb3V0ZVBhcmFtcycsICdtdkNvdXJzZSddO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtdkNvdXJzZURldGFpbEN0cmw7IiwidmFyIG12Q291cnNlTGlzdEN0cmwgPSBmdW5jdGlvbiAoJHNjb3BlLCBtdkNhc2hlZENvdXJzZXMpIHtcclxuXHQkc2NvcGUuY291cnNlcyA9IG12Q2FzaGVkQ291cnNlcy5xdWVyeSgpO1xyXG5cclxuXHQkc2NvcGUuc29ydE9wdGlvbnMgPSBbe3ZhbHVlOlwidGl0bGVcIiwgdGV4dDpcIlNvcnQgYnkgVGl0bGVcIn0sXHJcblx0XHRcdHt2YWx1ZTogXCJwdWJsaXNoZWRcIiwgdGV4dDpcIlNvcnQgYnkgUHVibGlzaCBEYXRlXCJ9XTtcclxuXHJcblx0JHNjb3BlLnNvcnRPcmRlciA9ICRzY29wZS5zb3J0T3B0aW9uc1swXS52YWx1ZTtcclxufTtcclxuXHJcbm12Q291cnNlTGlzdEN0cmwuJGluamVjdCA9IFsnJHNjb3BlJywgJ212Q2FzaGVkQ291cnNlcyddO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtdkNvdXJzZUxpc3RDdHJsOyIsInZhciBtdk1haW5DdHJsID0gZnVuY3Rpb24gKCRzY29wZSwgbXZDYXNoZWRDb3Vyc2VzKSB7XHJcblx0JHNjb3BlLmhlbGxvV29yZCA9ICdIaSBmcm9tIEFuZ3VsYXInXHJcblx0Ly8kc2NvcGUuY291cnNlcyA9IG12Q2FzaGVkQ291cnNlcy5xdWVyeSgpO1xyXG59O1xyXG5cclxubXZNYWluQ3RybC4kaW5qZWN0ID0gWyckc2NvcGUnLCAnbXZDYXNoZWRDb3Vyc2VzJ107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG12TWFpbkN0cmw7Il19
