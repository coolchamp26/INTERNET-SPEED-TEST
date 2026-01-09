// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
    PING: `${API_BASE_URL}/ping`,
    DOWNLOAD: `${API_BASE_URL}/download`,
    UPLOAD: `${API_BASE_URL}/upload-raw`,
    HEALTH: `${API_BASE_URL}/health`
};

export default API_ENDPOINTS;
