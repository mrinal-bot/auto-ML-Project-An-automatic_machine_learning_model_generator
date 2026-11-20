import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/auth/AuthLayout';
import PasswordInput from '../components/auth/PasswordInput';
import { Mail, ArrowRight, AlertCircle, CheckCircle2, Cpu } from 'lucide-react';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear field-specific error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) {
      setServerError('');
    }
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
      const response = await login(
        formData.email.trim(),
        formData.password,
        formData.rememberMe
      );

      setSuccessMessage(response.message || 'Authentication successful! Redirecting...');
      
      const destination = location.state?.from?.pathname || '/dashboard';
      setTimeout(() => {
        navigate(destination, { replace: true });
      }, 700);
    } catch (err) {
      setServerError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        {/* Card Header */}
        <div className="auth-form-header">
          <div className="auth-form-logo">
            <div className="brand-icon-wrapper" style={{ width: '36px', height: '36px' }}>
              <Cpu size={20} />
            </div>
            <span>
              MLForge <span className="brand-highlight">AI</span>
            </span>
          </div>
          <h2 className="auth-form-title">Welcome Back</h2>
          <p className="auth-form-subtitle">
            Sign in to access your autonomous machine learning workspace
          </p>
        </div>

        {/* Server Feedback Alerts */}
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

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="input-container">
              <div className="input-icon">
                <Mail size={18} />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                autoComplete="email"
                disabled={isSubmitting}
                className={`form-input ${errors.email ? 'input-error' : ''}`}
              />
            </div>
            {errors.email && <span className="field-error-text">{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <div className="form-label">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="form-label-forgot">
                Forgot Password?
              </Link>
            </div>
            <PasswordInput
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.password}
              disabled={isSubmitting}
              autoComplete="current-password"
            />
            {errors.password && <span className="field-error-text">{errors.password}</span>}
          </div>

          {/* Remember Me */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0.25rem 0' }}>
            <label className="form-checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isSubmitting}
                className="form-checkbox"
              />
              <span>Remember me for 7 days</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="auth-submit-btn"
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to MLForge AI</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Switch Link */}
        <div className="auth-switch-text">
          Don't have an account?
          <Link to="/register" className="auth-switch-link">
            Create Account
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

