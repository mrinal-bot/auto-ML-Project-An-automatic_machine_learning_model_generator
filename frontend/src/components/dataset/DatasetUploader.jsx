import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  Trash2, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2 
} from 'lucide-react';
import { datasetConfig } from '../../config/datasetConfig';
import { formatBytes } from '../../services/csvParser';

export default function DatasetUploader({
  selectedFile,
  datasetSummary,
  isParsing,
  parsingError,
  onFileSelected,
  onRemoveFile,
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [localError, setLocalError] = useState('');
  const fileInputRef = useRef(null);

  const validateAndProcessFile = (file) => {
    setLocalError('');

    if (!file) {
      setLocalError('No file selected.');
      return;
    }

    const fileName = file.name.toLowerCase();
    
    // Explicit XLSX/Excel detection
    if (
      fileName.endsWith('.xlsx') || 
      fileName.endsWith('.xls') || 
      (file.type && (file.type.includes('spreadsheet') || file.type.includes('excel') || file.type.includes('openxmlformats')))
    ) {
      setLocalError(
        `Unsupported format: Microsoft Excel file ("${file.name}"). MLForge AI currently supports CSV files only. Please convert your spreadsheet to a comma-separated (.csv) file and re-upload.`
      );
      return;
    }

    const isCsvExtension = fileName.endsWith('.csv');
    if (!isCsvExtension) {
      setLocalError(`Unsupported file format for "${file.name}". Only comma-separated (.csv) files are supported.`);
      return;
    }

    if (file.size > datasetConfig.maxFileSizeBytes) {
      setLocalError(`File size exceeds the limit of ${datasetConfig.maxFileSizeLabel}.`);
      return;
    }

    if (file.size === 0) {
      setLocalError('The selected file is empty (0 bytes). Please select a valid CSV dataset.');
      return;
    }

    onFileSelected(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const activeError = localError || parsingError;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Error Alert */}
      {activeError && (
        <div className="auth-alert auth-alert-error" style={{ margin: 0 }}>
          <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>{activeError}</span>
        </div>
      )}

      {/* Parsing Spinner State */}
      {isParsing && (
        <div 
          className="auth-alert auth-alert-success" 
          style={{ 
            margin: 0, 
            background: 'var(--iris-50)', 
            borderColor: 'var(--iris-200)', 
            borderLeft: '4px solid var(--iris-default)',
            color: 'var(--iris-700)' 
          }}
        >
          <div className="spinner" style={{ marginRight: '0.65rem' }} />
          <span>Reading file with Papa Parse and computing local schema statistics...</span>
        </div>
      )}

      {/* Hidden Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx,.xls,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        className="uploader-file-input"
        onChange={handleFileInputChange}
      />

      {/* Drag & Drop Zone or Selected File Chip */}
      {!datasetSummary ? (
        <div
          className={`uploader-dropzone ${isDragOver ? 'dragover' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
        >
          <div className="uploader-icon-circle">
            <UploadCloud size={32} />
          </div>

          <h4 className="uploader-heading">Drag and drop your CSV dataset here</h4>
          <p className="uploader-subtext">
            Supports comma-separated tabular datasets with column headers (up to {datasetConfig.maxFileSizeLabel}).
          </p>

          <button
            type="button"
            className="uploader-browse-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleBrowseClick();
            }}
          >
            <UploadCloud size={16} />
            <span>Browse Local Files</span>
          </button>
        </div>
      ) : (
        <div className="selected-file-chip">
          <div className="file-chip-left">
            <div className="file-chip-icon">
              <FileSpreadsheet size={24} />
            </div>
            <div>
              <div className="file-chip-name">{datasetSummary.fileName}</div>
              <div className="file-chip-meta">
                <span>{datasetSummary.fileSizeFormatted}</span>
                <span>•</span>
                <span style={{ color: '#34D399', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <CheckCircle2 size={13} />
                  <span>Valid CSV Document ({datasetSummary.totalRows.toLocaleString()} rows × {datasetSummary.totalColumns} cols)</span>
                </span>
              </div>
            </div>
          </div>

          <div className="file-chip-actions">
            <button
              type="button"
              className="file-chip-btn replace"
              onClick={handleBrowseClick}
              title="Replace dataset file"
            >
              <RefreshCw size={13} />
              <span>Replace File</span>
            </button>
            <button
              type="button"
              className="file-chip-btn remove"
              onClick={onRemoveFile}
              title="Remove selected dataset"
            >
              <Trash2 size={13} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
