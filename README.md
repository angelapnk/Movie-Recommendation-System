# MovieMatchMaker

A comprehensive movie recommendation website featuring trending movies, search functionality, categorization, and personalized recommendations. This platform is designed to help users discover movies through various browsing options and maintain watchlists.

## 🚀 Live Demo

[![Live Demo](https://img.shields.io/badge/View%20Website-Click%20Here-blue?style=for-the-badge&logo=render)](https://movie-recommendation-system-99ve.onrender.com)

Check out the live version of this project hosted on Render!

## Features

- User authentication (register, login, logout)
- Trending movies display
- Search functionality
- Movie categorization by genre
- Personalized movie recommendations
- User watchlists
- Detailed movie information

## Technologies Used

- **Frontend**: React.js, TailwindCSS, shadcn/ui
- **Backend**: Node.js, Express
- **Authentication**: Passport.js with local strategy
- **State Management**: React Query
- **Routing**: wouter
- **API Integration**: TMDB API


## Setup and Installation

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file with required API keys (see `.env.example`)
4. Start the development server with `npm run dev`

## Environment Variables

- `TMDB_API_KEY` - API key for The Movie Database API

## Project Structure

The project follows a modern React application structure with a Node.js backend:

- `/client` - Frontend React application
- `/server` - Backend Node.js/Express server
- `/shared` - Shared types and schemas

## Contributions

Contributions are welcome! Please feel free to submit a Pull Request.
