const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    GOOGLE: `${API_BASE_URL}/api/auth/google`,
  },
  USERS: {
    PROFILE: (id) => `${API_BASE_URL}/api/users/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/api/users/${id}`,
    DELETE: (id) => `${API_BASE_URL}/api/users/${id}`,
  },
  DOCUMENTS: {
    HISTORY: `${API_BASE_URL}/api/documents/history`,
    APPLIED: `${API_BASE_URL}/api/documents/applied`,
  },
};

export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getAuthHeaders = (token) => ({
  ...API_CONFIG.headers,
  Authorization: `Bearer ${token}`,
}); 