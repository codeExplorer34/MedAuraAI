# 🚀 MedAuraAI - Quick Start Guide

Follow these steps to set up and run the project immediately after cloning.

---

## 🏎️ Step 1: Environment Setup (uv)

We use `uv` for fast and reliable Python environment management.

1.  **Initialize the virtual environment**:
    ```bash
    uv venv
    ```
2.  **Install all project dependencies**:
    ```bash
    uv pip install -r backend/requirements.txt
    ```
3.  **Activate the virtual environment**:
    -   **Windows**: `.venv\Scripts\activate`
    -   **macOS/Linux**: `source .venv/bin/activate`

---

## 🔑 Step 2: Configure API Keys

The AI agents require a Google Gemini API Key to function.

1.  Create a file named `apikey.env` in the root directory.
2.  Add your key:
    ```env
    GOOGLE_API_KEY=your_gemini_api_key_here
    ```

---

## 🐳 Step 3: Launch with Docker

Instead of starting the backend and frontend separately, use Docker Compose to handle everything with one command.

1.  **Build and start the containers**:
    ```bash
    docker-compose up -d --build
    ```

---

## 🌐 Step 4: Access the Application

Once Docker is finished, your app is live at these addresses:

-   **Frontend UI**: [http://localhost:5173](http://localhost:5173)
-   **Backend API**: [http://localhost:8000](http://localhost:8000)
-   **API Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 📋 Project Structure

-   `backend/`: FastAPI application, configuration, and utilities.
-   `frontend/`: React + Vite frontend application.
-   `apikey.env`: Your local API keys (ignored by git).
-   `docker-compose.yml`: Orchestration for the entire stack.

---

## 🛠️ Project Maintenance

-   **Stopping the app**: `docker-compose down`
-   **Viewing logs**: `docker-compose logs -f`
-   **Rebuilding after changes**: `docker-compose up -d --build`

---

Happy Diagnosing! 🏥🤖
