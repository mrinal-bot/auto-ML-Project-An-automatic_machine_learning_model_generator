import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Cpu, Menu, X, ArrowRight, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/#' + sectionId);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          {/* Logo / Brand */}
          <Link to="/" className="brand-link" onClick={() => scrollToSection('home')}>
            <div className="brand-icon-wrapper">
              <Cpu size={22} strokeWidth={2.2} />
            </div>
            <span>
              MLForge <span className="brand-highlight">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-menu">
            <a
              href="#home"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
            >
              Home
            </a>
            <a
              href="#about"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
            >
              About
            </a>
            <a
              href="#features"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('features');
              }}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('how-it-works');
              }}
            >
              How It Works
            </a>
            <a
              href="#team"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('team');
              }}
            >
              Our Team
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="nav-cta-wrapper">
            {user ? (
              <Link to="/dashboard" className="login-btn">
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link to="/login" className="login-btn">
                <span>Login</span>
                <ArrowRight size={16} />
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-menu-drawer">
            <a
              href="#home"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
            >
              Home
            </a>
            <a
              href="#about"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
            >
              About
            </a>
            <a
              href="#features"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('features');
              }}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('how-it-works');
              }}
            >
              How It Works
            </a>
            <a
              href="#team"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('team');
              }}
            >
              Our Team
            </a>
            {user ? (
              <Link
                to="/dashboard"
                className="login-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutDashboard size={16} />
                <span>Open Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="login-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Login to Platform</span>
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
