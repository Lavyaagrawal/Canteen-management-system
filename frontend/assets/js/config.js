// API Configuration
// This file handles API endpoint configuration for different environments

const API_CONFIG = {
  // Get API base URL from environment variable or use default
  getBaseURL: () => {
    // In production (Vercel), API calls will be rewritten by vercel.json
    // So we can use relative paths which will work in both dev and production
    if (typeof window !== 'undefined') {
      // Check if we're in development (localhost)
      const isDev = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1';
      
      if (isDev) {
        // In development, you might want to point to your local backend
        // Change this to your local backend URL if running locally
        return 'http://localhost:3000'; // Update this to your local backend port
      }
    }
    
    // In production or when deployed, use relative paths
    // Vercel rewrites will handle /api/* requests
    return '';
  },
  
  // Helper function to make API calls
  apiCall: async (endpoint, options = {}) => {
    const baseURL = API_CONFIG.getBaseURL();
    const url = `${baseURL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };
    
    // Add auth token if available
    const token = localStorage.getItem('access');
    if (token) {
      defaultOptions.headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
      const response = await fetch(url, defaultOptions);
      return response;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = API_CONFIG;
}