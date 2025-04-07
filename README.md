# MovieMatchMaker

A comprehensive movie recommendation website featuring trending movies, search functionality, categorization, and personalized recommendations. This platform is designed to help users discover movies through various browsing options and maintain watchlists.

![Screenshot 2025-04-07 162304](https://github.com/user-attachments/assets/58a39356-56b3-4fc5-9eee-7917df9a052c)

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
