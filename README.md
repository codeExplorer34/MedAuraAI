# MedAura AI - Medical Diagnostics Multi-Agent System

<div align="center">

![MedAura AI](https://img.shields.io/badge/MedAura-AI-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.9+-blue?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/React-18.3.0-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688?style=for-the-badge&logo=fastapi)

**AI-Powered Medical Diagnostics Platform with Multi-Disciplinary Team Collaboration**

[Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

---

## 📋 Overview

MedAura AI is an advanced medical diagnostics platform that leverages artificial intelligence to provide comprehensive patient analysis through a multi-agent system. The platform simulates a multidisciplinary medical team (Internist, Neurologist, Cardiologist, Gastroenterologist, and Psychiatrist) working collaboratively to analyze patient cases and provide evidence-based treatment recommendations.

### 🎯 Key Features

- **Multi-Agent AI System**: Five specialized medical AI agents working collaboratively
- **ER Co-Pilot**: Emergency room clinical decision support tool
- **MDT Review Dashboard**: Multidisciplinary team case review interface
- **PDF Report Parsing**: Automatic extraction of medical data from PDF reports
- **Treatment Recommendations**: AI-generated personalized treatment plans with success rates
- **Real-time Case Tracking**: Monitor diagnostic progress through intuitive dashboards
- **Docker Deployment**: Fully containerized for easy deployment
- **RESTful API**: Comprehensive FastAPI backend with full CORS support

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Landing    │  │  ER Co-Pilot │  │  MDT Review  │     │
│  │     Page     │  │     Page     │  │     Page     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ HTTP/REST API
                             │
┌────────────────────────────┴────────────────────────────────┐
│                    Backend (FastAPI)                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              API Server (api_server.py)              │  │
│  │  • Case Management  • PDF Parsing  • CORS Middleware │  │
│  └────────────────────┬─────────────────────────────────┘  │
│                       │                                      │
│  ┌────────────────────┴─────────────────────────────────┐  │
│  │         Multi-Agent Diagnostic System                 │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐ │  │
│  │  │Internist │ │Neurologist│ │Cardiologi│ │Gastro-  │ │  │
│  │  │          │ │           │ │   st     │ │enterolog│ │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └─────────┘ │  │
│  │  ┌──────────┐ ┌──────────────────────────────────┐  │  │
│  │  │Psychiatri│ │  Multidisciplinary Team Agent    │  │  │
│  │  │   st     │ │  (Synthesis & Recommendations)   │  │  │
│  │  └──────────┘ └──────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ LangChain + Google Gemini API
                             │
                      ┌──────┴──────┐
                      │  Gemini AI  │
                      └─────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.9+**
- **Node.js 16+** and npm
- **Docker & Docker Compose** (for containerized deployment)
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

### Option 1: Docker Deployment (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/MedAura-AI.git
   cd MedAura-AI
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your Google Gemini API key
   ```

3. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Option 2: Local Development

#### Backend Setup

```bash
# Navigate to project root
cd MedAura-AI

# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example apikey.env
# Edit apikey.env and add your Google Gemini API key

# Start the FastAPI server
python api_server.py
```

The backend will be available at `http://localhost:8000`

#### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## 📖 Documentation

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API health check |
| `POST` | `/api/cases` | Create new medical case |
| `GET` | `/api/cases` | List all cases (optional status filter) |
| `GET` | `/api/cases/{id}` | Get specific case details |
| `POST` | `/api/cases/{id}/rerun` | Rerun AI agents for a case |
| `POST` | `/api/cases/parse-report` | Parse PDF medical report |

For detailed API documentation, visit http://localhost:8000/docs when running the server.

### Environment Variables

Create a `.env` or `apikey.env` file with the following variables:

```env
# Required: Google Gemini API Key
GOOGLE_API_KEY=your_google_gemini_api_key_here

# Optional: Agent-specific API keys (falls back to GOOGLE_API_KEY)
INTERNIST_API_KEY=
NEUROLOGIST_API_KEY=
CARDIOLOGIST_API_KEY=
GASTROENTEROLOGIST_API_KEY=
PSYCHIATRIST_API_KEY=
MULTIDISCIPLINARYTEAM_API_KEY=

# Optional: Server configuration
BACKEND_PORT=8000
FRONTEND_PORT=5173
```

### Medical Agents

The system includes five specialized medical agents:

1. **Internist**: General internal medicine and systemic conditions
2. **Neurologist**: Neurological conditions and mental health
3. **Cardiologist**: Cardiovascular system and heart-related issues
4. **Gastroenterologist**: Digestive system and gastrointestinal conditions
5. **Psychiatrist**: Mental health and psychiatric conditions

These agents work in parallel, then their findings are synthesized by the **Multidisciplinary Team Agent** to produce:
- Final diagnosis
- Confidence scores
- Treatment recommendations with success rates
- Personalized notes and procedure steps

---

## 🎨 Frontend Features

### Landing Page
- Modern, responsive design with Apple-inspired aesthetics
- Feature showcase and value propositions
- Interactive animations and smooth transitions

### ER Co-Pilot
- Quick case intake wizard
- Template-based data entry
- Real-time form validation
- Clinical decision support

### MDT Review Dashboard
- Case timeline visualization
- Specialist perspectives display
- Treatment options comparison table
- Clinical governance compliance footer

---

## 🐳 Deployment

### Production Deployment with Docker

```bash
# Build production images
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

# Start in production mode
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Environment-Specific Configurations

- **Development**: `docker-compose.yml`
- **Production**: `docker-compose.prod.yml` (optimized builds, health checks)

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

---

## 🛠️ Development

### Project Structure

```
MedAura-AI/
├── api_server.py          # FastAPI backend server
├── Main.py                # Standalone diagnostic script
├── Utils/
│   └── Agents.py          # AI agent implementations
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── api/          # API client
│   │   └── App.jsx       # Main app component
│   └── package.json
├── Medical Reports/       # Sample medical reports
├── cases_data/           # Stored case JSON files
├── Results/              # Diagnostic results
├── docker-compose.yml    # Docker orchestration
├── Dockerfile            # Backend Docker image
└── requirements.txt      # Python dependencies
```

### Running Linters

**Backend (Python)**
```bash
# Install dev dependencies
pip install flake8 black isort

# Run linters
flake8 api_server.py Main.py Utils/
black --check .
isort --check .
```

**Frontend (JavaScript)**
```bash
cd frontend
npm run lint
```

### Code Style

- **Python**: Follow PEP 8, use Black for formatting
- **JavaScript**: ESLint with React configuration
- **Commits**: Follow [Conventional Commits](https://www.conventionalcommits.org/)

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on:

- Code of Conduct
- Development setup
- Pull request process
- Coding standards

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔒 Security

For security concerns or vulnerability reports, please see [SECURITY.md](SECURITY.md).

---

## 🙏 Acknowledgments

- **LangChain** for the AI agent framework
- **Google Gemini** for the generative AI capabilities
- **FastAPI** for the high-performance backend
- **React** and **Vite** for the modern frontend stack

---

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/MedAura-AI/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/MedAura-AI/discussions)

---

<div align="center">

**⚠️ Disclaimer**: This is a demonstration project for educational purposes. It should not be used for actual medical diagnosis or treatment decisions. Always consult qualified healthcare professionals for medical advice.

Made with ❤️ by the MedAura AI Team

</div>
