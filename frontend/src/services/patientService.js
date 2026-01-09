import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/api.config';

/**
 * Patient API Service
 * All patient-related API calls with authentication
 */

const patientService = {
    /**
     * Get all patients
     */
    async getAllPatients() {
        return await apiClient.get(API_ENDPOINTS.PATIENTS.LIST);
    },

    /**
     * Get single patient by ID
     */
    async getPatient(id) {
        return await apiClient.get(API_ENDPOINTS.PATIENTS.GET(id));
    },

    /**
     * Create new patient
     */
    async createPatient(patientData) {
        return await apiClient.post(API_ENDPOINTS.PATIENTS.CREATE, patientData);
    },

    /**
     * Update patient
     */
    async updatePatient(id, patientData) {
        return await apiClient.put(API_ENDPOINTS.PATIENTS.UPDATE(id), patientData);
    },

    /**
     * Delete patient
     */
    async deletePatient(id) {
        return await apiClient.delete(API_ENDPOINTS.PATIENTS.DELETE(id));
    },

    /**
     * Search patients
     */
    async searchPatients(query) {
        return await apiClient.get(`${API_ENDPOINTS.PATIENTS.SEARCH}?q=${encodeURIComponent(query)}`);
    },
};

export default patientService;
