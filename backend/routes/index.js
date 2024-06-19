var express = require('express');
var router = express.Router();

const movies = require('../data/movies');

router.get('/', function(req, res, next) {

});

router.get('/most_popular', (req, res, next) => {
  let page = req.query.page;
  if (page === undefined) {
    page = 1;
  }
  let results = movies.filter(movie => movie.most_popular);
  const indexToStart = (page - 1) * 20;

  results = results.slice(indexToStart, indexToStart + 19);
  res.json({ page, results });
})

module.exports = router;
