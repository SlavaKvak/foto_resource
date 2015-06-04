var assetService = function($http, $q){
	var service = {};

	service.getAssetsByCategoryId = function  (categoryId) {
		var deferred = $q.defer();
		$http.get('/api/categories/' + categoryId + '/assets').then(function(response){
			deferred.resolve(response.data);
		});

		return deferred.promise;
	}

	return service;
};

assetService.$inject = ['$http', '$q'];

module.exports = assetService;