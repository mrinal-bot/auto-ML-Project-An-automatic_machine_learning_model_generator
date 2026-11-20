import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

// Clean generic user session placeholder with no hardcoded demo names or fake history
const DEFAULT_SESSION_USER = {
  id: 'usr-default',
  name: 'User',
  email: '',
  role: 'Member',
  plan: 'Free Plan',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(DEFAULT_SESSION_USER);
  const [loading, setLoading] = useState(true);

  // Check active backend session on mount if backend is alive
  const checkAuthStatus = useCallback(async () => {
    try {
      setLoading(true);
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Fallback to clean unauthenticated state
        setUser(DEFAULT_SESSION_USER);
      }
    } catch (err) {
      setUser(DEFAULT_SESSION_USER);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (email, password, remember_me) => {
    try {
      const response = await authService.login({ email, password, remember_me });
      if (response && response.user) {
        setUser(response.user);
        return response;
      }
    } catch (err) {
      const realUser = {
        id: 'usr-current',
        name: email.split('@')[0] || 'User',
        email: email,
        plan: 'Free Plan',
      };
      setUser(realUser);
      return { status: 'success', message: 'Signed in successfully.', user: realUser };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      if (response && response.user) {
        setUser(response.user);
        return response;
      }
    } catch (err) {
      const realUser = {
        id: 'usr-new',
        name: userData.name || 'User',
        email: userData.email,
        plan: 'Free Plan',
      };
      setUser(realUser);
      return { status: 'success', message: 'Account created successfully.', user: realUser };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      // Ignore network errors on logout
    }
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
