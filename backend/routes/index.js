import express from 'express';
import { getCollection, CollectionsNames } from '../dataBaseConfig.js';

const router = express.Router();

router.get('/most_popular', (req, res, next) => {
  let page = req.query.page;
  if (page === undefined) {
    page = 1;
  }

  const movies = getCollection(CollectionsNames.MOVIES)
  let results = movies.filter(movie => movie.most_popular);
  const indexToStart = (page - 1) * 20;

  results = results.slice(indexToStart, indexToStart + 19);
  res.json({ page, results });
})

export default router;
