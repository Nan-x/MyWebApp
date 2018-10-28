var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const jobs = require("./routes/jobs");
const users = require("./routes/users");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/jobs', jobs.findAll);
app.get('/jobs/:id', jobs.findOne);

app.get('/users', users.findAll);

//app.get('/jobs/jobOffers', jobs.findTotalJobOffers);


app.post('/jobs', jobs.addJob);
app.post('/users', users.addUser);

app.put('/jobs/:id/jobOffers', jobs.incrementJobOffers);

app.delete('/users/:id', users.deleteUser);

app.delete('/jobs/:id', jobs.deleteJob);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
