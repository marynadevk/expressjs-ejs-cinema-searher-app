import 'dotenv/config';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import helmet from 'helmet';
import indexRouter from './routes/index.js';
import movieRouter from './routes/movie.js';
import searchRouter from './routes/search.js';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { connectToDb, fillDatabase } from './dataBaseConfig.js';

const app = express();
app.use(helmet());

app.use((req, res, next) => {
  if (req.query.api_key !== process.env.API_KEY) {
    res.status(StatusCodes.UNAUTHORIZED);
    res.json("Invalid API Key");
  } else {
    next();
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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

const connectToDataBase = async () => {
  try {
  await connectToDb();
  await fillDatabase();
} catch(err) {
  console.log('Error on filling database: ', err);
}
};
connectToDataBase();

export default app;
