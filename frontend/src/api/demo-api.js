// File: src/api/demo-api.js
// Demo API that reads from static JSON files (for public deployment without backend)
// This allows the app to work in read-only mode without requiring a backend server

/**
 * Check if we're in demo mode (no backend available)
 */
export const isDemoMode = () => {
  // Demo mode if explicitly set, or if in production without backend URL
  if (import.meta.env.VITE_DEMO_MODE === 'true') {
    return true;
  }

  // In production, default to demo mode (read-only)
  if (import.meta.env.MODE === 'production') {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    // Only use real API if explicitly configured
    return !apiUrl || apiUrl.includes('localhost');
  }

  // In development, check if backend is available
  return false;
};

/**
 * Load all cases from static JSON file
 */
let cachedCases = null;

async function loadAllCases() {
  if (cachedCases) {
    return cachedCases;
  }

  try {
    const response = await fetch('/cases/index.json');
    if (!response.ok) {
      throw new Error('Failed to load cases');
    }
    const data = await response.json();
    cachedCases = data.items || [];
    return cachedCases;
  } catch (error) {
    console.error('Error loading cases:', error);
    // Return empty array if cases file doesn't exist
    return [];
  }
}

/**
 * Demo API functions that mirror the real API
 */
export const demoApi = {
  /**
   * List all cases, optionally filtered by status
   */
  async listCases(params = {}) {
    const allCases = await loadAllCases();

    let filtered = [...allCases];

    // Filter by status if provided
    if (params.status && params.status.toLowerCase() !== 'all') {
      filtered = filtered.filter(
        c => (c.status || '').toLowerCase() === params.status.toLowerCase()
      );
    }

    // Sort by creation date (newest first)
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return dateB - dateA;
    });

    return {
      items: filtered,
      total: filtered.length
    };
  },

  /**
   * Get a specific case by ID
   */
  async getCase(caseId) {
    try {
      const response = await fetch(`/cases/${caseId}.json`);
      if (!response.ok) {
        throw new Error('Case not found');
      }
      return await response.json();
    } catch (error) {
      console.error('Error loading case:', error);
      throw new Error(`Case ${caseId} not found`);
    }
  },

  /**
   * Create a new case (not supported in demo mode)
   */
  async createCase(caseData) {
    throw new Error(
      'Creating new cases is not available in demo mode. ' +
      'This is a read-only demonstration of previous cases.'
    );
  },

  /**
   * Extract case from PDF (not supported in demo mode)
   */
  async extractCaseFromPdf(file) {
    throw new Error(
      'PDF parsing is not available in demo mode. ' +
      'This is a read-only demonstration.'
    );
  },

  /**
   * Rerun agents (not supported in demo mode)
   */
  async rerunAgents(caseId) {
    throw new Error(
      'Rerunning agents is not available in demo mode. ' +
      'This is a read-only demonstration of previous results.'
    );
  }
};

/**
 * Main API wrapper that uses demo API when appropriate
 */
async function request(path, { method = "GET", body, isFormData = false } = {}) {
  // In demo mode, route to demo API
  if (isDemoMode() && method === "GET") {
    if (path === "/api/cases") {
      const params = new URLSearchParams(path.split('?')[1] || '');
      const status = params.get('status');
      return demoApi.listCases({ status });
    }
    if (path.startsWith("/api/cases/") && path !== "/api/cases/parse-report") {
      const caseId = path.split("/api/cases/")[1].split("/")[0];
      if (caseId && caseId !== "rerun") {
        return demoApi.getCase(caseId);
      }
    }
  }

  // For non-GET or non-demo, try real API (will fail gracefully in demo)
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
  const headers = {};

  if (body && !isFormData) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined
    });

    const contentType = res.headers.get("content-type") || "";
    let data;
    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      const msg = typeof data === "string" ? data : data?.error || "Request failed";
      throw new Error(msg);
    }

    return data;
  } catch (error) {
    // If request fails and we're in demo mode for GET requests, try demo API
    if (isDemoMode() && method === "GET") {
      if (path === "/api/cases") {
        const params = new URLSearchParams(path.split('?')[1] || '');
        const status = params.get('status');
        return demoApi.listCases({ status });
      }
      if (path.startsWith("/api/cases/") && !path.includes("parse-report") && !path.includes("rerun")) {
        const caseId = path.split("/api/cases/")[1].split("/")[0];
        if (caseId) {
          return demoApi.getCase(caseId);
        }
      }
    }
    throw error;
  }
}


export { request };

