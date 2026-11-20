import React from 'react';
import { Layers, Check, X, Sparkles, Network, ArrowUpRight } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Descriptive Text */}
          <div className="about-content">
            <div className="section-tag">
              <Sparkles size={14} />
              <span>Paradigm Shift</span>
            </div>

            <h2>
              Redefining the <span className="text-gradient">Machine Learning</span> Workflow
            </h2>

            <p className="about-desc">
              Traditional machine learning development involves multiple manual
              stages, including data preprocessing, feature engineering, model
              selection, training, debugging, and evaluation. MLForge AI introduces
              an agentic approach that coordinates specialized AI agents to
              automate these stages through an intelligent workflow.
            </p>

            <div className="about-checklist">
              <div className="checklist-item">
                <Network size={20} className="checklist-icon" />
                <div>
                  <strong>Collaborative Multi-Agent Architecture</strong>
                  <span>Specialized autonomous agents communicate synchronously to orchestrate the entire pipeline.</span>
                </div>
              </div>

              <div className="checklist-item">
                <ArrowUpRight size={20} className="checklist-icon" />
                <div>
                  <strong>Natural Language Objective Translation</strong>
                  <span>Describe your analytical goal in plain English, and agents formulate the optimal algorithmic plan.</span>
                </div>
              </div>

              <div className="checklist-item">
                <Sparkles size={20} className="checklist-icon" />
                <div>
                  <strong>Self-Healing Execution Engine</strong>
                  <span>Runtime exceptions and data discrepancies are detected and resolved autonomously by coding agents.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Comparative Visual */}
          <div className="about-visual">
            <div className="glass-card comparison-card">
              <div className="comparison-header">
                <Layers size={22} className="brand-highlight" />
                <span>Workflow Comparison</span>
              </div>

              {/* Traditional ML */}
              <div className="comparison-box">
                <div className="box-title con">
                  <span>Traditional ML Development</span>
                  <X size={16} />
                </div>
                <ul className="comparison-list">
                  <li>• Repetitive manual data cleaning & imputations</li>
                  <li>• Tedious trial-and-error hyperparameter sweeps</li>
                  <li>• Frustrating manual code debugging & environment issues</li>
                  <li>• Disjointed reporting and documentation overhead</li>
                </ul>
              </div>

              {/* MLForge AI Autonomous Flow */}
              <div className="comparison-box pro">
                <div className="box-title pro">
                  <span>MLForge AI Autonomous Flow</span>
                  <Check size={16} />
                </div>
                <ul className="comparison-list">
                  <li>• Upload CSV & specify your analytical objective</li>
                  <li>• Autonomous profiling, preprocessing & encoding</li>
                  <li>• Intelligent code generation & self-healing debug loop</li>
                  <li>• Comprehensive metrics, charts & downloadable reports</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

