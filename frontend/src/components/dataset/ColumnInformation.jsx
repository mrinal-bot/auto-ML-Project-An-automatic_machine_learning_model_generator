import React from 'react';
import { Columns3, AlertTriangle, CheckCircle2, Hash, Type } from 'lucide-react';

const typeBadgeConfig = {
  Integer: { label: 'Integer', className: 'col-type-integer' },
  Float: { label: 'Float', className: 'col-type-float' },
  String: { label: 'String', className: 'col-type-string' },
  Boolean: { label: 'Boolean', className: 'col-type-boolean' },
  Date: { label: 'Date', className: 'col-type-date' },
  Unknown: { label: 'Unknown', className: 'col-type-unknown' },
};

export default function ColumnInformation({ columnProfiles = [] }) {
  if (!columnProfiles || columnProfiles.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', color: '#FFFFFF', fontWeight: 700 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <Columns3 size={16} className="brand-highlight" />
          <span>Column Inspection & Schema Inferences ({columnProfiles.length} features)</span>
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          Detailed statistics per feature
        </span>
      </div>

      <div className="column-inspection-table-wrap">
        <table className="column-inspection-table">
          <thead>
            <tr>
              <th style={{ width: '40px', textAlign: 'center' }}>#</th>
              <th>Column Name</th>
              <th>Inferred Type</th>
              <th style={{ textAlign: 'right' }}>Missing Values</th>
              <th style={{ textAlign: 'right' }}>Non-Missing Values</th>
              <th style={{ textAlign: 'right' }}>Unique Values</th>
            </tr>
          </thead>
          <tbody>
            {columnProfiles.map((col, idx) => {
              const badge = typeBadgeConfig[col.type] || { label: col.type, className: 'col-type-string' };
              const hasMissing = col.missingCount > 0;

              return (
                <tr key={col.name}>
                  <td className="row-idx-cell">{idx + 1}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="column-info-name">{col.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`col-header-type ${badge.className}`}>
                      {badge.label}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <span style={{ color: hasMissing ? '#F87171' : '#34D399', fontWeight: 600 }}>
                        {col.missingCount.toLocaleString()}
                      </span>
                      <span style={{ fontSize: '0.725rem', color: 'var(--color-text-muted)' }}>
                        ({col.missingPercent}%)
                      </span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {col.nonMissingCount.toLocaleString()}
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--accent)' }}>
                    {col.uniqueCount.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
