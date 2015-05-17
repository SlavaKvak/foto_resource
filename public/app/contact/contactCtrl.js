var mvMainCtrl = function ($scope) {
	$scope.contacts = {phone: '12345678', email:'blabla@gmail.com', facebook:'facebook/page'}
};

mvMainCtrl.$inject = ['$scope'];

module.exports = mvMainCtrl;