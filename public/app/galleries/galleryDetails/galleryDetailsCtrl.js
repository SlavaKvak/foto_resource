var categotyDetailsCtrl = function ($scope, $stateParams, assetService) {
		assetService.getAssetsByCategoryId($stateParams.galleryId).then(function (assets) {
			$scope.assets = assets;
		});
};

categotyDetailsCtrl.$inject = ['$scope', '$stateParams', 'assetService'];

module.exports = categotyDetailsCtrl;