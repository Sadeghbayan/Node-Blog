var express = require('express');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var router = express.Router();
var User = require('../models/user')

var app = express();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/* GET users register. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});
/* GET users Login. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});


router.post('/register', function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var confirm = req.body.confirm;
//  Check for profile Image
  if(req.files){
    console.log("file Uploading ...")
    var profileImageOriginalName = req.files.profileimage.originalname;
    var profileImageName = req.files.profileimage.name;
    var profileImageMime = req.files.profileimage.mimetype;
    var profileImagePath = req.files.profileimage.path;
    var profileImageExt = req.files.profileimage.extensions;
    var profileImageSize = req.files.profileimage.size;
  }
  else {
    var profileImageName = 'noimage.png';
  }
//  Form Validation

  req.checkBody('name', 'Name Field is required').notEmpty();
  req.checkBody('email', 'Email Field is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username Field is required').notEmpty();
  req.checkBody('password', 'Password Field is required').notEmpty();
  req.checkBody('confirm', 'Password do not match').equals(req.body.password);

  // Check For errors
  var errors = req.validationErrors();
  if(errors){
    res.render('register', {
      errors: errors,
      name:name,
      email:email,
      username:username,
      password:password,
      confirm:confirm

    });
  }else{
    var newUser = new User({
      name:name,
      email:email,
      username:username,
      password:password,
      profileimage:profileImageName

    });

// call the built-in save method to save to the database
    newUser.save(function(err) {
      if (err) throw err;

      console.log('User saved successfully!');
    });

  //  Success Message

  req.flash('success', 'You are now registered and may log in')

  res.location('/');
  res.redirect('/');
  }

});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new localStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if(err) throw err;
        if(!user){
          console.log("Unknown User");
          return done(null, false, {
            message:"Unknown User"
          })
        }
        if (!user.validPassword(password)) {
          console.log("Incorrect password.", password);
          return done(null, false, { message: 'Incorrect password.' });
        }

        console.log("User Is detected");
        return done(null, user, {
          message:"User Is detected"

        })

      });
    }
));

// passport.use(new LocalStrategy(
//     function(username, password, done) {
//       User.findOne({ username: username }, function (err, user) {
//         if(err) throw err;
//         if(!user){
//           console.log("Unknown User");
//           return done(null, false, {
//             message:"Unknown User"
//           })
//         }
//       }
//     }
// ));

// router.post('/login',
//     passport.authenticate('local', { successRedirect: '/',
//     failureRedirect: '/users/login',
//     failureFlash: true,
//     successFlash: 'Welcome!'}),
//     function(req, res) {
//       console.log("Authentication was successful.", req.body);
//       req.flash('success', 'You are logged in');
//       // If this function gets called, authentication was successful.
//       // `req.user` contains the authenticated user.
//       res.redirect('/');
//
//     });


router.post('/login',
    passport.authenticate('local', {
      failureRedirect: '/users/login',
      failureFlash: true
    }),
    function(req, res) {
      // This should show up in your logs:
      console.log('Welcome ' + req.body.username);

      // You can also use a flash to consume after redirect:
      // (provided that you use connect-flash in your app)
      req.flash('info', 'Welcome ' + req.body.username);

      res.redirect('/');
    })


router.get('/logout',function (req, res, next) {
  req.logOut();
  req.flash('success', 'You have logged out');
  res.redirect('/users/login');
});

module.exports = router;
