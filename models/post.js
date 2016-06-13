var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');
// User Schema

var PostSchema = mongoose.Schema({
	title:{
		type:String
	},
	body:{
		type:String
	},
	productCode:{
		type:String
	},
	productImage:{
		data: Buffer,
		contentType: String
	}

});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;
