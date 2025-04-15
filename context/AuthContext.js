import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

// Mock user credentials
const MOCK_USER = {
  email: 'test@demo.com',
  password: 'password123',
  name: 'Demo User',
  avatar: '/avatar-placeholder.png'
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function with validation
  const login = (email, password, remember) => {
    setError('');
    setSuccess('');
    
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Check against mock credentials
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      const userData = {
        email: MOCK_USER.email,
        name: MOCK_USER.name,
        avatar: MOCK_USER.avatar
      };
      
      setUser(userData);
      setSuccess('Login successful');
      
      // Store user data in localStorage if remember is checked
      if (remember) {
        localStorage.setItem('user', JSON.stringify(userData));
      }
      
      // Redirect to dashboard after successful login
      setTimeout(() => {
        router.push('/dashboard');
      }, 800);
    } else {
      setError('Invalid email or password');
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      error, 
      success,
      setError,
      setSuccess
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);