# MedAura AI - System Architecture

## Overview

MedAura AI is a multi-agent medical diagnostics platform that uses AI to simulate a multidisciplinary medical team. This document describes the system architecture, component interactions, and data flow.

## High-Level Architecture

```mermaid
graph TB
    subgraph "Frontend (React + Vite)"
        LP[Landing Page]
        ER[ER Co-Pilot]
        MDT[MDT Review]
        API_CLIENT[API Client]
    end
    
    subgraph "Backend (FastAPI)"
        API[API Server]
        AGENTS[Agent Manager]
        PDF[PDF Parser]
        STORAGE[Case Storage]
    end
    
    subgraph "AI Agents"
        INT[Internist]
        NEU[Neurologist]
        CAR[Cardiologist]
        GAS[Gastroenterologist]
        PSY[Psychiatrist]
        TEAM[MDT Agent]
    end
    
    subgraph "External Services"
        GEMINI[Google Gemini API]
    end
    
    LP --> API_CLIENT
    ER --> API_CLIENT
    MDT --> API_CLIENT
    API_CLIENT -->|HTTP/REST| API
    
    API --> AGENTS
    API --> PDF
    API --> STORAGE
    
    AGENTS --> INT
    AGENTS --> NEU
    AGENTS --> CAR
    AGENTS --> GAS
    AGENTS --> PSY
    AGENTS --> TEAM
    
    INT -->|LangChain| GEMINI
    NEU -->|LangChain| GEMINI
    CAR -->|LangChain| GEMINI
    GAS -->|LangChain| GEMINI
    PSY -->|LangChain| GEMINI
    TEAM -->|LangChain| GEMINI
```

## Component Details

### Frontend

| Component | Technology | Purpose |
|-----------|------------|---------|
| Landing Page | React | Marketing and product introduction |
| ER Co-Pilot | React | Emergency room case intake and triage |
| MDT Review | React | Multidisciplinary team case review |
| API Client | Fetch API | Backend communication |

### Backend

| Component | Technology | Purpose |
|-----------|------------|---------|
| API Server | FastAPI | RESTful API endpoints |
| Agent Manager | Python | Orchestrates AI agent execution |
| PDF Parser | pdfplumber | Extracts text from medical PDFs |
| Case Storage | JSON Files | Persists case data (filesystem) |

### AI Agents

Each agent is implemented using LangChain with Google Gemini as the LLM:

| Agent | Specialty | Output |
|-------|-----------|--------|
| Internist | General medicine | Initial assessment, systemic review |
| Neurologist | Neurology | Neurological findings, cognitive assessment |
| Cardiologist | Cardiology | Cardiovascular assessment |
| Gastroenterologist | GI | Digestive system assessment |
| Psychiatrist | Mental Health | Psychological assessment |
| MDT Agent | Synthesis | Final diagnosis, treatment recommendations |

## Data Flow

### Case Creation Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant API as API Server
    participant A as Agents
    participant G as Gemini AI
    
    U->>F: Submit case data
    F->>API: POST /api/cases
    API->>API: Create case record
    API->>A: Start background task
    API-->>F: Return case ID (status: Queued)
    
    par Parallel Agent Execution
        A->>G: Internist analysis
        A->>G: Neurologist analysis
        A->>G: Cardiologist analysis
        A->>G: Gastroenterologist analysis
        A->>G: Psychiatrist analysis
    end
    
    G-->>A: Agent responses
    A->>G: MDT synthesis
    G-->>A: Final diagnosis & treatment
    A->>API: Update case (status: Completed)
    
    F->>API: GET /api/cases/{id}
    API-->>F: Return complete results
    F-->>U: Display diagnosis
```

### PDF Upload Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant API as API Server
    participant PDF as PDF Parser
    participant G as Gemini AI
    
    U->>F: Upload PDF
    F->>API: POST /api/cases/parse-report
    API->>PDF: Extract text
    PDF-->>API: Raw text
    API->>G: Parse with AI
    G-->>API: Structured data
    API-->>F: Extracted fields
    F-->>U: Pre-filled form
```

## Technology Stack

### Backend
- **Python 3.9+**: Core runtime
- **FastAPI**: Web framework
- **LangChain**: AI orchestration
- **Google Gemini**: Large language model
- **pdfplumber**: PDF text extraction
- **uvicorn**: ASGI server

### Frontend
- **React 18**: UI framework
- **Vite**: Build tool
- **React Router**: Navigation
- **Framer Motion**: Animations
- **Three.js**: 3D effects (optional)

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **GitHub Actions**: CI/CD
- **NGINX**: Frontend static serving (production)

## Directory Structure

```
MedAura-AI/
├── api_server.py          # FastAPI application
├── Main.py                # Standalone CLI script
├── requirements.txt       # Python dependencies
├── Dockerfile             # Backend container
├── docker-compose.yml     # Multi-container setup
│
├── Utils/
│   └── Agents.py          # AI agent implementations
│
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── api/           # API client
│   │   ├── hooks/         # Custom React hooks
│   │   └── App.jsx        # Main application
│   ├── Dockerfile         # Frontend container
│   └── package.json       # Node dependencies
│
├── docs/                  # Documentation
├── scripts/               # Utility scripts
└── .github/               # GitHub workflows
```

## Security Considerations

1. **API Keys**: Stored in environment variables, never in code
2. **CORS**: Configured for allowed origins only
3. **Input Validation**: Pydantic models validate all input
4. **Medical Disclaimer**: AI outputs are for informational purposes only

## Scaling Considerations

- **Horizontal Scaling**: Stateless backend can run multiple instances
- **Database**: JSON files should be replaced with PostgreSQL for production
- **Caching**: Consider Redis for frequently accessed data
- **Rate Limiting**: Implement at API gateway level
