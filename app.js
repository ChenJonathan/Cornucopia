var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./app_api/models/db');

var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/', routes);
app.use('/api', routesApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

/*add data test

 describe('Post recipe', function() {
     it('should return success after adding new recipe', function(done) {
         var request = require('supertest');
         var recipe = {
             "ingredients" : [
                 {
                     "flour" : "2 cups",
                     "sugar" : "1 cup",
                     "butter" : "1 stick",
                     "eggs" : "four"
                 },
             ],
             "name" : "Manhattan Cake",
             "author" : "John",
             "instructions" : [
                 {
                     "prep" : "stuff",
                     "cooking" : "cook",
                     "serve" : "lightly incinerated"
                  },
             ],
             "name" : "Chen",
             "rating" : 1
         };

         request(url)
            .post('/api/recipe')

             .end(function(err, res) {
                 if (err) {
                     throw err;
                 }
                 res.should.have.property(‘status’, 201);
                 done();
             });
     });
 }); */