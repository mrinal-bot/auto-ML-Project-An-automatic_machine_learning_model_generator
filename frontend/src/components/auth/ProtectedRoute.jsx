import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Cpu } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="auth-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="brand-icon-wrapper" style={{ margin: '0 auto 1.5rem auto', animation: 'pulseGlow 1.5s infinite ease-in-out' }}>
            <Cpu size={26} />
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            Verifying secure session...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect unauthenticated user to /login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

