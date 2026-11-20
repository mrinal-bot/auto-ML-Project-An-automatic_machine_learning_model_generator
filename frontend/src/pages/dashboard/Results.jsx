import React, { useState, useEffect } from 'react';
import { BrainCircuit, Award, Download } from 'lucide-react';
import EmptyState from '../../components/dashboard/EmptyState';
import { dashboardService } from '../../services/dashboardService';

export default function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResults() {
      try {
        setLoading(true);
        const data = await dashboardService.getResults();
        setResults(data || []);
      } catch (err) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }
    loadResults();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-default)', marginBottom: '0.25rem' }}>
          Model Results & Leaderboards
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
          Review cross-validation metrics, algorithm benchmarking, and serialized model artifacts.
        </p>
      </div>

      <div className="dash-card">
        <div className="table-responsive">
          <table className="projects-table">
            <thead>
              <tr>
                <th>Synthesized Model</th>
                <th>Project Context</th>
                <th>Benchmark Metric</th>
                <th>Generation Date</th>
                <th>Tier</th>
                <th style={{ textAlign: 'right' }}>Artifacts</th>
              </tr>
            </thead>
            <tbody>
              {results && results.length > 0 ? (
                results.map((r, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <BrainCircuit size={18} color="var(--marguerite-default)" />
                        <span style={{ fontWeight: 700, color: 'var(--slate-default)' }}>{r.model}</span>
                      </div>
                    </td>
                    <td>{r.project}</td>
                    <td>
                      <span style={{ fontWeight: 700, color: '#15803d' }}>{r.score}</span>
                    </td>
                    <td>{r.date}</td>
                    <td>
                      <span className="status-pill completed">
                        <Award size={12} />
                        <span>{r.rank}</span>
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="table-action-btn"
                        onClick={() => alert('Model artifact weights download enabled in future release.')}
                      >
                        <Download size={13} />
                        <span>weights.joblib</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <EmptyState 
                      icon={BrainCircuit}
                      title="No model results available"
                      description="Trained candidate algorithms, hyperparameter tuning scores, and evaluation rankings will appear here once an autonomous pipeline completes."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
