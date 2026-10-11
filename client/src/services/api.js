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
    const msg = error.response?.data?.message || error.message || 'Network error';
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
