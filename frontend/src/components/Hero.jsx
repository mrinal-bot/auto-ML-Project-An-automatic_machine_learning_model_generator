import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Bot, 
  Database, 
  Code2, 
  Cpu, 
  TrendingUp, 
  CheckCircle2,
  Workflow
} from 'lucide-react';

export default function Hero() {
  const scrollToFeatures = (e) => {
    e.preventDefault();
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Heading & CTAs */}
          <div className="hero-content">
            <div className="hero-tag">
              <span className="hero-tag-pulse"></span>
              <Sparkles size={14} />
              <span>Next-Generation Autonomous AutoML</span>
            </div>

            <h1 className="hero-title">
              Transform Your Data Into{' '}
              <span className="text-gradient">Intelligence</span> With AI
            </h1>

            <p className="hero-desc">
              An Agentic AI-powered AutoML platform that automates the machine
              learning lifecycle — from dataset analysis and preprocessing to
              model generation, evaluation, and intelligent reporting.
            </p>

            <div className="hero-cta-group">
              <Link to="/login" className="btn btn-primary">
                <span>Get Started</span>
                <ArrowRight size={18} />
              </Link>
              <a
                href="#features"
                onClick={scrollToFeatures}
                className="btn btn-secondary"
              >
                <Compass size={18} />
                <span>Explore Features</span>
              </a>
            </div>

            {/* Metrics Highlight Bar */}
            <div className="hero-metrics">
              <div className="metric-item">
                <div className="metric-number">7+</div>
                <div className="metric-label">Autonomous Agents</div>
              </div>
              <div className="metric-item">
                <div className="metric-number">100%</div>
                <div className="metric-label">Automated Pipelines</div>
              </div>
              <div className="metric-item">
                <div className="metric-number">Zero</div>
                <div className="metric-label">Manual Coding Required</div>
              </div>
            </div>
          </div>

          {/* Right Column: AI-Powered Multi-Agent Interactive Architecture Visual */}
          <div className="hero-visual-wrapper">
            <div className="visual-ambient-glow"></div>

            <div className="hero-canvas-card">
              {/* Window Header */}
              <div className="card-topbar">
                <div className="window-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <div className="status-badge">
                  <CheckCircle2 size={12} />
                  <span>Agent Swarm Active</span>
                </div>
              </div>

              {/* Multi-Agent Architecture Canvas */}
              <div className="agent-network-container">
                {/* Central Orchestrator Element */}
                <div className="central-orchestrator">
                  <div className="orchestrator-info">
                    <div className="orchestrator-icon">
                      <Cpu size={24} />
                    </div>
                    <div>
                      <div className="orchestrator-title">MLForge Orchestrator</div>
                      <div className="orchestrator-sub">Multi-Agent Coordination Kernel</div>
                    </div>
                  </div>
                  <Workflow size={20} className="brand-highlight" />
                </div>

                {/* Surrounding Connected Agent Nodes */}
                <div className="agent-nodes-grid">
                  <div className="agent-mini-card">
                    <div className="agent-mini-icon icon-blue">
                      <Database size={16} />
                    </div>
                    <div className="agent-mini-text">
                      <h4>Data Ingestion Agent</h4>
                      <p>Schema & stats profiling</p>
                    </div>
                  </div>

                  <div className="agent-mini-card">
                    <div className="agent-mini-icon icon-purple">
                      <Bot size={16} />
                    </div>
                    <div className="agent-mini-text">
                      <h4>Planning Agent</h4>
                      <p>Task strategy & ML roadmap</p>
                    </div>
                  </div>

                  <div className="agent-mini-card">
                    <div className="agent-mini-icon icon-emerald">
                      <Code2 size={16} />
                    </div>
                    <div className="agent-mini-text">
                      <h4>Coding & Debug Agent</h4>
                      <p>Self-correcting python code</p>
                    </div>
                  </div>

                  <div className="agent-mini-card">
                    <div className="agent-mini-icon icon-amber">
                      <TrendingUp size={16} />
                    </div>
                    <div className="agent-mini-text">
                      <h4>Evaluation Agent</h4>
                      <p>Hyperparameter tuning & metrics</p>
                    </div>
                  </div>
                </div>

                {/* Real-time Agent Stream Terminal Snippet */}
                <div className="agent-console-snippet">
                  <div className="console-line">
                    <span className="console-prefix">&gt;</span>
                    <span>Analyzing tabular schema: churn_data.csv (24 cols)...</span>
                  </div>
                  <div className="console-line">
                    <span className="console-prefix">&gt;</span>
                    <span>Planning agent assigned: XGBoost + LightGBM ensemble</span>
                  </div>
                  <div className="console-line console-success">
                    <span className="console-prefix">&gt;</span>
                    <span>[Success] 0 runtime syntax errors; Test ROC-AUC: 0.942</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

