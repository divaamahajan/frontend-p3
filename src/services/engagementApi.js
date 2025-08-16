import axios from 'axios';
import { API_CONFIG } from '../config/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: API_CONFIG.TIMEOUT,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Handle network errors
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - server may be slow or unavailable');
    }
    
    // Handle server errors
    if (error.response?.status >= 500) {
      console.error('Server error - please try again later');
    }
    
    return Promise.reject(error);
  }
);

// Utility function for retrying failed requests
const retryRequest = async (requestFn, maxAttempts = API_CONFIG.RETRY.MAX_ATTEMPTS) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY.DELAY * attempt));
      console.log(`Retrying request (attempt ${attempt + 1}/${maxAttempts})`);
    }
  }
};

export const engagementApi = {
  // Channel management
  getChannels: () => retryRequest(() => api.get('/engagement/channels')),
  addChannel: (channelData) => retryRequest(() => api.post('/engagement/channels', channelData)),
  
  // Sentiment analysis
  getDailySentiment: (channelId, date) => 
    retryRequest(() => api.get(`/engagement/sentiment/daily/${channelId}`, { params: { date } })),
  
  // Trends and insights
  getWeeklyTrends: () => retryRequest(() => api.get('/engagement/trends/weekly')),
  getBurnoutWarnings: () => retryRequest(() => api.get('/engagement/burnout-warnings')),
};

export default api;
