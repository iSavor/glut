var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var hbs = require('express-handlebars');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url);
var db = mongoose.connection;
db.on('error', function() {});
db.once('open', function() {});

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

require('./config/passport')(passport);

app.set('view engine', 'ejs');


app.use(session({
	secret: 'crazy_omg_what_i_have_done'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/router.js')(app, passport);

app.listen(port);
console.log('Server has started on port ' + port);
