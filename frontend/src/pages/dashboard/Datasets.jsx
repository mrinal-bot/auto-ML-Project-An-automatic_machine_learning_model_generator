import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, 
  UploadCloud, 
  FileSpreadsheet, 
  CheckCircle2, 
  Trash2, 
  RefreshCw, 
  PlusCircle, 
  ArrowRight,
  Eye,
  Columns3
} from 'lucide-react';

import DatasetUploader from '../../components/dataset/DatasetUploader';
import DatasetSummary from '../../components/dataset/DatasetSummary';
import DatasetPreview from '../../components/dataset/DatasetPreview';
import ColumnInformation from '../../components/dataset/ColumnInformation';

import { parseCSVFile } from '../../services/csvParser';
import { datasetService } from '../../services/datasetService';

export default function Datasets() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [datasetSummary, setDatasetSummary] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parsingError, setParsingError] = useState('');
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'columns'

  // Restore draft if user previously uploaded a dataset in CreateProject
  useEffect(() => {
    const draft = datasetService.getConfigDraft();
    if (draft && draft.dataset) {
      setDatasetSummary(draft.dataset);
      setSelectedFile({ name: draft.dataset.fileName, size: draft.dataset.fileSize });
    }
  }, []);

  const handleFileSelected = async (file) => {
    setSelectedFile(file);
    setIsParsing(true);
    setParsingError('');

    try {
      const summary = await parseCSVFile(file);
      setDatasetSummary(summary);

      // Save to draft so user can proceed directly to CreateProject
      datasetService.saveConfigDraft({
        dataset: summary,
        currentStep: 1,
      });
    } catch (err) {
      setParsingError(err.message || 'Failed to parse CSV dataset. Please check file structure.');
      setDatasetSummary(null);
    } finally {
      setIsParsing(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setDatasetSummary(null);
    setParsingError('');
    datasetService.clearConfigDraft();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-default)', marginBottom: '0.25rem' }}>
            Dataset Library
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Upload, parse, and inspect tabular datasets locally before autonomous pipeline training.
          </p>
        </div>

        {datasetSummary && (
          <Link 
            to="/dashboard/create-project"
            className="btn-create-highlight"
          >
            <PlusCircle size={18} />
            <span>Configure ML Project</span>
            <ArrowRight size={16} />
          </Link>
        )}
      </div>

      {/* Dataset Uploader Zone */}
      <div className="dash-card">
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-default)', marginBottom: '0.25rem' }}>
            {datasetSummary ? 'Active Inspected Dataset' : 'Upload & Inspect Local Dataset'}
          </h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
            {datasetSummary 
              ? 'Dataset schema and preview rows parsed locally in browser memory.' 
              : 'Supports comma-separated (.csv) files. Excel (.xlsx) files are not currently supported.'}
          </p>
        </div>

        <DatasetUploader
          selectedFile={selectedFile}
          datasetSummary={datasetSummary}
          isParsing={isParsing}
          parsingError={parsingError}
          onFileSelected={handleFileSelected}
          onRemoveFile={handleRemoveFile}
        />
      </div>

      {/* Inspected Dataset Summary & Detailed Inspection */}
      {datasetSummary && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Actual Dataset Statistics Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-default)' }}>
                Dataset Profile Overview
              </h3>
              <span className="status-pill completed">
                <CheckCircle2 size={13} />
                <span>Verified Schema</span>
              </span>
            </div>
            <DatasetSummary summary={datasetSummary} />
          </div>

          {/* Inspection View with Tabs */}
          <div className="dash-card">
            {/* View Switcher Tabs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <button
                type="button"
                className={`table-action-btn ${activeTab === 'preview' ? 'active' : ''}`}
                onClick={() => setActiveTab('preview')}
                style={{
                  background: activeTab === 'preview' ? 'var(--iris-default)' : 'var(--neutral-white)',
                  color: activeTab === 'preview' ? '#FFFFFF' : 'var(--slate-default)',
                  padding: '0.55rem 1.15rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  border: activeTab === 'preview' ? '1px solid var(--iris-default)' : '1px solid var(--slate-200)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  cursor: 'pointer',
                }}
              >
                <Eye size={16} />
                <span>First 10 Rows Preview</span>
              </button>

              <button
                type="button"
                className={`table-action-btn ${activeTab === 'columns' ? 'active' : ''}`}
                onClick={() => setActiveTab('columns')}
                style={{
                  background: activeTab === 'columns' ? 'var(--iris-default)' : 'var(--neutral-white)',
                  color: activeTab === 'columns' ? '#FFFFFF' : 'var(--slate-default)',
                  padding: '0.55rem 1.15rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  border: activeTab === 'columns' ? '1px solid var(--iris-default)' : '1px solid var(--slate-200)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  cursor: 'pointer',
                }}
              >
                <Columns3 size={16} />
                <span>Column Profiling ({datasetSummary.columnProfiles.length} columns)</span>
              </button>
            </div>

            {/* Tab 1: Preview Table */}
            {activeTab === 'preview' && (
              <DatasetPreview summary={datasetSummary} />
            )}

            {/* Tab 2: Column Inspection */}
            {activeTab === 'columns' && (
              <ColumnInformation columnProfiles={datasetSummary.columnProfiles} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
