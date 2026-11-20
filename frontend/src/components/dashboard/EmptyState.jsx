import React from 'react';
import { Search, FolderOpen } from 'lucide-react';

export default function EmptyState({ 
  icon: Icon = Search, 
  title = 'No records found', 
  description = 'Try adjusting your search criteria or filters.', 
  action 
}) {
  return (
    <div className="empty-table-state">
      <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.08)', marginBottom: '0.75rem', color: 'var(--color-accent)' }}>
        <Icon size={26} />
      </div>
      <h4 style={{ color: 'var(--slate-default)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.25rem' }}>
        {title}
      </h4>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.825rem', maxWidth: '380px', margin: '0 auto', lineHeight: '1.5' }}>
        {description}
      </p>
      {action && (
        <div style={{ marginTop: '1rem' }}>
          {action}
        </div>
      )}
    </div>
  );
}

