import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  ArrowLeft, 
  SearchCode, 
  Sliders, 
  Code2, 
  Gauge, 
  Sparkles,
  Bot
} from 'lucide-react';

export default function AuthLayout({ children }) {
  return (
    <div className="auth-wrapper">
      <div className="bg-grid-overlay"></div>
      
      <div className="auth-split-layout">
        {/* LEFT SECTION (~55% width) */}
        <div className="auth-brand-section">
          <div className="auth-brand-glow"></div>

          <div className="auth-brand-header">
            <Link to="/" className="auth-back-home">
              <ArrowLeft size={16} />
              <span>Back to MLForge Home</span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <div className="brand-icon-wrapper">
                <Cpu size={22} strokeWidth={2.2} />
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--slate-default)', letterSpacing: '-0.02em' }}>
                MLForge <span className="brand-highlight">AI</span>
              </span>
            </div>

            <h1 className="auth-brand-title">
              Build Smarter.{' '}
              <span className="text-gradient">Automate Better.</span>
            </h1>

            <p className="auth-brand-desc">
              Experience intelligent machine learning automation powered by
              collaborative AI agents. Transform your datasets into
              production-ready machine learning solutions.
            </p>
          </div>

          {/* AI Workflow Illustration */}
          <div className="auth-workflow-canvas">
            <div className="auth-workflow-title">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Bot size={16} /> Multi-Agent Orchestration Swarm
              </span>
              <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem' }}>
                <span className="auth-tagline-dot"></span> Live Pipeline
              </span>
            </div>

            <div className="auth-nodes-grid">
              {/* Node 1: Requirement Analysis */}
              <div className="auth-agent-node">
                <div className="auth-node-icon analysis">
                  <SearchCode size={20} />
                </div>
                <div className="auth-node-text">
                  <h5>Requirement Analysis</h5>
                  <p>NLU intent translation & scope</p>
                </div>
              </div>

              {/* Node 2: Dataset Processing */}
              <div className="auth-agent-node">
                <div className="auth-node-icon processing">
                  <Sliders size={20} />
                </div>
                <div className="auth-node-text">
                  <h5>Dataset Processing</h5>
                  <p>Auto-cleaning, encoding & splits</p>
                </div>
              </div>

              {/* Node 3: Model Generation */}
              <div className="auth-agent-node">
                <div className="auth-node-icon coding">
                  <Code2 size={20} />
                </div>
                <div className="auth-node-text">
                  <h5>Model Generation</h5>
                  <p>Code synthesis & self-debugging</p>
                </div>
              </div>

              {/* Node 4: Model Evaluation */}
              <div className="auth-agent-node">
                <div className="auth-node-icon evaluation">
                  <Gauge size={20} />
                </div>
                <div className="auth-node-text">
                  <h5>Model Evaluation</h5>
                  <p>ROC-AUC, SHAP & report metrics</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="auth-tagline">
            <Sparkles size={16} color="var(--color-accent)" />
            <span>Your Autonomous Machine Learning Partner.</span>
          </div>
        </div>

        {/* RIGHT SECTION (~45% width) */}
        <div className="auth-form-section">
          {children}
        </div>
      </div>
    </div>
  );
}

