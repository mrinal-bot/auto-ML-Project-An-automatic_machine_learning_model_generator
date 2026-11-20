import React from 'react';
import { MessageSquare, Sparkles, Lightbulb } from 'lucide-react';

const examplePrompts = [
  'Predict whether a customer will churn/cancel their service based on subscription history and usage behavior.',
  'Forecast the final transaction sale price of residential properties given square footage, location, and condition.',
  'Detect anomalous and fraudulent financial transactions based on transfer volume, country of origin, and frequency.',
];

export default function RequirementInput({ value = '', onChange, error }) {
  const maxChars = 1000;
  const currentChars = value.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {error && (
        <div className="auth-alert auth-alert-error" style={{ margin: 0 }}>
          <span>{error}</span>
        </div>
      )}

      <div className="requirement-textarea-wrap">
        <label htmlFor="objective-input" className="form-label" style={{ fontSize: '0.9rem' }}>
          <span>Machine Learning Analytical Objective</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Required</span>
        </label>

        <textarea
          id="objective-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxChars}
          placeholder="Describe what you want the ML system to predict or analyze. For example: Predict whether a customer will leave the company based on customer information."
          className={`requirement-textarea ${error ? 'error' : ''}`}
        />

        <div className="requirement-meta-bar">
          <span>Be specific regarding the business objective, expected prediction behavior, or critical variables.</span>
          <span>{currentChars} / {maxChars} characters</span>
        </div>
      </div>

      {/* Suggested Quick Prompt Templates */}
      <div className="quick-prompts-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)' }}>
          <Lightbulb size={15} />
          <span>Click to insert an example objective template:</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {examplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              className="quick-prompt-btn"
              onClick={() => onChange(prompt)}
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

