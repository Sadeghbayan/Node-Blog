var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var Post = require('../models/post')



var upload = multer({ dest: './uploads/' });

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('new-post', { title: 'New Post' });
});
router.post('/new',upload.single('image'), function(req, res) {
	console.log("das", req.body, req.file);
	var newTitle = req.body.title;
	var newBody = req.body.body;
	var productCode = req.body.productCode;
	var newPost = new Post({
			title:newTitle,
			body:newBody,
			productCode:productCode,
	});
	if(req.file){
		newPost.productImage.data = fs.readFileSync(req.file.path);
		newPost.productImage.contentType = 'image/png';
		console.log("Saved Your image");
	}
// call the built-in save method to save to the database
		newPost.save(function(err) {
			if (err) throw err;

			console.log('New post saved successfully!');
		});

		//  Success Message

		req.flash('success', 'You have added a new post')

		res.location('/products');
		res.redirect('/products');



})
// router.post('/new', function (req, res, next) {
	// console.log(req.files, req.file);
	// var newTitle = req.body.title;
	// var newBody = req.body.body;
	// var productCode = req.body.productCode;
	// var newPost = new Post({
	// 		title:newTitle,
	// 		body:newBody,
	// 		productCode:productCode,
	// });
// 	newPost.productImage.data = fs.readFileSync(req.files.image.path);
// 	newPost.productImage.contentType = 'image/png';
//
// // call the built-in save method to save to the database
// 		newPost.save(function(err) {
// 			if (err) throw err;
//
// 			console.log('New post saved successfully!');
// 		});
//
// 		//  Success Message
//
// 		req.flash('success', 'You have added a new post')
//
// 		res.location('/');
// 		res.redirect('/');

	
// });

module.exports = router;
