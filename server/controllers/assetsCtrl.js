var Asset = require('mongoose').model('Asset');

exports.getAssetsByCategoryId = function (req, res) {
	Asset.find({}).where('category').equals(req.params.categoryId).exec(function (err, collection) {
		res.send(collection);
	});
};