import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Code, Server, Heart } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="brand-link">
              <div className="brand-icon-wrapper">
                <Cpu size={22} strokeWidth={2.2} />
              </div>
              <span>
                MLForge <span className="brand-highlight">AI</span>
              </span>
            </Link>
            <p>
              An Agentic AI-Based Autonomous AutoML Platform empowering users to transform tabular datasets into deployed machine learning solutions through multi-agent collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Platform</h4>
            <ul className="footer-links">
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>
                  About Platform
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => { e.preventDefault(); scrollTo('features'); }}>
                  Capabilities
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollTo('how-it-works'); }}>
                  Agentic Workflow
                </a>
              </li>
              <li>
                <a href="#team" onClick={(e) => { e.preventDefault(); scrollTo('team'); }}>
                  Our Team
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-col">
            <h4>Access</h4>
            <ul className="footer-links">
              <li>
                <Link to="/login">Sign In / Register</Link>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollTo('how-it-works'); }}>
                  Documentation
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>
                  Architecture Overview
                </a>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="footer-col">
            <h4>Core Technology</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
              Built strictly with standard web and high-performance Python backends:
            </p>
            <div className="tech-stack-badges">
              <div className="tech-badge">
                <Code size={14} color="#60A5FA" />
                <span>React.js</span>
              </div>
              <div className="tech-badge">
                <Server size={14} color="#34D399" />
                <span>Python FastAPI</span>
              </div>
              <div className="tech-badge">
                <Cpu size={14} color="#C084FC" />
                <span>Agentic AI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © 2026 MLForge AI. All Rights Reserved.
          </div>
          <div>
            <span>Autonomous Machine Learning Orchestration Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

