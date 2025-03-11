
# Deployment Guide

This guide explains how to deploy the MovieMatchMaker application.

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- A hosting platform (Replit, Vercel, etc.)

## Deploying on Replit

1. Make sure your project is properly committed to GitHub
2. In Replit, click on the "Deploy" tab in the left sidebar
3. Configure your deployment settings:
   - Build command: `npm run build`
   - Run command: `npm start`
4. Click "Deploy" to publish your application

## Environment Variables

Ensure the following environment variables are set in your production environment:

- `TMDB_API_KEY`: Your TMDB API key
- `SESSION_SECRET`: A secure random string for session encryption

## Post-Deployment Verification

After deploying, verify that:

1. The application loads correctly
2. API calls to TMDB are working
3. User authentication functions properly
4. The movie recommendations are displayed
