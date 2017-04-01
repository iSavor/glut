function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('login');
	}
}

module.exports = function(app, passport) {
	app.get('/', isAuthenticated, function (req, res) {
		res.render('main.ejs', {
			user: req.user
		});
	});
	
	app.get('/login', function (req, res) {
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});
	
	app.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));
	
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
	
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});
};