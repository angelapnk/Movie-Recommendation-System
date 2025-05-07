# Setup Guide for Movie Recommendation System

This guide will help you set up the Movie Recommendation System in your local environment, including fixing the TMDB API unauthorized error.

## Prerequisites

- Node.js (v16.x or higher)
- npm (v7.x or higher)
- Git

## Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/angelapnk/Movie-Recommendation-System.git
cd Movie-Recommendation-System
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up the TMDB API key**

Create a `.env` file in the root directory of the project with the following content:

```
TMDB_API_KEY=39bb30f29fefdbf47ff9acb9e30bbeab
SESSION_SECRET=your_session_secret_here
```

> **Important**: The TMDB API key provided is for demonstration purposes. For production use, you should register for your own API key at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).

4. **Make sure dotenv is installed**

```bash
npm install dotenv
```

5. **Start the application**

```bash
npm run dev
```

The application should now be running at [http://localhost:5000](http://localhost:5000).

## Troubleshooting TMDB API Unauthorized Error

If you encounter a "TMDB API unauthorized" error, follow these steps:

1. Ensure the `.env` file exists in the root directory with the correct TMDB API key.
2. Check that `dotenv` is installed and properly imported in `server/index.ts`:

```typescript
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();
```

3. Verify that `routes.ts` is accessing the API key from environment variables:

```typescript
const TMDB_API_KEY = process.env.TMDB_API_KEY || "";
```

4. Restart the server after making any changes.

## Running in VirtualBox

When running in VirtualBox:

1. Make sure port forwarding is set up if you're accessing the application from the host machine.
2. Check your network configuration if you can't access the application.
3. If you're using NAT networking in VirtualBox, set port forwarding rules to expose port 5000.

## Common Issues

- **Error: listen EADDRINUSE: address already in use 0.0.0.0:5000**: This means the port 5000 is already in use. You can kill the process using that port or modify the port number in the application.

- **TMDB API unauthorized error**: This is typically caused by an invalid or missing API key. Follow the troubleshooting steps above.

- **Cannot find module 'dotenv'**: Run `npm install dotenv` to install the missing package.

## Development Workflow

For development, refer to the branch structure:

- `main`: Production-ready code
- `development`: Feature integration
- `feature/watchlist`: Feature-specific branch

Always create new feature branches from `development`, not `main`.