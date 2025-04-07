# API Documentation

This document provides detailed information about the MovieMatchMaker API endpoints.

## Base URL

All API endpoints are relative to the base URL:

```
/api
```

## Authentication Endpoints

### Register User

Register a new user with username and password.

- **URL**: `/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string" (optional)
  }
  ```
- **Response**: User object with password omitted
  ```json
  {
    "id": 1,
    "username": "string",
    "email": "string" (if provided),
    "watchlist": []
  }
  ```

### Login

Authenticate and create a user session.

- **URL**: `/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**: User object with password omitted
  ```json
  {
    "id": 1,
    "username": "string",
    "email": "string",
    "watchlist": []
  }
  ```

### Logout

End the current user session.

- **URL**: `/logout`
- **Method**: `POST`
- **Response**: Status code 200 on success

### Get Current User

Get the currently logged in user's information.

- **URL**: `/user`
- **Method**: `GET`
- **Response**: User object or 401 if not authenticated
  ```json
  {
    "id": 1,
    "username": "string",
    "email": "string",
    "watchlist": []
  }
  ```

## Movie Endpoints

### Get Trending Movies

Get a list of currently trending movies.

- **URL**: `/movies/trending`
- **Method**: `GET`
- **Query Parameters**:
  - `page` (optional): Page number for pagination
- **Response**: Array of movie objects
  ```json
  [
    {
      "id": 12345,
      "title": "Movie Title",
      "posterPath": "/path/to/poster.jpg",
      "backdropPath": "/path/to/backdrop.jpg",
      "overview": "Movie description...",
      "releaseDate": "2023-01-01",
      "voteAverage": 8.5,
      "voteCount": 1000,
      "genreIds": [28, 12]
    }
  ]
  ```

### Get Movie Details

Get detailed information about a specific movie.

- **URL**: `/movies/:id`
- **Method**: `GET`
- **Response**: Detailed movie object
  ```json
  {
    "id": 12345,
    "title": "Movie Title",
    "posterPath": "/path/to/poster.jpg",
    "backdropPath": "/path/to/backdrop.jpg",
    "overview": "Movie description...",
    "releaseDate": "2023-01-01",
    "voteAverage": 8.5,
    "voteCount": 1000,
    "genres": [
      {"id": 28, "name": "Action"},
      {"id": 12, "name": "Adventure"}
    ],
    "runtime": 120,
    "status": "Released",
    "tagline": "Movie tagline...",
    "budget": 100000000,
    "revenue": 300000000
  }
  ```

### Get Similar Movies

Get a list of similar movies to a specific movie.

- **URL**: `/movies/:id/similar`
- **Method**: `GET`
- **Response**: Array of movie objects
  ```json
  [
    {
      "id": 12345,
      "title": "Movie Title",
      "posterPath": "/path/to/poster.jpg",
      // ... other movie properties
    }
  ]
  ```

### Search Movies

Search for movies based on a keyword.

- **URL**: `/search/movie`
- **Method**: `GET`
- **Query Parameters**:
  - `query` (required): Search term
  - `page` (optional): Page number for pagination
- **Response**: Array of movie objects
  ```json
  [
    {
      "id": 12345,
      "title": "Movie Title",
      "posterPath": "/path/to/poster.jpg",
      // ... other movie properties
    }
  ]
  ```

## Genre Endpoints

### Get All Genres

Get a list of all movie genres.

- **URL**: `/genres`
- **Method**: `GET`
- **Response**: Array of genre objects
  ```json
  [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    }
  ]
  ```

### Get Movies by Genre

Get a list of movies in a specific genre.

- **URL**: `/genres/:id/movies`
- **Method**: `GET`
- **Query Parameters**:
  - `page` (optional): Page number for pagination
- **Response**: Array of movie objects
  ```json
  [
    {
      "id": 12345,
      "title": "Movie Title",
      "posterPath": "/path/to/poster.jpg",
      // ... other movie properties
    }
  ]
  ```

## User Specific Endpoints

### Update User Watchlist

Update the current user's watchlist by adding or removing a movie.

- **URL**: `/user/watchlist`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "movieIds": [12345, 67890]
  }
  ```
- **Response**: Updated user object
  ```json
  {
    "id": 1,
    "username": "string",
    "email": "string",
    "watchlist": [12345, 67890]
  }
  ```

### Get Recommendations

Get personalized movie recommendations based on user preferences.

- **URL**: `/recommendations`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "genres": [28, 12],
    "yearStart": 2000,
    "yearEnd": 2023,
    "minRating": 7.0
  }
  ```
- **Response**: Array of recommended movie objects
  ```json
  [
    {
      "id": 12345,
      "title": "Movie Title",
      "posterPath": "/path/to/poster.jpg",
      // ... other movie properties
    }
  ]
  ```