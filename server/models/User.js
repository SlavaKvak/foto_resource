var mongoose = require('mongoose'),
	encryption = require('../utilities/encryption');


var userSchema =mongoose.Schema({
		firstName: {type:String, required:'{PATH} is required!'},
		lastName: {type:String, required:'{PATH} is required!'},
		username: {
			type: String, 
			required:'{PATH} is required!',
			unique: true
		},
		salt: {type:String, required:'{PATH} is required!'},
		hashed_pwd: {type:String, required:'{PATH} is required!'},
		roles: [String]
	});

userSchema.methods = {
	authenticate: function (passwordToMatch) {
		return encryption.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
	},
	hasRole: function (role) {
		return this.roles.indexOf(role) > -1;
	}
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers () {
	User.find({}).exec(function (err, collection) {
		if(collection.length === 0){
			var salt, hash;
			salt = encryption.createSalt();
			hash = encryption.hashPwd(salt, 'slava');
			User.create({firstName: 'Slava', lastName: 'Kvak', username: 'quake', salt: salt, hashed_pwd: hash, roles: ['admin']});
			salt = encryption.createSalt();
			hash = encryption.hashPwd(salt, 'dima');
			User.create({firstName: 'Dima', lastName: 'Bruso', username: 'brus', salt: salt, hashed_pwd: hash, roles: []});
			salt = encryption.createSalt();
			hash = encryption.hashPwd(salt, 'ivan');
			User.create({firstName: 'Ivan', lastName: 'Gadzhega', username: 'ivan', salt: salt, hashed_pwd: hash});
		}
	});
};

exports.createDefaultUsers = createDefaultUsers;