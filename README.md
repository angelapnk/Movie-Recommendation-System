# MovieMatchMaker

MovieMatchMaker is a full-stack web application that helps users discover movies through personalized recommendations. The application allows users to browse trending movies, search for specific titles, explore movies by genre, and maintain a personal watchlist.

## Features

- **User Authentication**: Secure login and registration system
- **Movie Discovery**: Browse trending movies and explore by genre
- **Search Functionality**: Find movies by title, actor, or keyword
- **Movie Details**: View comprehensive information about each movie
- **Personalized Watchlist**: Save favorite movies to watch later
- **Recommendations**: Get personalized movie suggestions based on preferences

## Technology Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Query (TanStack Query)
- Wouter (Routing)

### Backend
- Node.js
- Express
- Passport.js (Authentication)
- Drizzle ORM
- Zod (Validation)

### External APIs
- The Movie Database (TMDB) API

## Documentation

Detailed documentation is available in the `/docs` directory:

- [Feature Requirements](docs/requirements/features.md)
- [API Documentation](docs/api.md)
- [Development Guide](docs/setup/development.md)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- TMDB API Key

### Installation

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file with your TMDB API key and session secret
4. Start the development server with `npm run dev`

See the [Development Guide](docs/setup/development.md) for detailed setup instructions.

## Contributing

Contributions are welcome! Please see our [GitHub Setup Guide](GITHUB_SETUP.md) for information on how to contribute to this project.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- This product uses the TMDB API but is not endorsed or certified by TMDB.