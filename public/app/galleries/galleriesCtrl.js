var galleriesCtrl = function ($scope, galleriesResource) {
	$scope.categories = galleriesResource.query();
};

galleriesCtrl.$inject = ['$scope', 'galleriesResource'];

module.exports = galleriesCtrl;