import React, { useState, useEffect } from 'react';
import { FileText, Download, Eye, FileCheck2 } from 'lucide-react';
import EmptyState from '../../components/dashboard/EmptyState';
import { dashboardService } from '../../services/dashboardService';

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReports() {
      try {
        setLoading(true);
        const data = await dashboardService.getReports();
        setReports(data || []);
      } catch (err) {
        setReports([]);
      } finally {
        setLoading(false);
      }
    }
    loadReports();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-default)', marginBottom: '0.25rem' }}>
          Automated Reports & Documentation
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
          Download executive summaries, feature attribution plots, and compliance audits compiled by the Reporter Agent.
        </p>
      </div>

      <div className="dash-card">
        <div className="table-responsive">
          <table className="projects-table">
            <thead>
              <tr>
                <th>Report Document</th>
                <th>Available Formats</th>
                <th>File Size</th>
                <th>Generated On</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports && reports.length > 0 ? (
                reports.map((rep, idx) => (
                  <tr key={idx}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <FileCheck2 size={18} color="#15803d" />
                        <span style={{ fontWeight: 700, color: 'var(--slate-default)' }}>{rep.title}</span>
                      </div>
                    </td>
                    <td>{rep.format}</td>
                    <td>{rep.size}</td>
                    <td>{rep.generated}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button 
                          className="table-action-btn"
                          onClick={() => alert('PDF report viewer will open in future release.')}
                        >
                          <Eye size={13} />
                          <span>Preview</span>
                        </button>
                        <button 
                          className="table-action-btn"
                          onClick={() => alert('Report download initiated.')}
                        >
                          <Download size={13} />
                          <span>Download</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <EmptyState 
                      icon={FileText}
                      title="No reports generated yet"
                      description="Comprehensive visual reports, SHAP decision plots, and model governance summaries will be compiled once an automated ML experiment completes."
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
