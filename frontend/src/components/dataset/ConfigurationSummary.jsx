import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Layers, 
  TrendingUp, 
  MessageSquare, 
  Target, 
  Edit3, 
  CheckCircle2, 
  Bot, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { datasetConfig } from '../../config/datasetConfig';

export default function ConfigurationSummary({
  config,
  onEditStep,
  onContinueWorkflow,
  isWorkflowReady,
}) {
  const { dataset, taskType, objective, targetColumn } = config;
  const taskDetails = datasetConfig.taskTypes[taskType] || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Ready Confirmation Banner (Frontend-Only Milestone Feedback) */}
      {isWorkflowReady && (
        <div className="ready-confirmation-banner">
          <div className="ready-confirmation-icon">
            <Check size={24} strokeWidth={3} />
          </div>
          <div className="ready-confirmation-text">
            <h4>Configuration Complete & Validated</h4>
            <p>
              Your dataset schema, ML problem formulation, target variable, and natural language requirements
              have been verified locally. The project configuration package is formatted and ready for the upcoming
              Agentic AI autonomous execution engine (Phase 5/6).
            </p>
          </div>
        </div>
      )}

      {/* Review Summary Grid */}
      <div className="review-summary-grid">
        {/* 1. Dataset Card */}
        <div className="review-item-card">
          <div className="review-item-header">
            <span className="review-item-label">
              <FileSpreadsheet size={15} color="#60A5FA" />
              <span>Dataset Document</span>
            </span>
            <button
              type="button"
              className="review-edit-btn"
              onClick={() => onEditStep(1)}
              title="Edit dataset file"
            >
              <Edit3 size={13} />
              <span>Edit</span>
            </button>
          </div>
          <div>
            <div className="review-item-value">{dataset?.fileName || '—'}</div>
            <div className="review-item-sub">
              {dataset?.totalRows?.toLocaleString()} rows × {dataset?.totalColumns} features ({dataset?.fileSizeFormatted})
            </div>
          </div>
        </div>

        {/* 2. Task Type Card */}
        <div className="review-item-card">
          <div className="review-item-header">
            <span className="review-item-label">
              {taskType === 'Regression' ? <TrendingUp size={15} color="#FBBF24" /> : <Layers size={15} color="#C084FC" />}
              <span>Machine Learning Task</span>
            </span>
            <button
              type="button"
              className="review-edit-btn"
              onClick={() => onEditStep(3)}
              title="Edit task type"
            >
              <Edit3 size={13} />
              <span>Edit</span>
            </button>
          </div>
          <div>
            <div className="review-item-value">{taskType || '—'}</div>
            <div className="review-item-sub">{taskDetails.subtitle || '—'}</div>
          </div>
        </div>

        {/* 3. Target Column Card */}
        <div className="review-item-card">
          <div className="review-item-header">
            <span className="review-item-label">
              <Target size={15} color="#34D399" />
              <span>Target Column (Y)</span>
            </span>
            <button
              type="button"
              className="review-edit-btn"
              onClick={() => onEditStep(5)}
              title="Edit target column"
            >
              <Edit3 size={13} />
              <span>Edit</span>
            </button>
          </div>
          <div>
            <div className="review-item-value">
              <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
                {targetColumn || '—'}
              </code>
            </div>
            <div className="review-item-sub">
              Primary prediction target variable for model optimization
            </div>
          </div>
        </div>

        {/* 4. Natural Language Objective Card */}
        <div className="review-item-card" style={{ gridColumn: '1 / -1' }}>
          <div className="review-item-header">
            <span className="review-item-label">
              <MessageSquare size={15} color="var(--accent)" />
              <span>Natural-Language Requirement</span>
            </span>
            <button
              type="button"
              className="review-edit-btn"
              onClick={() => onEditStep(4)}
              title="Edit requirement description"
            >
              <Edit3 size={13} />
              <span>Edit</span>
            </button>
          </div>
          <div>
            <p style={{ color: 'var(--slate-default)', fontSize: '0.95rem', lineHeight: '1.6', fontStyle: 'italic', margin: 0 }}>
              "{objective || '—'}"
            </p>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <button
          type="button"
          className="btn-create-highlight"
          onClick={onContinueWorkflow}
          style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}
        >
          <Bot size={20} />
          <span>Continue to Agent Workflow</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

