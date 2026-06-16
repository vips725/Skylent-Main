import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
const API_BASE = '/api';

function decodeJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(base64);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('skylent_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchMe();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchMe = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const payload = decodeJwt(token);
      if (!payload) {
        logout();
        return;
      }
      const user = {
        id: payload.sub,
        name: payload.username,
        username: payload.username,
        role: payload.role,
      };
      setUser(user);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data } = await axios.post(`${API_BASE}/auth/login`, { username: email, password });
    localStorage.setItem('skylent_token', data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    setToken(data.token);

    const payload = decodeJwt(data.token);
    const user = {
      id: payload.sub,
      name: payload.username,
      username: payload.username,
      role: payload.role,
    };
    setUser(user);
    return user;
  };

  const signup = async (name, email, password, phone, role = 'student') => {
    throw new Error('Sign-up is temporarily unavailable. Please use the demo login account.');
  };

  const logout = () => {
    localStorage.removeItem('skylent_token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout, isAuthenticated: !!user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};