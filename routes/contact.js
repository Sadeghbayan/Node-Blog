var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('contact', { title: 'Contact' });
});

router.post('/send', function (req, res, next) {
	var transporter = nodemailer.createTransport({
		service: 'Yahoo',
		auth: {
			user:'soheilsadeghbayan@yahoo.com',
			pass:'3860083236'
		}
	});

	var mailOption = {
		from: 'soheilsadeghbayan@yahoo.com',
		to: req.body.email,
		subject: 'Message From Contact Us Page!',
		text: 'Authenticated with OAuth2 .... Name:'+req.body.name+'Email:'+req.body.email+'Message'+req.body.message,
		html:'<p>message rescived</p>'+req.body.message+'Message'

	};
	// send mail
	transporter.sendMail(mailOption, function(error, info) {
		if (error) {
			console.log(error);
			res.redirect("/")
		} else {
			console.log('Message sent'+info.response);
			res.redirect("/")
		}
	});
});

module.exports = router;
