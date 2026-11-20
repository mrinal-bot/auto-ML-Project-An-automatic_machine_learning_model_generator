import React from 'react';
import { 
  FileSpreadsheet, 
  Copy, 
  Layers, 
  HardDrive, 
  FileText, 
  AlertTriangle 
} from 'lucide-react';

export default function DatasetSummary({ summary }) {
  if (!summary) return null;

  return (
    <div className="dataset-metrics-grid">
      {/* 1. Filename */}
      <div className="dataset-metric-tile">
        <div className="dataset-metric-icon" style={{ background: 'rgba(37, 99, 235, 0.15)', color: '#60A5FA' }}>
          <FileText size={20} />
        </div>
        <div className="dataset-metric-info">
          <span className="dataset-metric-label">Filename</span>
          <span 
            className="dataset-metric-value" 
            style={{ fontSize: '1.05rem', wordBreak: 'break-all' }}
            title={summary.fileName}
          >
            {summary.fileName}
          </span>
        </div>
      </div>

      {/* 2. File Size */}
      <div className="dataset-metric-tile">
        <div className="dataset-metric-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399' }}>
          <HardDrive size={20} />
        </div>
        <div className="dataset-metric-info">
          <span className="dataset-metric-label">File Size</span>
          <span className="dataset-metric-value">{summary.fileSizeFormatted}</span>
        </div>
      </div>

      {/* 3. Total Rows */}
      <div className="dataset-metric-tile">
        <div className="dataset-metric-icon" style={{ background: 'rgba(124, 58, 237, 0.15)', color: '#C084FC' }}>
          <Layers size={20} />
        </div>
        <div className="dataset-metric-info">
          <span className="dataset-metric-label">Total Rows</span>
          <span className="dataset-metric-value">{summary.totalRows.toLocaleString()}</span>
        </div>
      </div>

      {/* 4. Total Columns */}
      <div className="dataset-metric-tile">
        <div className="dataset-metric-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8' }}>
          <FileSpreadsheet size={20} />
        </div>
        <div className="dataset-metric-info">
          <span className="dataset-metric-label">Total Columns</span>
          <span className="dataset-metric-value">{summary.totalColumns} cols</span>
        </div>
      </div>

      {/* 5. Total Missing Cells */}
      <div className="dataset-metric-tile">
        <div 
          className="dataset-metric-icon" 
          style={{ 
            background: summary.totalMissingCells > 0 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)', 
            color: summary.totalMissingCells > 0 ? '#F87171' : '#34D399' 
          }}
        >
          <AlertTriangle size={20} />
        </div>
        <div className="dataset-metric-info">
          <span className="dataset-metric-label">Total Missing Cells</span>
          <span 
            className="dataset-metric-value"
            style={{ color: summary.totalMissingCells > 0 ? '#F87171' : '#34D399' }}
          >
            {summary.totalMissingCells.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 6. Duplicate Rows */}
      <div className="dataset-metric-tile">
        <div 
          className="dataset-metric-icon" 
          style={{ 
            background: summary.duplicateRowsCount > 0 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(148, 163, 184, 0.15)', 
            color: summary.duplicateRowsCount > 0 ? '#FBBF24' : '#94A3B8' 
          }}
        >
          <Copy size={20} />
        </div>
        <div className="dataset-metric-info">
          <span className="dataset-metric-label">Duplicate Rows</span>
          <span className="dataset-metric-value">{summary.duplicateRowsCount}</span>
        </div>
      </div>
    </div>
  );
}
