import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LogoutPage() {
  const router = useRouter();
  
  // Auto-redirect after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="logout-container">
      <div className="logout-card">
        <h1>Logged Out</h1>
        <p>You have been successfully logged out.</p>
        <p className="redirect-text">You will be redirected to the login page shortly...</p>
        <div className="logout-actions">
          <Link href="/login">
            <button className="login-button">Back to Login</button>
          </Link>
        </div>
      </div>
      
      <style jsx>{`
        .logout-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background-color: #f9fafb;
        }
        
        .logout-card {
          width: 100%;
          max-width: 420px;
          padding: 2rem;
          background-color: white;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          text-align: center;
        }
        
        h1 {
          color: #F59E0B;
          margin-bottom: 1rem;
        }
        
        p {
          margin-bottom: 0.5rem;
          color: #4b5563;
        }
        
        .redirect-text {
          font-size: 0.875rem;
          font-style: italic;
          color: #9ca3af;
          margin-bottom: 1.5rem;
        }
        
        .logout-actions {
          margin-top: 1.5rem;
        }
        
        .login-button {
          padding: 0.5rem 1rem;
          background-color: #F59E0B;
          color: white;
          border: none;
          border-radius: 0.375rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }
        
        .login-button:hover {
          background-color: #D97706;
        }
      `}</style>
    </div>
  );
}