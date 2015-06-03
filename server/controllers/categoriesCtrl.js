var Category = require('mongoose').model('Category');

exports.getCategories = function (req, res) {
	Category.find({}).exec(function (err, collection) {
		res.send(collection);
	});
};