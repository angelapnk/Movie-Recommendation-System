# GitHub Setup Guide

This document provides instructions for setting up this project with GitHub, including repository structure, branching strategy, and workflow guidelines.

## Repository Structure

The MovieMatchMaker project uses the following branch structure:

- `main`: Production-ready code
- `development`: Integration branch for features
- Feature branches (e.g., `feature/watchlist`, `feature/search`)

## Branching Strategy

We follow a simplified Git Flow workflow:

1. Feature branches are created from `development`
2. When a feature is complete, it is merged into `development` via pull request
3. When `development` is stable, it is merged into `main` for release

## Setting Up Your Local Repository

1. Clone the repository:
   ```bash
   git clone https://github.com/angelapnk/Movie-Recommendation-System.git
   cd Movie-Recommendation-System
   ```

2. Set up the remote:
   ```bash
   git remote add origin https://github.com/angelapnk/Movie-Recommendation-System.git
   ```

3. Create the branch structure:
   ```bash
   # Ensure you're on main
   git checkout -b main
   
   # Create development branch
   git checkout -b development
   
   # Push branches to remote
   git push -u origin main
   git push -u origin development
   ```

## Working on Features

1. Create a feature branch from development:
   ```bash
   git checkout development
   git pull
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

3. Push your feature branch:
   ```bash
   git push -u origin feature/your-feature-name
   ```

4. Create a pull request to merge your feature into development.

## Pull Request Guidelines

When creating a pull request, please follow these guidelines:

1. Provide a clear, descriptive title
2. Include a description of the changes made
3. Reference any relevant issues
4. Ensure all tests pass
5. Request a code review from at least one team member

## GitHub Actions (Future Implementation)

In the future, the repository will include GitHub Actions for:

- Running tests on pull requests
- Building and deploying the application
- Code quality checks

## Issue Guidelines

When creating issues, please use the following templates:

### Bug Report Template
```
## Description
Describe the bug

## Steps to Reproduce
1. Step 1
2. Step 2

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser:
- Operating System:
```

### Feature Request Template
```
## Description
Describe the feature

## Motivation
Why this feature is needed

## Proposed Implementation
If you have ideas on how to implement
```