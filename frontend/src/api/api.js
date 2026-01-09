// File: src/api/api.js

import { isDemoMode, demoApi } from './demo-api.js';

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

/**
 * Small helper to call backend.
 * - If `isFormData` is true, body should be FormData and we don't set JSON headers.
 * - Falls back to demo API if in demo mode.
 */
async function request(path, { method = "GET", body, isFormData = false } = {}) {
  // Use demo API for GET requests in demo mode
  if (isDemoMode() && method === "GET") {
    if (path === "/api/cases" || path.startsWith("/api/cases?")) {
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

  const headers = {};

  if (body && !isFormData) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body
        ? isFormData
          ? body
          : JSON.stringify(body)
        : undefined
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
    // Fallback to demo API for GET requests in demo mode
    if (isDemoMode() && method === "GET") {
      if (path === "/api/cases" || path.startsWith("/api/cases?")) {
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

/**
 * Create a new medical case (manual or AI-populated).
 * Expects a plain JSON object.
 */
export function createCase(caseData) {
  if (isDemoMode()) {
    return Promise.reject(new Error(
      'Creating new cases is not available in demo mode. ' +
      'This is a read-only demonstration of previous cases.'
    ));
  }
  return request("/api/cases", {
    method: "POST",
    body: caseData
  });
}

/**
 * Upload a PDF report and ask backend to extract structured fields.
 * Backend endpoint should:
 * - accept multipart/form-data
 * - return JSON with fields matching our form:
 *   {
 *     patientId, name, age, gender,
 *     chiefComplaint,
 *     familyHistory, personalHistory, lifestyle, medications,
 *     colonoscopy, stoolStudies, bloodTests,
 *     vitals, abdominalExam
 *   }
 */
export function extractCaseFromPdf(file) {
  if (isDemoMode()) {
    return Promise.reject(new Error(
      'PDF parsing is not available in demo mode. ' +
      'This is a read-only demonstration.'
    ));
  }
  const formData = new FormData();
  formData.append("file", file);

  return request("/api/cases/parse-report", {
    method: "POST",
    body: formData,
    isFormData: true
  });
}

// We’ll add these later when we build dashboard/detail:
export function listCases(params = {}) {
  const q = new URLSearchParams(params).toString();
  return request(`/api/cases${q ? `?${q}` : ""}`);
}

export function getCase(caseId) {
  return request(`/api/cases/${encodeURIComponent(caseId)}`);
}

export function rerunAgents(caseId) {
  if (isDemoMode()) {
    return Promise.reject(new Error(
      'Rerunning agents is not available in demo mode. ' +
      'This is a read-only demonstration of previous results.'
    ));
  }
  return request(`/api/cases/${encodeURIComponent(caseId)}/rerun`, {
    method: "POST"
  });
}

// Export demo mode checker
export { isDemoMode };
