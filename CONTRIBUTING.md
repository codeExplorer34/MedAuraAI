# Contributing to MedAura AI

First off, thank you for considering contributing to MedAura AI! It's people like you that make this project a great tool for the community.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (sample medical reports, API requests, etc.)
- **Describe the behavior you observed** and what you expected
- **Include screenshots or logs** if applicable
- **Specify your environment** (OS, Python version, Node version, browser)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful** to most users
- **List any similar features** in other projects if applicable

### Pull Requests

Follow these steps for contributing code:

1. **Fork the repo** and create your branch from `main`
2. **Make your changes** with clear, descriptive commits
3. **Update documentation** if you've changed APIs or added features
4. **Follow the code style** guidelines below
5. **Submit a pull request** with a comprehensive description

## Development Setup

### Prerequisites

- Python 3.9+
- Node.js 16+
- Docker & Docker Compose
- Google Gemini API key

### Setting Up Your Development Environment

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/MedAura-AI.git
cd MedAura-AI

# Backend setup
pip install -r requirements.txt

# Create environment file
cp .env.example apikey.env
# Add your API keys to apikey.env

# Frontend setup
cd frontend
npm install
```

### Running Locally

**Backend:**
```bash
# From project root
python api_server.py
```

**Frontend:**
```bash
# From frontend directory
cd frontend
npm run dev
```

**Docker:**
```bash
# From project root
docker-compose up
```

## Code Style Guidelines

### Python

- Follow [PEP 8](https://pep8.org/) style guide
- Use meaningful variable and function names
- Add docstrings to all functions, classes, and modules
- Keep functions focused and single-purpose
- Maximum line length: 100 characters

**Formatting:**
```bash
# Use Black for auto-formatting
black api_server.py Main.py Utils/

# Use isort for import sorting
isort api_server.py Main.py Utils/

# Run flake8 for linting
flake8 api_server.py Main.py Utils/
```

### JavaScript/React

- Use ES6+ syntax
- Follow React best practices and hooks guidelines
- Use functional components over class components
- Keep components small and focused
- Use meaningful component and variable names

**Formatting:**
```bash
cd frontend
npm run lint
```

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: add new PDF parsing endpoint
fix: resolve case status not updating
docs: update API documentation
style: format code with Black
refactor: restructure agent initialization
perf: optimize multithreading in agent execution
test: add unit tests for case creation
chore: update dependencies
```

## Project Structure

```
MedAura-AI/
├── api_server.py          # FastAPI backend
├── Main.py                # Standalone diagnostic script
├── Utils/
│   └── Agents.py          # AI agent implementations
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── api/          # API client
│   │   └── App.jsx       # Main app
├── Medical Reports/       # Sample reports
├── cases_data/           # Case storage
└── Results/              # Diagnostic outputs
```

## Adding New Features

### Adding a New Medical Agent

1. Add agent class to `Utils/Agents.py`
2. Implement the `run()` method with proper structured output
3. Update `api_server.py` to include the new agent
4. Add corresponding UI components in the frontend if needed
5. Update documentation

### Adding New API Endpoints

1. Add endpoint to `api_server.py`
2. Define Pydantic models for request/response
3. Add proper error handling
4. Document the endpoint
5. Update frontend API client if needed

### Adding Frontend Components

1. Create component in `frontend/src/components/`
2. Follow existing naming conventions
3. Use consistent styling (Apple-inspired theme)
4. Ensure responsive design
5. Add to routing if it's a page component

## Documentation

- Update `README.md` if you change functionality
- Add JSDoc comments for complex JavaScript functions
- Update API documentation for new/changed endpoints
- Include inline comments for complex logic

## Questions?

Feel free to open an issue with the `question` label, or reach out through GitHub Discussions.

## Recognition

Contributors will be recognized in our README.md. Thank you for your contributions!

---

By contributing, you agree that your contributions will be licensed under the MIT License.
