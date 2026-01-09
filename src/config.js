// API Configuration
// For Vercel deployment, use relative /api path
// For local development with separate backend, use VITE_API_URL env variable
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const API_ENDPOINTS = {
    PING: `${API_BASE_URL}/ping`,
    DOWNLOAD: `${API_BASE_URL}/download`,
    UPLOAD: `${API_BASE_URL}/upload-raw`,
    HEALTH: `${API_BASE_URL}/health`
};

export default API_ENDPOINTS;
