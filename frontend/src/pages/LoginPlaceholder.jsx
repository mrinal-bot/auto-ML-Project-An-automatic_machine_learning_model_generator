import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ArrowLeft, Lock, Sparkles } from 'lucide-react';

export default function LoginPlaceholder() {
  return (
    <div className="app-container placeholder-page">
      <div className="bg-grid-overlay"></div>
      
      <div className="glass-card placeholder-card">
        <div className="placeholder-icon">
          <Lock size={32} />
        </div>

        <div className="phase-pill">
          <Sparkles size={12} style={{ display: 'inline', marginRight: '6px' }} />
          Development Phase 1
        </div>

        <h1>MLForge AI Portal</h1>
        
        <p>
          Authentication and user dashboard modules will be activated in Phase 2. 
          Currently exploring the public architecture and agentic capabilities showcase.
        </p>

        <Link to="/" className="btn btn-primary" style={{ width: '100%' }}>
          <ArrowLeft size={18} />
          <span>Back to Landing Page</span>
        </Link>
      </div>
    </div>
  );
}

