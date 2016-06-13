var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	// we're connected!
	console.log("we're connected!")
});


// User Schema

var UserSchema = mongoose.Schema({
	username:{
		type:String,
		index:true
	},
	password:{
		type:String
	},
	email:{
		type:String
	},
	name:{
		type:String
	},
	profileimage:{
		type:String
	}

});
UserSchema.methods.validPassword = function( pwd ) {
	// EXAMPLE CODE!
	return ( this.password === pwd );
};


var User = mongoose.model('User', UserSchema);
module.exports = User;
