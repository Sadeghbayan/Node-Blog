var express = require('express');
var router = express.Router();
var Post = require('../models/post')

var start_date = new Date();
/* GET home page. */
router.get('/', function(req, res, next) {
	Post.find().sort([['_id', -1]]).limit(6).exec(function(err, docs) {
		if(err) throw err
		else{
			console.log("Resid")
			res.render('products', { title: 'Products' , posts:docs});
			console.log(docs);
		}
	});
});



module.exports = router;
