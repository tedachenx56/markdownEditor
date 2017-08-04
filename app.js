var express = require('express');
var app = express();

//path favicon logger cookieparse bodyparse
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

//设置跨域访问
app.use('/', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');

	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header("X-Powered-By", ' 3.2.1');
	next();
});

//app.all('*', function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "X-Requested-With");
//  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//  res.header("X-Powered-By",' 3.2.1')
//  next();
//});

var index = require('./routes/index');
//body-parse
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing
// true: {name:vlaue} value可以为任何值
// true: {name:vlaue} value可以为只能为String或Array
app.use(cookieParser());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));
// view engine setup
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
//app.set('views','views');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing
// true: {name:vlaue} value可以为任何值
// true: {name:vlaue} value可以为只能为String或Array
app.use(cookieParser());

app.use('/', index);
//app.use('/users', users);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//	var err = new Error('Not Found');
//	err.status = 404;
//	next(err);
//});

// error handler
//app.use(function(err, req, res, next) {
//	// set locals, only providing error in development
//	res.locals.message = err.message;
//	res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//	// render the error page
//	res.status(err.status || 500);
//	res.render('error');
//});

module.exports = app;