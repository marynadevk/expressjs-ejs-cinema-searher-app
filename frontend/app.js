import 'dotenv/config';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import helmet from 'helmet';
import indexRouter from './routes/index.js';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

const __dirname = path.resolve();

const app = express();

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'ajax.googleapis.com', 'maxcdn.bootstrapcdn.com'],
      imgSrc: ["'self'", 'data:', 'image.tmdb.org'],
    },
  })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(StatusCodes.NOT_FOUND));
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR);
  res.render('error');
});

export default app;
