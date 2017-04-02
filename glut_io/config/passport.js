var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function(passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});
	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
	
	passport.use('signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, function (req, username, password, done) {
		process.nextTick(function () {
			User.findOne({'local.username': username}, function (err, user) {
				if (err) {
					return done(err);
				}
				if (user) {
					return done(null, false, req.flash("signupMessage", "That email is already registered."));
				} else {
					var newUser = new User();
					newUser.local.username = username;
					// Notice: we use this special action to grab the nickname
					// Nickname is allowed to be duplicated, thus it should be fine
					newUser.local.nickname = req.body.nickname;
					newUser.local.password = newUser.generateHash(password);
					
					newUser.save(function (err, newUser) {
						if (err) throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));
	
	passport.use('login', new LocalStrategy({
			usernameField: 'username',
			passwordField: 'password',
			passReqToCallback: true
		}, function (req, username, password, done) {
//			process.nextTick(function () {
				User.findOne({'local.username': username}, function (err, user) {
					if (err) {
						return done(err);
					}
					if (!user || !user.validPassword(password)) {
						return done(null, false, req.flash("loginMessage", "Incorrect email or password."));
					} else {
						return done(null, user);
					}
				});
//			});
		}));
};