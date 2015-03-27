var mvMainCtrl = function ($scope, mvCashedCourses) {
	$scope.helloWord = 'Hi from Angular'
	//$scope.courses = mvCashedCourses.query();
};

mvMainCtrl.$inject = ['$scope', 'mvCashedCourses'];

module.exports = mvMainCtrl;