import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import { authService } from '../services/authService';
import { Mail, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2, Cpu, KeyRound } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [serverError, setServerError] = useState('');
  const [successInfo, setSuccessInfo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setServerError('');
    setSuccessInfo(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await authService.forgotPassword({ email: email.trim() });
      setSuccessInfo(response);
    } catch (err) {
      setServerError(err.message || 'Failed to submit password reset request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        {/* Header */}
        <div className="auth-form-header">
          <div className="auth-form-logo">
            <div className="brand-icon-wrapper" style={{ width: '36px', height: '36px' }}>
              <Cpu size={20} />
            </div>
            <span>
              MLForge <span className="brand-highlight">AI</span>
            </span>
          </div>
          <h2 className="auth-form-title">Reset Password</h2>
          <p className="auth-form-subtitle">
            Enter your registered email address to receive password recovery instructions
          </p>
        </div>

        {/* Server Feedback Alerts */}
        {serverError && (
          <div className="auth-alert auth-alert-error">
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{serverError}</span>
          </div>
        )}

        {successInfo && (
          <div className="auth-alert auth-alert-success" style={{ flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
              <strong>{successInfo.message}</strong>
            </div>
            {successInfo.reset_token && (
              <div style={{ marginTop: '0.75rem', width: '100%', borderTop: '1px solid rgba(16, 185, 129, 0.3)', paddingTop: '0.5rem' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                  🔑 <strong>Development Mode:</strong> Token generated:
                </p>
                <Link
                  to={`/reset-password?token=${successInfo.reset_token}`}
                  className="btn btn-secondary"
                  style={{ width: '100%', fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
                >
                  <KeyRound size={14} />
                  <span>Click to Set New Password</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Registered Email Address
            </label>
            <div className="input-container">
              <div className="input-icon">
                <Mail size={18} />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                  if (serverError) setServerError('');
                }}
                placeholder="name@company.com"
                autoComplete="email"
                disabled={isSubmitting}
                className={`form-input ${error ? 'input-error' : ''}`}
              />
            </div>
            {error && <span className="field-error-text">{error}</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="auth-submit-btn"
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                <span>Sending Reset Link...</span>
              </>
            ) : (
              <>
                <span>Send Reset Link</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="auth-switch-text">
          Remembered your password?
          <Link to="/login" className="auth-switch-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <ArrowLeft size={14} /> Back to Sign In
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

