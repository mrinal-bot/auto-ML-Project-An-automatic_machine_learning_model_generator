import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/auth/AuthLayout';
import PasswordInput from '../components/auth/PasswordInput';
import { User, Mail, ArrowRight, AlertCircle, CheckCircle2, Cpu } from 'lucide-react';

export default function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  // Calculate password strength
  const calculateStrength = (pass) => {
    if (!pass) return { score: 0, label: 'None', className: '' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', className: 'weak' };
    if (score === 2 || score === 3) return { score: 2, label: 'Fair', className: 'fair' };
    if (score === 4) return { score: 3, label: 'Good', className: 'good' };
    return { score: 4, label: 'Strong', className: 'strong' };
  };

  const strength = calculateStrength(formData.password);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }

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

    if (!formData.confirm_password) {
      newErrors.confirm_password = 'Confirmation password is required.';
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      const response = await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirm_password: formData.confirm_password,
      });

      setSuccessMessage(response.message || 'Account created successfully! Preparing workspace...');

      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 700);
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please check your information.');
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
          <h2 className="auth-form-title">Create Account</h2>
          <p className="auth-form-subtitle">
            Get started with autonomous multi-agent machine learning
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

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <div className="input-container">
              <div className="input-icon">
                <User size={18} />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Dr. Alan Turing"
                autoComplete="name"
                disabled={isSubmitting}
                className={`form-input ${errors.name ? 'input-error' : ''}`}
              />
            </div>
            {errors.name && <span className="field-error-text">{errors.name}</span>}
          </div>

          {/* Email Address */}
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

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <PasswordInput
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              error={errors.password}
              disabled={isSubmitting}
              autoComplete="new-password"
            />
            {/* Password strength indicator */}
            {formData.password && (
              <div className="password-strength-wrapper">
                <div className="strength-bars">
                  <div className={`strength-bar ${strength.score >= 1 ? strength.className : ''}`}></div>
                  <div className={`strength-bar ${strength.score >= 2 ? strength.className : ''}`}></div>
                  <div className={`strength-bar ${strength.score >= 3 ? strength.className : ''}`}></div>
                  <div className={`strength-bar ${strength.score >= 4 ? strength.className : ''}`}></div>
                </div>
                <div className="strength-text">
                  <span>Strength</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{strength.label}</span>
                </div>
              </div>
            )}
            {errors.password && <span className="field-error-text">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirm_password" className="form-label">
              Confirm Password
            </label>
            <PasswordInput
              id="confirm_password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Repeat password"
              error={errors.confirm_password}
              disabled={isSubmitting}
              autoComplete="new-password"
            />
            {errors.confirm_password && (
              <span className="field-error-text">{errors.confirm_password}</span>
            )}
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
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Your Account</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Switch Link */}
        <div className="auth-switch-text">
          Already have an account?
          <Link to="/login" className="auth-switch-link">
            Sign In
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

