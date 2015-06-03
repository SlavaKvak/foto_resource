var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
	title: {type:String, required:'{PATH} is required!'},
	visible: Boolean,
	thumbnailUrl: String,
	assets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Asset' }]
});
var Category = mongoose.model('Category', categorySchema);

function createDefaultCategories () {
	Category.find({}).exec(function (err, collection) {
		if (collection.length === 0) {
			Category.create({title: 'wedding', visible:true, thumbnailUrl: '../../img/thumbnails/IMG_6073.jpg'});
			Category.create({title: 'nature', visible:true, thumbnailUrl: '../../img/thumbnails/IMG_8374.jpg'});
			Category.create({title: 'love story', visible:true, thumbnailUrl: '../../img/thumbnails/IMG_9288.jpg'});
			Category.create({title: 'childs', visible:true, thumbnailUrl: '../../img/thumbnails/IMG_8948.jpg'});
			Category.create({title: 'wedding2', visible:true, thumbnailUrl: '../../img/thumbnails/IMG_6521.jpg'});
			Category.create({title: 'wedding3', visible:true, thumbnailUrl: '../../img/thumbnails/IMG_8451.jpg'});
		};
	})
}

exports.createDefaultCategories = createDefaultCategories;