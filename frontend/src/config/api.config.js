/**
 * Secure API Configuration
 * Centralized API settings for MedAura AI
 */

// API Configuration
export const API_CONFIG = {
    // Backend API base URL - update this when deploying backend
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',

    // API Version
    VERSION: 'v1',

    // Timeout settings
    TIMEOUT: 30000, // 30 seconds

    // Retry settings
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000, // 1 second
};

// API Endpoints
export const API_ENDPOINTS = {
    // Authentication
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        VERIFY: '/auth/verify',
    },

    // Patients
    PATIENTS: {
        LIST: '/patients',
        GET: (id) => `/patients/${id}`,
        CREATE: '/patients',
        UPDATE: (id) => `/patients/${id}`,
        DELETE: (id) => `/patients/${id}`,
        SEARCH: '/patients/search',
    },

    // Cases (ER/MDT)
    CASES: {
        LIST: '/cases',
        GET: (id) => `/cases/${id}`,
        CREATE: '/cases',
        UPDATE: (id) => `/cases/${id}`,
    },

    // Analytics
    ANALYTICS: {
        DASHBOARD: '/analytics/dashboard',
        STATS: '/analytics/stats',
    },
};

// Storage Keys
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'medaura_auth_token',
    REFRESH_TOKEN: 'medaura_refresh_token',
    USER_DATA: 'medaura_user',
};
