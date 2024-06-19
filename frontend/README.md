# Movie Searcher Frontend

This is the frontend part of the Movie Searcher application. It's built with Express.js and EJS for server-side rendering.

## Installation and running the Project

To run the project, use the following command:

```bash
#install dependencies
$ npm install

#start app
$ npm start

#monitor any changes
$ nodemon
```

## Environment Variables

The application uses the following environment variables:

- The port on which the Express.js server runs.

`PORT`: `3000`.
- The base URL for the Movie Database API.

`API_BASE_URL`: `http://api.themoviedb.org/3`.
- The base URL for movie images.

`IMAGE_BASE_URL`: `http://image.tmdb.org/t/p/w185`.

These variables are stored in a `.env` file at the root of the project. Make sure to create your own `.env` file and set these variables before running the project.

If you want to use the server from the `backend` directory, set `API_BASE_URL` to the instance where the backend is running.