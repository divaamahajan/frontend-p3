// API Configuration
export const API_CONFIG = {
  // Base URL for the backend API
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  
  // API endpoints
  ENDPOINTS: {
    ENGAGEMENT: {
      CHANNELS: '/engagement/channels',
      DAILY_SENTIMENT: '/engagement/sentiment/daily',
      WEEKLY_TRENDS: '/engagement/trends/weekly',
      BURNOUT_WARNINGS: '/engagement/burnout-warnings',
    },
    AUTH: {
      LOGIN: '/auth/google',
      VERIFY: '/auth/google/verify',
    },
  },
  
  // Request timeout (in milliseconds)
  TIMEOUT: 10000,
  
  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000,
  },
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
