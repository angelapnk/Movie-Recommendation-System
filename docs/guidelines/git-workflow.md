
# Git Workflow

This project follows the Gitflow workflow model:

## Branches
- `main` - Production-ready code
- `development` - Integration branch for features
- `feature/*` - Individual feature branches
- `hotfix/*` - Emergency fixes for production

## Workflow

### Feature Development
1. Create a feature branch from development:
   ```
   git checkout development
   git pull
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```
   git add .
   git commit -m "Description of your changes"
   ```

3. Push your feature branch:
   ```
   git push -u origin feature/your-feature-name
   ```

4. Create a pull request to merge your feature into development.

### Production Releases
1. When development is ready for release:
   ```
   git checkout main
   git merge development
   git push
   ```

### Hotfixes
1. Create a hotfix branch from main:
   ```
   git checkout main
   git checkout -b hotfix/issue-description
   ```

2. Fix the issue, commit, and push:
   ```
   git add .
   git commit -m "Fix: description"
   git push -u origin hotfix/issue-description
   ```

3. Create PRs to merge into both main and development.
