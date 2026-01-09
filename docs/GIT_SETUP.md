# MedAura AI - Git Repository Setup Guide

This guide will help you initialize a Git repository and push your project to GitHub.

## Prerequisites

- Git installed on your system
- GitHub account
- SSH key configured OR GitHub Personal Access Token

## Quick Setup (Copy & Paste)

### 1. Initialize Git Repository

```bash
# Navigate to your project directory
cd path/to/AI-Agents-for-Medical-Diagnostics-main

# Initialize git (if not already initialized)
git init

# Verify .gitignore is properly configured
cat .gitignore
```

### 2. Stage All Files

```bash
# Stage all files for commit
git add .

# Verify what will be committed (check no sensitive files are included)
git status
```

### 3. Make Initial Commit

```bash
# Create initial commit with a professional message
git commit -m "Initial commit: Production-ready MedAura AI

- Multi-agent medical diagnostics system
- React frontend with ER Co-Pilot and MDT Review
- FastAPI backend with LangChain + Google Gemini
- Docker deployment configuration
- CI/CD workflows for GitHub Actions
- Comprehensive documentation"
```

### 4. Create GitHub Repository

Option A: **GitHub CLI (Recommended)**
```bash
# Install GitHub CLI if not installed: https://cli.github.com/
gh auth login
gh repo create MedAura-AI --public --description "AI-Powered Medical Diagnostics Platform with Multi-Agent System"
```

Option B: **Web Interface**
1. Go to https://github.com/new
2. Repository name: `MedAura-AI`
3. Description: `AI-Powered Medical Diagnostics Platform with Multi-Agent System`
4. Choose Public or Private
5. Do NOT initialize with README (you already have one)
6. Click "Create repository"

### 5. Connect and Push

```bash
# Add remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/MedAura-AI.git

# Or use SSH
git remote add origin git@github.com:YOUR_USERNAME/MedAura-AI.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, no code change
- `refactor`: Code restructuring
- `perf`: Performance improvement
- `chore`: Maintenance tasks

### Examples:

```bash
# Feature
git commit -m "feat(agents): add Oncologist specialist agent"

# Bug fix
git commit -m "fix(api): resolve case status not updating after completion"

# Documentation
git commit -m "docs: update API endpoint documentation"

# Refactoring
git commit -m "refactor(frontend): split ERCopilotPage into smaller components"
```

## Branch Strategy

```bash
# Create a feature branch
git checkout -b feature/new-agent

# Make changes and commit
git add .
git commit -m "feat: add new specialist agent"

# Push feature branch
git push -u origin feature/new-agent

# After PR is merged, update main
git checkout main
git pull origin main
```

## Common Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline -10

# View changes
git diff

# Undo staged changes
git reset HEAD <file>

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Update from remote
git pull origin main

# Stash changes temporarily
git stash
git stash pop
```

## Troubleshooting

### Sensitive Files Accidentally Committed

If you accidentally committed a sensitive file:

```bash
# Remove file from Git history (after ensuring it's in .gitignore)
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch apikey.env' \
  --prune-empty --tag-name-filter cat -- --all

# Force push (coordinate with team first!)
git push origin main --force
```

### Authentication Issues

**HTTPS**: Use a Personal Access Token instead of password
```bash
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/MedAura-AI.git
```

**SSH**: Ensure your SSH key is added to GitHub
```bash
ssh -T git@github.com  # Test connection
```

## Post-Push Checklist

- [ ] GitHub Actions workflows are running
- [ ] README displays correctly on GitHub
- [ ] No sensitive files (API keys, .env) were committed
- [ ] Issues and PR templates are visible
- [ ] License is properly displayed
