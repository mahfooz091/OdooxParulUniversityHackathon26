import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token from localStorage if present for seamless cross-domain & browser persistence
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('colombiator_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    let msg = error.response?.data?.message;
    if (!msg) {
      if (typeof error.response?.data === 'string' && error.response.data.includes('FUNCTION_INVOCATION_FAILED')) {
        msg = 'The authentication service is temporarily unavailable. Please try again shortly.';
      } else if (error.response?.status === 503) {
        msg = error.response?.data?.message || 'Database connection error. Please verify MONGO_URI in project settings.';
      } else if (error.response?.status === 500) {
        msg = 'Unable to reach the server. Please try again in a few moments.';
      } else if (error.response?.status === 401) {
        msg = 'Invalid email or password. Please verify your credentials.';
      } else if (error.response?.status === 404) {
        msg = 'Requested service could not be found.';
      } else if (!error.response) {
        msg = 'Unable to connect to the network. Please check your internet connection.';
      } else {
        msg = error.message || 'An unexpected error occurred.';
      }
    }

    const isAuthCheck = error.config?.url?.includes('/auth/me');
    const isLogin = error.config?.url?.includes('/auth/login');
    const isRegister = error.config?.url?.includes('/auth/register');

    // Only dispatch unauthorized event for expired authenticated sessions, never on initial silent check or login attempts
    if (error.response?.status === 401 && !isAuthCheck && !isLogin && !isRegister) {
      localStorage.removeItem('colombiator_token');
      window.dispatchEvent(new CustomEvent('colombiator:unauthorized'));
    }
    return Promise.reject({ ...error, friendlyMessage: msg });
  }
);

export default api;
