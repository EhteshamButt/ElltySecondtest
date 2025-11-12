import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import axios from 'axios';

// Configure axios base URL
// Default to Railway backend URL, can be overridden with REACT_APP_API_URL environment variable
const API_URL = process.env.REACT_APP_API_URL || 'https://elltysecondtest-production.up.railway.app';
axios.defaults.baseURL = API_URL;

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  const refreshAccessToken = useCallback(async (refreshToken: string) => {
    try {
      const response = await axios.post('/api/auth/refresh', { refreshToken });
      const newAccessToken = response.data.accessToken;
      setAccessToken(newAccessToken);
      localStorage.setItem('accessToken', newAccessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
    } catch (error) {
      // Refresh failed, clear everything
      logout();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      setAccessToken(token);
      setUser(JSON.parse(userStr));
      
      // Set default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Try to refresh token if we have refresh token
    if (refreshToken && !token) {
      refreshAccessToken(refreshToken);
    }
  }, [refreshAccessToken]);

  const login = async (username: string, password: string) => {
    const response = await axios.post('/api/auth/login', { username, password });
    const { accessToken, refreshToken, user } = response.data;
    
    setAccessToken(accessToken);
    setUser(user);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  };

  const register = async (username: string, password: string) => {
    const response = await axios.post('/api/auth/register', { username, password });
    const { accessToken, refreshToken, user } = response.data;
    
    setAccessToken(accessToken);
    setUser(user);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

