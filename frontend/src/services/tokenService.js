import { API_CONFIG, STORAGE_KEYS } from '../config/api.config';

/**
 * Token Management Service
 * Handles JWT token storage, retrieval, and validation
 */

class TokenService {
    /**
     * Get access token from storage
     */
    getAccessToken() {
        return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    }

    /**
     * Get refresh token from storage
     */
    getRefreshToken() {
        return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    }

    /**
     * Store tokens
     */
    setTokens(accessToken, refreshToken) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);
        if (refreshToken) {
            localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
        }
    }

    /**
     * Remove all tokens
     */
    clearTokens() {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    }

    /**
     * Check if token is expired
     */
    isTokenExpired(token) {
        if (!token) return true;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiryTime = payload.exp * 1000; // Convert to milliseconds
            return Date.now() >= expiryTime;
        } catch (error) {
            console.error('Error parsing token:', error);
            return true;
        }
    }

    /**
     * Get user data from token
     */
    getUserFromToken(token) {
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return {
                id: payload.sub || payload.userId,
                email: payload.email,
                role: payload.role,
                name: payload.name,
            };
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        const token = this.getAccessToken();
        return token && !this.isTokenExpired(token);
    }
}

export default new TokenService();
