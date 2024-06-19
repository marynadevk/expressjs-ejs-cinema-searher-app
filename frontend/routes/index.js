var express = require('express');
var router = express.Router();
const request = require('request');

const apiKey = '1fb720b97cc13e580c2c35e1138f90f8';
const apiBaseUrl = process.env.API_BASE_URL;
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = process.env.IMAGE_BASE_URL;

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

router.get('/', function(req, res, next) {
  request.get(nowPlayingUrl, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    res.render('index', { parsedData: parsedData.results });
  })
});

router.get('/movie/:id',(req, res, next)=>{
  const movieId = req.params.id;
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`
  console.log(thisMovieUrl);
  request.get(thisMovieUrl,(error, response, movieData)=>{
    console.log(typeof(movieData))
    const parsedData = JSON.parse(movieData)
    res.render('single-movie',{
      parsedData
    })
  })
});

  router.post('/search',(req, res, next)=>{
    const userSearchTerm = encodeURI(req.body.movieSearch);
    const cat = req.body.cat;
    const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`

    request.get(movieUrl,(error, response, movieData)=>{
      let parsedData = JSON.parse(movieData);

      if (cat === "person") {
        parsedData.results = parsedData.results[0].known_for;
      }

      res.render('index', {
        parsedData: parsedData.results
      })
    })
  })


module.exports = router;
