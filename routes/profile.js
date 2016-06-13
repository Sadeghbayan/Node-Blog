var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var User = require('../models/user')
/* GET home page. */
router.get('/:id', function(req, res, next) {
	console.log(req.params.id);
	var userId = req.params.id;
	User.findById({_id:userId}, function (err, doc) {
		if (err) throw err;
		if (doc){
			console.log(doc);
			res.render('profile', {
				doc: doc,
				userID: req.params.id
			});
		}
	});
});
//
router.get('/:id/api/data.json', function(req, res, next) {
	console.log(req.params.id);
	var userId = req.params.id;
	User.findById({_id:userId}, function (err, doc) {
		if (err) throw err
		if (doc){
			res.json({
				doc: doc
				});
		}
	});
});


module.exports = router;
