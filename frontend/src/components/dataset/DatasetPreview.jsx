import React from 'react';
import { Eye, FileSpreadsheet, Database } from 'lucide-react';
import EmptyState from '../dashboard/EmptyState';
import { isValueMissing } from '../../services/csvParser';

const typeClassMap = {
  Integer: 'col-type-integer',
  Float: 'col-type-float',
  String: 'col-type-string',
  Boolean: 'col-type-boolean',
  Date: 'col-type-date',
  Unknown: 'col-type-unknown',
};

export default function DatasetPreview({ summary }) {
  if (!summary || !summary.previewRows || summary.previewRows.length === 0) {
    return (
      <EmptyState
        icon={Database}
        title="No dataset selected for preview"
        description="Upload or select a valid CSV dataset in Step 1 to inspect its rows and infer column schemas."
      />
    );
  }

  // Map header to its inferred type
  const typeByHeader = {};
  if (summary.columnProfiles) {
    summary.columnProfiles.forEach((cp) => {
      typeByHeader[cp.name] = cp.type;
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.825rem', color: 'var(--color-text-secondary)' }}>
        <span>
          Showing first <strong style={{ color: 'var(--slate-default)' }}>{summary.previewRows.length}</strong> of{' '}
          <strong style={{ color: 'var(--slate-default)' }}>{summary.totalRows.toLocaleString()}</strong> data rows ({summary.totalColumns} columns):
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          Scroll horizontally to view all features →
        </span>
      </div>

      <div className="dataset-preview-table-wrap">
        <table className="dataset-preview-table">
          <thead>
            <tr>
              <th className="row-idx-cell">#</th>
              {summary.headers.map((header) => {
                const colType = typeByHeader[header] || 'String';
                const typeClass = typeClassMap[colType] || 'col-type-string';
                return (
                  <th key={header}>
                    <div className="col-header-wrap">
                      <span className="col-header-name">{header}</span>
                      <span className={`col-header-type ${typeClass}`}>{colType}</span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {summary.previewRows.map((row, rIdx) => (
              <tr key={rIdx}>
                <td className="row-idx-cell">{rIdx + 1}</td>
                {summary.headers.map((header) => {
                  const val = row[header];
                  const empty = isValueMissing(val);
                  return (
                    <td key={header} style={{ color: empty ? '#EF4444' : undefined, fontStyle: empty ? 'italic' : 'normal' }}>
                      {empty ? 'null' : String(val)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
