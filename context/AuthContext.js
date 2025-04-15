import { createContext, useContext, useState, useEffect } from 'react';

// Create the auth context
const AuthContext = createContext();

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Check if we have a saved user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password, rememberMe = false) => {
    setError('');
    setSuccess('');
    
    // Demo auth - in a real app, this would be an API call
    if (email === 'test@demo.com' && password === 'password123') {
      const userData = { 
        id: '1', 
        email, 
        name: 'Test User',
        firstName: 'Test',
        lastName: 'User',
      };
      
      setUser(userData);
      
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(userData));
      }
      
      setSuccess('Successfully logged in');
      return true;
    } else {
      setError('Invalid email or password');
      return false;
    }
  };

  // Register function
  const register = (userData) => {
    setError('');
    setSuccess('');
    
    // Demo auth - in a real app, this would be an API call
    try {
      // Basic validation
      if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
        setError('All fields are required');
        return false;
      }
      
      // Create user object
      const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        name: `${userData.firstName} ${userData.lastName}`
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setSuccess('Account created successfully');
      return true;
    } catch (err) {
      setError('Registration failed');
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setSuccess('Successfully logged out');
  };

  // Clear messages
  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const value = {
    user,
    loading,
    error,
    success,
    login,
    register,
    logout,
    clearMessages
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext);
}