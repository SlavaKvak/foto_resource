var mongoose = require('mongoose'),
	Category = require('mongoose').model('Category');

var assetSchema = mongoose.Schema({
	title: {type:String, required:'{PATH} is required!'},
	visible: Boolean,
	categoryThumbnail : Boolean,
	category: { type: mongoose.Schema.ObjectId, ref: 'Category' },
	imgUrl: {type:String, required:'{PATH} is required!'}
});
var Asset = mongoose.model('Asset', assetSchema);

function createDefaultAssets () {
	Asset.find({}).exec(function (err, collection) {
		if (collection.length === 0) {
				Category.findOne({ 'title': 'wedding' }).exec(function (err, category) {
					if(category){
						Asset.create({title: 'wedding', visible:true, categoryThumbnail:false, category: category._id, imgUrl: '../../../img/IMG_9281.jpg'});
						Asset.create({title: 'nature', visible:true, categoryThumbnail:false, category: category._id, imgUrl: '../../../img/IMG_9282.jpg'});
						Asset.create({title: 'love story', visible:true, categoryThumbnail:false, category: category._id, imgUrl: '../../../img/IMG_9283.jpg'});
						Asset.create({title: 'childs', visible:true, categoryThumbnail:false, category: category._id, imgUrl: '../../../img/IMG_9284.jpg'});
						Asset.create({title: 'wedding', visible:true, categoryThumbnail:false, category: category._id, imgUrl: '../../../img/IMG_9285.jpg'});
						Asset.create({title: 'wedding', visible:true, categoryThumbnail:false, category: category._id, imgUrl: '../../../img/IMG_9286.jpg'});
						Asset.create({title: 'childs', visible:true, categoryThumbnail:false, category: category._id, imgUrl: '../../../img/IMG_9288.jpg'});
						Asset.create({title: 'wedding', visible:true, categoryThumbnail:false, category: category._id, imgUrl: '../../../img/IMG_9289.jpg'});
						Asset.create({title: 'wedding', visible:true, categoryThumbnail:false, category: category._id, imgUrl: '../../../img/IMG_9290.jpg'});
					}
				});

		};
	})
}

exports.createDefaultAssets = createDefaultAssets;