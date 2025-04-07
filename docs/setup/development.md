# Development Guide

This guide provides instructions for setting up the development environment for MovieMatchMaker.

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/angelapnk/Movie-Recommendation-System.git
   cd Movie-Recommendation-System
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   TMDB_API_KEY=your_tmdb_api_key_here
   SESSION_SECRET=your_session_secret_here
   ```

   You can obtain a TMDB API key by registering at [The Movie Database](https://www.themoviedb.org/settings/api).

4. Start the development server:
   ```bash
   npm run dev
   ```

   This will start both the frontend and backend servers. The application will be available at http://localhost:5000.

## Project Structure

- `/client` - Frontend React application
  - `/src` - Source code
    - `/components` - Reusable UI components
    - `/hooks` - Custom React hooks
    - `/lib` - Utility functions and libraries
    - `/pages` - Page components
- `/server` - Backend Node.js/Express server
  - Contains API routes and server logic
- `/shared` - Shared types and schemas used by both frontend and backend

## Development Workflow

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

3. Push your branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a pull request to merge your changes into the `development` branch.

## Testing

Currently, the project does not have automated tests. Manual testing should be performed for all changes.

## Linting and Formatting

The project uses TypeScript's built-in typechecking. Make sure to fix any type errors before committing code.

## Building for Production

To build the application for production:

```bash
npm run build
```

This will create optimized production builds for both the frontend and backend.
# Development Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- Git

## Initial Setup

1. Clone the repository:
   ```
   git clone https://github.com/angelapnk/Movie-Recommendation-System.git
   cd Movie-Recommendation-System
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env
   ```
   Edit `.env` and add your TMDB API key

4. Start the development server:
   ```
   npm run dev
   ```

## Development Workflow

1. Create a feature branch following our Git workflow guidelines
2. Make your changes to the code
3. Run tests: `npm test`
4. Run linting: `npm run lint`
5. Submit a pull request

## Project Structure

- `client/`: Frontend code (React)
- `server/`: Backend code (Express)
- `shared/`: Shared code and types
- `docs/`: Documentation
# Development Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- Git

## Initial Setup

1. Clone the repository:
   ```
   git clone https://github.com/angelapnk/Movie-Recommendation-System.git
   cd Movie-Recommendation-System
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env
   ```
   Edit `.env` and add your TMDB API key

4. Start the development server:
   ```
   npm run dev
   ```

## Development Workflow

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

3. Push your branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a pull request to merge your changes into the `development` branch.

## Testing

To run tests:
```bash
npm test
```

## Building for Production

To build the application for production:

```bash
npm run build
```

This will create optimized production builds for both the frontend and backend.
