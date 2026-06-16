import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
const API_BASE = '/api';
const TOKEN_KEY = 'skylent_token';

function normalizeUser(user) {
  if (!user) return null;

  return {
    id: user.id,
    name: user.name || user.username,
    username: user.username,
    role: user.role,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hydrateUser = async () => {
      if (!token) {
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      try {
        const { data } = await axios.get(`${API_BASE}/auth/me`);
        setUser(normalizeUser(data.user));
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        delete axios.defaults.headers.common['Authorization'];
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    hydrateUser();
  }, [token]);

  const login = async (email, password) => {
    const { data } = await axios.post(`${API_BASE}/auth/login`, { username: email, password });

    if (!data?.token || !data?.user) {
      throw new Error('Invalid login response');
    }

    localStorage.setItem(TOKEN_KEY, data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    setToken(data.token);
    setUser(normalizeUser(data.user));
    return normalizeUser(data.user);
  };

  const signup = async () => {
    throw new Error('Sign-up is currently unavailable. Please contact Skylent Global for account access.');
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE}/auth/logout`);
    } catch {
      // Client-side logout should still complete if the network request fails.
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      delete axios.defaults.headers.common['Authorization'];
      setToken(null);
      setUser(null);
      setLoading(false);
    }
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
