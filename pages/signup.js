import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faEnvelope, faLock, faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  
  const router = useRouter();
  const { user, register } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme ? useTheme() : { darkMode: false, toggleDarkMode: () => {} };
  
  // Handle client-side only features
  useEffect(() => {
    setMounted(true);
    
    // If user is already logged in, redirect to home
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setError('');
    
    // Basic validations
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // The register function is called from authContext
    const success = register({
      firstName,
      lastName,
      email,
      password
    });
    
    if (success) {
      // Redirect to profile setup instead of home
      router.push('/profile-setup');
    }
  };
  
  if (!mounted) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Sign Up | REVENSO</title>
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
            <p className="auth-subtitle">Create Account</p>
          </div>

          {error && (
            <div className="error-alert">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="name-fields">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input-field"
                    placeholder="John"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input-field"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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

            <div className="form-action">
              <button
                type="submit"
                className="btn-primary"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="auth-footer">
            <p className="signup-text">
              Already have an account?{' '}
              <Link href="/login">
                Sign in
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
          max-width: 480px;
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
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .name-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        @media (max-width: 480px) {
          .name-fields {
            grid-template-columns: 1fr;
          }
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
          padding-left: 2.5rem;
          width: 100%;
          padding: 0.5rem 0.75rem 0.5rem 2.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          font-size: 0.875rem;
        }
        
        .dark .input-field {
          background-color: #374151;
          border-color: #4B5563;
          color: white;
        }
        
        .input-field:focus {
          outline: none;
          border-color: #F59E0B;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
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
        
        .form-action {
          margin: 1.5rem 0;
        }
        
        .btn-primary {
          display: flex;
          width: 100%;
          justify-content: center;
          padding: 0.5rem 1rem;
          border: 1px solid transparent;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          background-color: #F59E0B;
          color: white;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          cursor: pointer;
        }
        
        .btn-primary:hover {
          background-color: #D97706;
        }
        
        .auth-footer {
          text-align: center;
        }
        
        .signup-text {
          font-size: 0.875rem;
          color: #6b7280;
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
        
        .loading-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
}