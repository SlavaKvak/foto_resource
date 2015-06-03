var galleriesCtrl = function ($scope, galleriesResource) {
	$scope.categories = galleriesResource.query();
	// $scope.categories = [
	// 	{id: 1, name: 'wedding', iconUrl: '../../img/thumbnails/IMG_6073.jpg'},
	// 	{id: 2, name: 'nature', iconUrl: '../../img/thumbnails/IMG_8374.jpg'},
	// 	{id: 3, name: 'love story', iconUrl: '../../img/thumbnails/IMG_9288.jpg'},
	// 	{id: 4, name: 'childs', iconUrl: '../../img/thumbnails/IMG_8948.jpg'},
	// 	{id: 5, name: 'wedding', iconUrl: '../../img/thumbnails/IMG_6521.jpg'},
	// 	{id: 6, name: 'wedding', iconUrl: '../../img/thumbnails/IMG_8451.jpg'}
	// ];
};

galleriesCtrl.$inject = ['$scope', 'galleriesResource'];

module.exports = galleriesCtrl;