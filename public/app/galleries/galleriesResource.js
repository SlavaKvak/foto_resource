var galleriesResource = function ($resource) {
	var resource = $resource('/api/categories/:_id', {_id: "@id"});

	return resource;
};

galleriesResource.$inject = ['$resource'];

module.exports = galleriesResource;