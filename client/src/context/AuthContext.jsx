import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as authService from '../services/authService.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const refreshUser = useCallback(async () => {
    try {
      const { user: u } = await authService.getMe();
      setUser(u);
    } catch {
      setUser(null);
      localStorage.removeItem('colombiator_token');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  useEffect(() => {
    const onUnauth = () => {
      setUser(null);
      localStorage.removeItem('colombiator_token');
      toast.info('Session expired. Please sign in again.');
      navigate('/login');
    };
    window.addEventListener('colombiator:unauthorized', onUnauth);
    return () => window.removeEventListener('colombiator:unauthorized', onUnauth);
  }, [navigate]);

  const login = async (payload) => {
    const data = await authService.login(payload);
    if (data?.token) {
      localStorage.setItem('colombiator_token', data.token);
    }
    setUser(data.user);
    return data;
  };

  const register = async (payload) => {
    const data = await authService.register(payload);
    if (data?.token) {
      localStorage.setItem('colombiator_token', data.token);
    }
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      /* ignore server logout error */
    } finally {
      localStorage.removeItem('colombiator_token');
      setUser(null);
      navigate('/login');
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAdmin: user?.role === 'admin',
      login,
      register,
      logout,
      refreshUser,
      setUser,
    }),
    [user, loading, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
