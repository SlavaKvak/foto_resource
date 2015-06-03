var mongoose = require('mongoose'),
	categoryModel = require('../models/Category'),
	assetModel = require('../models/Asset');

module.exports = function(config) {
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback () {
		console.log('fotoGallery db opened');
	});

	categoryModel.createDefaultCategories();
	assetModel.createDefaultAssets();

};