import express from 'express';
import { CollectionsNames, getCollection } from '../dataBaseConfig.js';

const router = express.Router();

function queryRequired(req, res, next) {
  const searchTerm = req.query.query;
  if (!searchTerm) {
    res.json({ msg: "Query is required." })
  } else {
    next()
  }  
}

router.use(queryRequired);

router.get('/movie', (req, res, next) => {
  const searchTerm = req.query.query;
  const movies = getCollection(CollectionsNames.MOVIES);
  const results = movies.filter((movie) => {
    let found = movie.overview.includes(searchTerm) || movie.title.includes(searchTerm);
    return found;
  })
  res.json({results})
})

router.get('/person', (req, res, next) => {
  const searchTerm = req.query.query;
  const people = getCollection(CollectionsNames.PEOPLE);
  const results = people.filter((person) => {
    let found = person.name.includes(searchTerm);
    return found;
  })
  res.json({results})
})

export default router;
