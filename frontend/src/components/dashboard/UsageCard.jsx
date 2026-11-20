import React from 'react';
import { Cpu, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UsageCard({ quota }) {
  const computeDisplay = quota?.computeHours || '0 / 40 hrs';
  const computePct = quota?.computeUsed || 0;
  const storageDisplay = quota?.storageUsed ? `${quota.storageUsed} / ${quota.storageTotal}` : '0 GB / 10.0 GB';
  const storagePct = quota?.storageUsed ? 42 : 0;
  const slotsDisplay = quota?.activeAgentSlots || '0 / 8 slots';
  const slotsPct = quota?.activeAgentSlots ? 50 : 0;
  const planName = quota?.planName || 'Free Plan';

  return (
    <div className="dashboard-bottom-grid">
      {/* Resource Quota Overview */}
      <div className="dash-card">
        <div className="dash-card-header">
          <h3 className="dash-card-title">
            <Cpu size={20} className="brand-highlight" />
            <span>Compute & Resource Quota</span>
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 600 }}>
            {planName}
          </span>
        </div>

        {/* Compute Usage */}
        <div className="usage-metric-row">
          <div className="usage-metric-header">
            <span className="usage-metric-title">Agent Compute Allocation</span>
            <span className="usage-metric-value">{computeDisplay}</span>
          </div>
          <div className="usage-progress-bar">
            <div 
              className="usage-progress-fill" 
              style={{ width: `${computePct}%` }}
            />
          </div>
        </div>

        {/* Datasets Slots */}
        <div className="usage-metric-row">
          <div className="usage-metric-header">
            <span className="usage-metric-title">Dataset Storage</span>
            <span className="usage-metric-value">{storageDisplay}</span>
          </div>
          <div className="usage-progress-bar">
            <div 
              className="usage-progress-fill" 
              style={{ width: `${storagePct}%`, background: 'var(--marguerite-default)' }}
            />
          </div>
        </div>

        {/* Agent Slots */}
        <div className="usage-metric-row" style={{ marginBottom: 0 }}>
          <div className="usage-metric-header">
            <span className="usage-metric-title">Active Concurrent Agent Slots</span>
            <span className="usage-metric-value">{slotsDisplay}</span>
          </div>
          <div className="usage-progress-bar">
            <div 
              className="usage-progress-fill" 
              style={{ width: `${slotsPct}%`, background: 'var(--success-default)' }}
            />
          </div>
        </div>
      </div>

      {/* Getting Started Guide */}
      <div className="dash-card">
        <div className="dash-card-header">
          <h3 className="dash-card-title">
            <Compass size={20} className="brand-highlight" />
            <span>Autonomous ML Quick Start</span>
          </h3>
          <Link to="/dashboard/create-project" className="dash-card-link">
            <span>Start Now</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="guide-step">
          <div className="guide-step-num">1</div>
          <div className="guide-step-content">
            <h5>Upload Your Tabular Data</h5>
            <p>Upload clean CSV files with headers. MLForge handles missing values and encodings.</p>
          </div>
        </div>

        <div className="guide-step">
          <div className="guide-step-num">2</div>
          <div className="guide-step-content">
            <h5>Describe Analytical Objective</h5>
            <p>State your target variable and goal in natural language (e.g. "predict customer churn").</p>
          </div>
        </div>

        <div className="guide-step">
          <div className="guide-step-num">3</div>
          <div className="guide-step-content">
            <h5>Agents Plan, Code, & Optimize</h5>
            <p>Autonomous agents generate Python scripts, train models, self-debug, and evaluate SHAP importance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
