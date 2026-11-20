import React from 'react';
import { Target, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export default function TargetColumnSelector({
  columns = [],
  columnProfiles = [],
  selectedTarget = '',
  onSelectTarget,
  error,
}) {
  const profileMap = {};
  columnProfiles.forEach((cp) => {
    profileMap[cp.name] = cp;
  });

  const selectedProfile = profileMap[selectedTarget];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {error && (
        <div className="auth-alert auth-alert-error" style={{ margin: 0 }}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="target-selector-box">
        <div>
          <label htmlFor="target-select" className="form-label" style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}>
            <span>Select Target Variable (Y)</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Required</span>
          </label>
          <p style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: '1.5' }}>
            The target column is the ground-truth outcome or dependent variable that your machine learning model will be trained to predict.
          </p>

          <select
            id="target-select"
            value={selectedTarget}
            onChange={(e) => onSelectTarget(e.target.value)}
            className="target-select-dropdown"
          >
            <option value="" disabled>
              -- Select a target column from dataset ({columns.length} available) --
            </option>
            {columns.map((colName) => {
              const prof = profileMap[colName];
              const typeLabel = prof ? ` [${prof.type}]` : '';
              return (
                <option key={colName} value={colName}>
                  {colName} {typeLabel}
                </option>
              );
            })}
          </select>
        </div>

        {/* Selected Target Profile Preview */}
        {selectedTarget && selectedProfile && (
          <div className="target-info-preview">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--gradient-primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Target size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 800, color: 'var(--slate-default)', fontSize: '0.95rem' }}>
                  Target Variable: <code style={{ color: 'var(--iris-700)', fontFamily: 'var(--font-mono)' }}>{selectedTarget}</code>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--neutral-700)' }}>
                  Inferred Data Type: <strong style={{ color: 'var(--slate-default)' }}>{selectedProfile.type}</strong> • Missing:{' '}
                  <strong style={{ color: selectedProfile.missingCount > 0 ? 'var(--error-600)' : '#15803d' }}>
                    {selectedProfile.missingCount} ({selectedProfile.missingPercent}%)
                  </strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#15803d', fontSize: '0.8rem', fontWeight: 700 }}>
              <CheckCircle2 size={15} />
              <span>Target Configured</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

