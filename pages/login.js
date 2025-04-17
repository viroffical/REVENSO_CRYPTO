import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { createClient } from '@supabase/supabase-js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme ? useTheme() : { darkMode: false, toggleDarkMode: () => {} };
  
  // Handle client-side only features
  useEffect(() => {
    setMounted(true);
    
    // Check if user is already logged in
    const checkUserSession = () => {
      const userData = localStorage.getItem('revenso_user');
      if (userData) {
        router.push('/');
      }
    };
    
    checkUserSession();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      console.log(email, password);
      
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      console.log(data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      // Store user data in localStorage for session management
      localStorage.setItem('revenso_user', JSON.stringify(data.user));
      
      // Set success message
      setSuccess('Login successful! Redirecting...');
      
      // Redirect to main page after small delay
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Initialize Supabase client
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Login | REVENSO</title>
      </Head>
      <div className={`auth-container ${darkMode ? 'dark' : ''}`}>
        <div className="theme-toggle">
          <button
            onClick={toggleDarkMode}
            className="theme-button"
            aria-label="Toggle Dark Mode"
          >
            <FontAwesomeIcon 
              icon={darkMode ? faSun : faMoon} 
              style={{ color: darkMode ? '#FCD34D' : '#000000' }}
            />
          </button>
        </div>

        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">REVENSO</h1>
            <p className="auth-subtitle">Sign in to your account</p>
          </div>

          {error && (
            <div className="error-alert">
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="success-alert">
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="checkbox"
                />
                <label htmlFor="remember-me">
                  Remember me
                </label>
              </div>

              <div className="forgot-password">
                <a href="#">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="form-action">
              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
          
          <div className="or-divider">
            <span>OR</span>
          </div>
          
          <div className="social-login">
            <button 
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="google-button"
              type="button"
            >
              <img 
                className="google-icon" 
                src="https://www.svgrepo.com/show/475656/google-color.svg" 
                loading="lazy" 
                alt="google logo"
              />
              <span>Sign in with Google</span>
            </button>
          </div>

          <div className="auth-footer">
            <p className="signup-text">
              Don't have an account?{' '}
              <Link href="/onboarding">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background-color: #f9fafb;
        }
        
        .dark {
          background-color: #111827;
          color: white;
        }
        
        .theme-toggle {
          position: absolute;
          top: 1rem;
          right: 1rem;
        }
        
        .theme-button {
          background-color: #e5e7eb;
          padding: 0.5rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
        }
        
        .dark .theme-button {
          background-color: #374151;
        }
        
        .auth-card {
          width: 100%;
          max-width: 420px;
          padding: 2rem;
          background-color: white;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .dark .auth-card {
          background-color: #1f2937;
        }
        
        .auth-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .auth-title {
          font-size: 1.875rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          color: #F59E0B;
        }
        
        .auth-subtitle {
          color: #6b7280;
        }
        
        .dark .auth-subtitle {
          color: #9ca3af;
        }
        
        .error-alert {
          background-color: #fee2e2;
          border: 1px solid #f87171;
          color: #b91c1c;
          padding: 0.75rem 1rem;
          border-radius: 0.375rem;
          margin-bottom: 1rem;
        }
        
        .success-alert {
          background-color: #d1fae5;
          border: 1px solid #34d399;
          color: #047857;
          padding: 0.75rem 1rem;
          border-radius: 0.375rem;
          margin-bottom: 1rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .input-wrapper {
          position: relative;
        }
        
        .input-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          width: 1rem;
        }
        
        .input-field {
          width: 100%;
          border-radius: 0.375rem;
          border: 1px solid rgba(55, 65, 81, 1);
          outline: 0;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          color: #1f2937;
          background-color: white;
        }
        
        .dark .input-field {
          background-color: #1f2937;
          color: rgba(243, 244, 246, 1);
        }
        
        .password-toggle {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
        }
        
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .remember-me {
          display: flex;
          align-items: center;
        }
        
        .checkbox {
          margin-right: 0.5rem;
        }
        
        .forgot-password a {
          color: #F59E0B;
          font-weight: 500;
          text-decoration: none;
        }
        
        .forgot-password a:hover {
          color: #D97706;
        }
        
        .form-action {
          margin-bottom: 1.5rem;
        }
        
        .btn-primary {
          display: block;
          width: 100%;
          background-color: rgba(167, 139, 250, 1);
          padding: 0.75rem;
          text-align: center;
          color: rgba(17, 24, 39, 1);
          border: none;
          border-radius: 0.375rem;
          font-weight: 600;
        }
        
        .auth-footer {
          text-align: center;
        }
        
        .signup-text {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }
        
        .dark .signup-text {
          color: #9ca3af;
        }
        
        .signup-text a {
          color: #F59E0B;
          font-weight: 500;
          text-decoration: none;
        }
        
        .signup-text a:hover {
          color: #D97706;
        }
        
        .profile-setup-link {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }
        
        .dark .profile-setup-link {
          color: #9ca3af;
        }
        
        .profile-setup-link a {
          color: #F59E0B;
          font-weight: 500;
          text-decoration: none;
        }
        
        .profile-setup-link a:hover {
          color: #D97706;
        }
        
        .demo-credentials {
          font-size: 0.75rem;
          color: #9ca3af;
        }
        
        .dark .demo-credentials {
          color: #6b7280;
        }
        
        .loading-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .or-divider {
          display: flex;
          align-items: center;
          margin: 1.5rem 0;
          color: #6b7280;
        }
        
        .dark .or-divider {
          color: #9ca3af;
        }
        
        .or-divider::before,
        .or-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background-color: #e5e7eb;
        }
        
        .dark .or-divider::before,
        .dark .or-divider::after {
          background-color: #374151;
        }
        
        .or-divider span {
          padding: 0 1rem;
          font-size: 0.875rem;
          text-transform: uppercase;
        }
        
        .social-login {
          margin-bottom: 1.5rem;
        }
        
        .google-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid rgba(55, 65, 81, 1);
          border-radius: 0.375rem;
          background-color: white;
          color: #4b5563;
          font-weight: 600;
          transition: all 0.15s ease;
          cursor: pointer;
        }
        
        .dark .google-button {
          background-color: #1f2937;
          border-color: #374151;
          color: #e5e7eb;
        }
        
        .google-button:hover {
          border-color: #d1d5db;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        
        .dark .google-button:hover {
          border-color: #4b5563;
        }
        
        .google-button:focus {
          outline: none;
          ring: 2px;
          ring-offset: 2px;
          ring-color: #F59E0B;
        }
        
        .google-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .google-icon {
          height: 1.5rem;
          width: 1.5rem;
          margin-right: 0.75rem;
        }
        
        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
}