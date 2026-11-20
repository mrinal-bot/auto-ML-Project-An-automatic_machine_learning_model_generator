import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import PasswordInput from '../components/auth/PasswordInput';
import { authService } from '../services/authService';
import { KeyRound, ArrowRight, AlertCircle, CheckCircle2, Cpu } from 'lucide-react';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialToken = searchParams.get('token') || '';
  const [token, setToken] = useState(initialToken);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!token.trim()) {
      newErrors.token = 'Reset token is required.';
    }
    if (!newPassword) {
      newErrors.newPassword = 'New password is required.';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long.';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirmation password is required.';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMessage('');

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await authService.resetPassword({
        token: token.trim(),
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      setSuccessMessage(response.message || 'Password updated successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setServerError(err.message || 'Failed to reset password. Token may be invalid or expired.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        <div className="auth-form-header">
          <div className="auth-form-logo">
            <div className="brand-icon-wrapper" style={{ width: '36px', height: '36px' }}>
              <Cpu size={20} />
            </div>
            <span>
              MLForge <span className="brand-highlight">AI</span>
            </span>
          </div>
          <h2 className="auth-form-title">Set New Password</h2>
          <p className="auth-form-subtitle">
            Enter your secure reset token and create a new password
          </p>
        </div>

        {serverError && (
          <div className="auth-alert auth-alert-error">
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{serverError}</span>
          </div>
        )}

        {successMessage && (
          <div className="auth-alert auth-alert-success">
            <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Token input */}
          <div className="form-group">
            <label htmlFor="token" className="form-label">
              Reset Security Token
            </label>
            <div className="input-container">
              <div className="input-icon">
                <KeyRound size={18} />
              </div>
              <input
                type="text"
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste reset token here"
                disabled={isSubmitting}
                className={`form-input ${errors.token ? 'input-error' : ''}`}
              />
            </div>
            {errors.token && <span className="field-error-text">{errors.token}</span>}
          </div>

          {/* New Password */}
          <div className="form-group">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <PasswordInput
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              error={errors.newPassword}
              disabled={isSubmitting}
              autoComplete="new-password"
            />
            {errors.newPassword && <span className="field-error-text">{errors.newPassword}</span>}
          </div>

          {/* Confirm New Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm New Password
            </label>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat new password"
              error={errors.confirmPassword}
              disabled={isSubmitting}
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <span className="field-error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="auth-submit-btn"
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                <span>Updating Password...</span>
              </>
            ) : (
              <>
                <span>Update Password</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-switch-text">
          Remember your password?
          <Link to="/login" className="auth-switch-link">
            Back to Sign In
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

