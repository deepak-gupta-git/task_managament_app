import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage or cookies for authentication state
    return !!localStorage.getItem('token'); // Example for token-based auth
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('token', 'example-token'); // Save token for persistence
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
