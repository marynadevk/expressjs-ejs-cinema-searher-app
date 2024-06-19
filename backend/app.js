var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
require('dotenv').config();
const StatusCodes = require('http-status-codes').StatusCodes;

var indexRouter = require('./routes/index');
const movieRouter = require('./routes/movie');
const searchRouter = require('./routes/search');

var app = express();
app.use(helmet());

app.use((req, res, next) => {
  if (req.query.api_key !== process.env.API_KEY) {
    res.status(StatusCodes.UNAUTHORIZED);
    res.json("Invalid API Key");
  } else {
    next();
  }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/movie', movieRouter);
app.use('/search', searchRouter);


app.use(function(req, res, next) {
  next(createError(StatusCodes.NOT_FOUND));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR);
  res.render('error');
});

module.exports = app;
