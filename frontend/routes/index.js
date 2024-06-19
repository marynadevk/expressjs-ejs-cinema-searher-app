import express from 'express';
import request from 'request';

const router = express.Router();

const nowPlayingUrl = `${process.env.API_BASE_URL}/most_popular?api_key=${process.env.API_KEY}`;
const imageBaseUrl = process.env.IMAGE_BASE_URL;

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

router.get('/', (req, res, next) => {
  request.get(nowPlayingUrl, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    res.render('index', { parsedData: parsedData.results });
  })
});

router.get('/movie/:id', (req, res, next) => {
  const movieId = req.params.id;
  const thisMovieUrl = `${process.env.API_BASE_URL}/movie/${movieId}?api_key=${process.env.API_KEY}`

  request.get(thisMovieUrl, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData)
    
    res.render('single-movie',{
      parsedData
    })
  })
});

  router.post('/search', (req, res, next) => {
    const cat = req.body.cat;

    request.get(movieUrl, (error, response, movieData) => {
      let parsedData = JSON.parse(movieData);

      if (cat === "person") {
        parsedData.results = parsedData.results[0].known_for;
      }

      res.render('index', {
        parsedData: parsedData.results
      })
    })
  })

export default router;
