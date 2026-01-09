import { API_CONFIG, API_ENDPOINTS } from '../config/api.config';
import tokenService from './tokenService';

/**
 * Secure API Client
 * Handles all HTTP requests with authentication and error handling
 */

class ApiClient {
    constructor() {
        this.baseURL = API_CONFIG.BASE_URL;
        this.isRefreshing = false;
        this.failedQueue = [];
    }

    /**
     * Process queued requests after token refresh
     */
    processQueue(error, token = null) {
        this.failedQueue.forEach(prom => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token);
            }
        });
        this.failedQueue = [];
    }

    /**
     * Refresh access token
     */
    async refreshToken() {
        const refreshToken = tokenService.getRefreshToken();

        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        try {
            const response = await fetch(`${this.baseURL}${API_ENDPOINTS.AUTH.REFRESH}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (!response.ok) {
                throw new Error('Token refresh failed');
            }

            const data = await response.json();
            tokenService.setTokens(data.accessToken, data.refreshToken);
            return data.accessToken;
        } catch (error) {
            tokenService.clearTokens();
            window.location.href = '/login';
            throw error;
        }
    }

    /**
     * Make authenticated HTTP request
     */
    async request(endpoint, options = {}) {
        const token = tokenService.getAccessToken();

        // Build headers
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        // Add auth token if available
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // Build request config
        const config = {
            ...options,
            headers,
        };

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, config);

            // Handle 401 Unauthorized - try to refresh token
            if (response.status === 401) {
                if (!this.isRefreshing) {
                    this.isRefreshing = true;

                    try {
                        const newToken = await this.refreshToken();
                        this.isRefreshing = false;
                        this.processQueue(null, newToken);

                        // Retry original request with new token
                        headers['Authorization'] = `Bearer ${newToken}`;
                        return await fetch(`${this.baseURL}${endpoint}`, { ...config, headers });
                    } catch (refreshError) {
                        this.isRefreshing = false;
                        this.processQueue(refreshError, null);
                        throw refreshError;
                    }
                }

                // Queue this request while token is refreshing
                return new Promise((resolve, reject) => {
                    this.failedQueue.push({ resolve, reject });
                }).then(token => {
                    headers['Authorization'] = `Bearer ${token}`;
                    return fetch(`${this.baseURL}${endpoint}`, { ...config, headers });
                });
            }

            // Handle other HTTP errors
            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: 'Request failed' }));
                throw new Error(error.message || `HTTP ${response.status}`);
            }

            return response.json();
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    /**
     * HTTP Methods
     */
    get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    }

    post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    put(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }

    patch(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }
}

export default new ApiClient();
