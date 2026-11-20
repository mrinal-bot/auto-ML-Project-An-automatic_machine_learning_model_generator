import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Bot, 
  FileSpreadsheet,
  Database,
  Layers,
  Sparkles
} from 'lucide-react';

import ConfigurationStepper from '../../components/dataset/ConfigurationStepper';
import DatasetUploader from '../../components/dataset/DatasetUploader';
import DatasetSummary from '../../components/dataset/DatasetSummary';
import DatasetPreview from '../../components/dataset/DatasetPreview';
import ColumnInformation from '../../components/dataset/ColumnInformation';
import TaskTypeSelector from '../../components/dataset/TaskTypeSelector';
import RequirementInput from '../../components/dataset/RequirementInput';
import TargetColumnSelector from '../../components/dataset/TargetColumnSelector';
import ConfigurationSummary from '../../components/dataset/ConfigurationSummary';

import { datasetConfig } from '../../config/datasetConfig';
import { parseCSVFile } from '../../services/csvParser';
import { datasetService } from '../../services/datasetService';

export default function CreateProject() {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);

  // Dataset State
  const [selectedFile, setSelectedFile] = useState(null);
  const [datasetSummary, setDatasetSummary] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parsingError, setParsingError] = useState('');

  // Configuration State
  const [taskType, setTaskType] = useState('');
  const [objective, setObjective] = useState('');
  const [targetColumn, setTargetColumn] = useState('');

  // Validation & Ready State
  const [stepError, setStepError] = useState('');
  const [isWorkflowReady, setIsWorkflowReady] = useState(false);

  // Restore draft from sessionStorage on initial mount if available
  useEffect(() => {
    const draft = datasetService.getConfigDraft();
    if (draft) {
      if (draft.dataset) {
        setDatasetSummary(draft.dataset);
        setSelectedFile({ name: draft.dataset.fileName, size: draft.dataset.fileSize });
        setMaxStepReached(prev => Math.max(prev, 2));
      }
      if (draft.taskType) {
        setTaskType(draft.taskType);
        setMaxStepReached(prev => Math.max(prev, 3));
      }
      if (draft.objective) {
        setObjective(draft.objective);
        setMaxStepReached(prev => Math.max(prev, 4));
      }
      if (draft.targetColumn) {
        setTargetColumn(draft.targetColumn);
        setMaxStepReached(prev => Math.max(prev, 5));
      }
      if (draft.currentStep) {
        setCurrentStep(draft.currentStep);
      }
    }
  }, []);

  // Sync draft to sessionStorage
  const saveCurrentDraft = (overrides = {}) => {
    const draftData = {
      dataset: datasetSummary,
      taskType: overrides.taskType !== undefined ? overrides.taskType : taskType,
      objective: overrides.objective !== undefined ? overrides.objective : objective,
      targetColumn: overrides.targetColumn !== undefined ? overrides.targetColumn : targetColumn,
      currentStep: overrides.currentStep !== undefined ? overrides.currentStep : currentStep,
    };
    datasetService.saveConfigDraft(draftData);
  };

  // Handle File Selection and Parsing
  const handleFileSelected = async (file) => {
    setSelectedFile(file);
    setIsParsing(true);
    setParsingError('');
    setStepError('');
    setIsWorkflowReady(false);

    try {
      const summary = await parseCSVFile(file);
      setDatasetSummary(summary);
      setMaxStepReached(prev => Math.max(prev, 2));

      // Reset target column if previous target is not in newly uploaded dataset
      if (targetColumn && !summary.headers.includes(targetColumn)) {
        setTargetColumn('');
      }

      datasetService.saveConfigDraft({
        dataset: summary,
        taskType,
        objective,
        targetColumn: summary.headers.includes(targetColumn) ? targetColumn : '',
        currentStep: 1,
      });
    } catch (err) {
      setParsingError(err.message || 'Failed to parse CSV dataset. Please check file structure.');
      setDatasetSummary(null);
    } finally {
      setIsParsing(false);
    }
  };

  // Handle File Removal
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setDatasetSummary(null);
    setParsingError('');
    setStepError('');
    setTargetColumn('');
    setCurrentStep(1);
    setMaxStepReached(1);
    setIsWorkflowReady(false);
    datasetService.clearConfigDraft();
  };

  // Step Navigation Validation
  const handleNextStep = () => {
    setStepError('');

    if (currentStep === 1) {
      if (!datasetSummary) {
        setStepError('Please upload and verify a valid CSV dataset before advancing to the next step.');
        return;
      }
      setCurrentStep(2);
      setMaxStepReached(prev => Math.max(prev, 2));
      saveCurrentDraft({ currentStep: 2 });
    } else if (currentStep === 2) {
      if (!datasetSummary) {
        setStepError('No dataset available. Please return to Step 1 and upload a CSV file.');
        return;
      }
      setCurrentStep(3);
      setMaxStepReached(prev => Math.max(prev, 3));
      saveCurrentDraft({ currentStep: 3 });
    } else if (currentStep === 3) {
      if (!taskType) {
        setStepError('Please select a machine learning task type (Classification or Regression).');
        return;
      }
      setCurrentStep(4);
      setMaxStepReached(prev => Math.max(prev, 4));
      saveCurrentDraft({ currentStep: 4 });
    } else if (currentStep === 4) {
      if (!objective || objective.trim().length < 10) {
        setStepError('Please enter a natural-language description of your machine learning objective (at least 10 characters).');
        return;
      }
      setCurrentStep(5);
      setMaxStepReached(prev => Math.max(prev, 5));
      saveCurrentDraft({ currentStep: 5 });
    } else if (currentStep === 5) {
      if (!targetColumn) {
        setStepError('Please select a target variable column from your dataset.');
        return;
      }
      setCurrentStep(6);
      setMaxStepReached(prev => Math.max(prev, 6));
      saveCurrentDraft({ currentStep: 6 });
    }
  };

  const handlePrevStep = () => {
    setStepError('');
    if (currentStep > 1) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      saveCurrentDraft({ currentStep: prev });
    }
  };

  const handleStepClick = (stepNum) => {
    if (stepNum <= maxStepReached) {
      setStepError('');
      setCurrentStep(stepNum);
      saveCurrentDraft({ currentStep: stepNum });
    }
  };

  // Final Action: Continue to Agent Workflow
  const handleContinueWorkflow = () => {
    setIsWorkflowReady(true);
    saveCurrentDraft({ currentStep: 6 });
  };

  // Step metadata lookup
  const currentStepDef = datasetConfig.steps.find(s => s.number === currentStep) || datasetConfig.steps[0];

  return (
    <div className="create-project-container">
      {/* Top Header & Navigation */}
      <div className="create-project-header">
        <div className="create-project-title-group">
          <h1>Dataset Upload & ML Configuration</h1>
          <p>
            Configure your tabular dataset and machine learning task parameters for autonomous agentic pipeline execution.
          </p>
        </div>

        <Link to="/dashboard" className="back-to-dashboard-btn">
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Stepper Navigation Track */}
      <ConfigurationStepper
        currentStep={currentStep}
        onStepClick={handleStepClick}
        maxStepReached={maxStepReached}
      />

      {/* Main Step Card Container */}
      <div className="step-card">
        {/* Step Header */}
        <div className="step-card-header">
          <div className="step-card-header-text">
            <h3>{currentStepDef.title}</h3>
            <p>
              {currentStep === 1 && 'Upload a comma-separated tabular CSV dataset from your local machine.'}
              {currentStep === 2 && 'Inspect parsed rows, columns, and inferred data types computed from your dataset.'}
              {currentStep === 3 && 'Select whether your target prediction problem is Classification or Regression.'}
              {currentStep === 4 && 'Describe your machine learning goal and business criteria using natural language.'}
              {currentStep === 5 && 'Select the target column (Y) that the autonomous agent swarm will optimize models to predict.'}
              {currentStep === 6 && 'Review your complete configuration package before handing off to autonomous agents.'}
            </p>
          </div>

          <div className="step-badge-indicator">
            <span>Step 0{currentStep} of 0{datasetConfig.steps.length}</span>
          </div>
        </div>

        {/* Step-specific Error Alert */}
        {stepError && (
          <div className="auth-alert auth-alert-error" style={{ margin: 0 }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{stepError}</span>
          </div>
        )}

        {/* Step Body Content */}
        <div className="step-card-body" style={{ minHeight: '260px' }}>
          {/* STEP 1: Dataset Upload */}
          {currentStep === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <DatasetUploader
                selectedFile={selectedFile}
                datasetSummary={datasetSummary}
                isParsing={isParsing}
                parsingError={parsingError}
                onFileSelected={handleFileSelected}
                onRemoveFile={handleRemoveFile}
              />

              {datasetSummary && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--slate-default)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <CheckCircle2 size={16} style={{ color: '#15803d' }} />
                    <span>Dataset Parsed Successfully</span>
                  </div>
                  <DatasetSummary summary={datasetSummary} />
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Dataset Preview */}
          {currentStep === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <DatasetSummary summary={datasetSummary} />
              <DatasetPreview summary={datasetSummary} />
              <ColumnInformation columnProfiles={datasetSummary?.columnProfiles} />
            </div>
          )}

          {/* STEP 3: ML Task Configuration */}
          {currentStep === 3 && (
            <TaskTypeSelector
              selectedTask={taskType}
              onSelectTask={(selected) => {
                setTaskType(selected);
                setStepError('');
                saveCurrentDraft({ taskType: selected });
              }}
              error={stepError}
            />
          )}

          {/* STEP 4: Requirement Description */}
          {currentStep === 4 && (
            <RequirementInput
              value={objective}
              onChange={(text) => {
                setObjective(text);
                setStepError('');
                saveCurrentDraft({ objective: text });
              }}
              error={stepError}
            />
          )}

          {/* STEP 5: Target Column Selection */}
          {currentStep === 5 && (
            <TargetColumnSelector
              columns={datasetSummary?.headers || []}
              columnProfiles={datasetSummary?.columnProfiles || []}
              selectedTarget={targetColumn}
              onSelectTarget={(col) => {
                setTargetColumn(col);
                setStepError('');
                saveCurrentDraft({ targetColumn: col });
              }}
              error={stepError}
            />
          )}

          {/* STEP 6: Configuration Review & Summary */}
          {currentStep === 6 && (
            <ConfigurationSummary
              config={{
                dataset: datasetSummary,
                taskType,
                objective,
                targetColumn,
              }}
              onEditStep={(stepNum) => handleStepClick(stepNum)}
              onContinueWorkflow={handleContinueWorkflow}
              isWorkflowReady={isWorkflowReady}
            />
          )}
        </div>

        {/* Step Navigation Controls Footer */}
        <div className="step-footer-controls">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                className="btn-step-prev"
                onClick={handlePrevStep}
              >
                <ArrowLeft size={16} />
                <span>Previous Step</span>
              </button>
            )}
          </div>

          <div>
            {currentStep < 6 ? (
              <button
                type="button"
                className="btn-step-next"
                onClick={handleNextStep}
                disabled={currentStep === 1 && !datasetSummary}
              >
                <span>Continue to Step 0{currentStep + 1}</span>
                <ArrowRight size={16} />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}