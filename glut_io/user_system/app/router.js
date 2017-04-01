function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('login');
	}
}

module.exports = function(app, passport) {
	app.get('/', function (req, res) {
		res.render('main.ejs');
	});
	
	app.get('/login', function (req, res) {
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});
	
	app.get('/signup', function (req, res) {
		res.render('signup.ejs', {
			message: req.flash('signupMessage')
		});
	});
	
	app.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));
};