import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/api.config';
import tokenService from './tokenService';

/**
 * Authentication API Service
 */

const authService = {
    /**
     * Login user
     */
    async login(email, password) {
        const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
            email,
            password,
        });

        if (response.accessToken) {
            tokenService.setTokens(response.accessToken, response.refreshToken);

            // Store user data
            if (response.user) {
                localStorage.setItem('medaura_user', JSON.stringify(response.user));
            }
        }

        return response;
    },

    /**
     * Logout user
     */
    async logout() {
        try {
            await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
        } finally {
            tokenService.clearTokens();
        }
    },

    /**
     * Get current user
     */
    getCurrentUser() {
        const userData = localStorage.getItem('medaura_user');
        return userData ? JSON.parse(userData) : null;
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return tokenService.isAuthenticated();
    },

    /**
     * Verify token
     */
    async verifyToken() {
        try {
            const response = await apiClient.get(API_ENDPOINTS.AUTH.VERIFY);
            return response.valid;
        } catch (error) {
            return false;
        }
    },
};

export default authService;
