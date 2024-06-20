# Movie Searcher Application
This is a full-stack application that allows users to search for movies and view detailed information about them. 

# Frontend

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


# Backend

This is the backend part of the Movie Searcher application. It's built with Express.js, MongoDB and serves data to the frontend.

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

`PORT`: `3030`.
- The port on which the Express.js server runs.

`API_KEY`: 'fill your key'.
- The API key for the Movie Database API.

`DB_NAME`: `movies`.
- The name of the database in MongoDB.

`DB_URL`: 'URL for your MongoDB instance'

These variables are stored in a `.env` file at the root of the project. Make sure to create your own `.env` file and set these variables before running the project.


## API Endpoints

| Route | HTTP Verb | Description |
|-------|-----------|-------------|
| `/most_popular` | `GET` | Returns a list of the most popular movies. |
| `/top_rated` | `GET` | Returns a list of top-rated movies. |
| `/:movieId` | `GET` | Returns the details of a movie. |
| `/:movieId/rating` | `POST` | Submits a rating for a movie. |
| `/:movieId/rating` | `DELETE` | Deletes a rating for a movie. |
| `/movie` | `GET` | Returns a list of movies that match the provided query. |
| `/person` | `GET` | Returns a list of people that match the provided query. |