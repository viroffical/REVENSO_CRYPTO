import React from 'react';
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="error-container">
      <div className="error-card">
        <h1>Error</h1>
        <p>An error occurred during authentication. Please try again.</p>
        <div className="error-actions">
          <Link href="/login">
            <button className="back-button">Back to Login</button>
          </Link>
        </div>
      </div>
      
      <style jsx>{`
        .error-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background-color: #f9fafb;
        }
        
        .error-card {
          width: 100%;
          max-width: 420px;
          padding: 2rem;
          background-color: white;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          text-align: center;
        }
        
        h1 {
          color: #ef4444;
          margin-bottom: 1rem;
        }
        
        p {
          margin-bottom: 1.5rem;
          color: #4b5563;
        }
        
        .error-actions {
          margin-top: 1.5rem;
        }
        
        .back-button {
          padding: 0.5rem 1rem;
          background-color: #F59E0B;
          color: white;
          border: none;
          border-radius: 0.375rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }
        
        .back-button:hover {
          background-color: #D97706;
        }
      `}</style>
    </div>
  );
}