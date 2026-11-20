import React, { useState } from 'react';
import { 
  UploadCloud, 
  SearchCode, 
  BrainCircuit, 
  Sliders, 
  Code2, 
  Bug, 
  LineChart, 
  FileCheck2,
  Sparkles,
  Bot,
  ChevronRight,
  Terminal,
  FileText
} from 'lucide-react';

const workflowStages = [
  {
    step: '01',
    title: 'Dataset Upload',
    role: 'Input Ingestion Agent',
    icon: UploadCloud,
    description: 'User uploads CSV or tabular dataset. Ingestion agents perform checksum and initial schema inspection.',
    inputs: ['user_raw_data.csv', 'upload_metadata.json'],
    agentTask: 'Executes automated schema detection, column typing, duplicate scanning, and data integrity verification.',
    outputs: ['dataset_manifest.json', 'preliminary_stats.parquet']
  },
  {
    step: '02',
    title: 'Requirement Analysis',
    role: 'NLU Intent Agent',
    icon: SearchCode,
    description: 'Translates natural language user objectives into formal target variables, metrics, and problem constraints.',
    inputs: ['user_prompt.txt', 'dataset_manifest.json'],
    agentTask: 'Parses objective ("predict customer churn", "forecast revenue") into structured supervised/unsupervised tasks.',
    outputs: ['task_contract.json', 'evaluation_metrics_spec.json']
  },
  {
    step: '03',
    title: 'Planning Agent',
    role: 'Architect Agent',
    icon: BrainCircuit,
    description: 'Formulates a multi-stage execution graph specifying feature selection, model families, and cross-validation.',
    inputs: ['task_contract.json', 'preliminary_stats.parquet'],
    agentTask: 'Determines optimal algorithm pool (Tree-based, Ensembles, Neural), loss functions, and data split strategies.',
    outputs: ['execution_dag.json', 'model_candidates_pool.json']
  },
  {
    step: '04',
    title: 'Preprocessing Engine',
    role: 'Feature Pipeline Agent',
    icon: Sliders,
    description: 'Executes automated missing value imputation, categorical encoding, feature scaling, and outlier handling.',
    inputs: ['execution_dag.json', 'user_raw_data.csv'],
    agentTask: 'Generates scikit-learn compatible ColumnTransformers, TargetEncoders, and handles distribution skews.',
    outputs: ['pipeline_transform.pkl', 'train_test_split.npz']
  },
  {
    step: '05',
    title: 'Coding Agent',
    role: 'Code Generation Agent',
    icon: Code2,
    description: 'Generates modular Python scripts implementing the models (XGBoost, LightGBM, Random Forest, Neural Nets).',
    inputs: ['execution_dag.json', 'pipeline_transform.pkl'],
    agentTask: 'Synthesizes clean, documented Python scripts with strict type hints, logging, and Optuna hyperparameter hooks.',
    outputs: ['train_models.py', 'hyperparameter_tuning.py']
  },
  {
    step: '06',
    title: 'Execution & Debugging',
    role: 'Self-Healing Engine',
    icon: Bug,
    description: 'Executes code in a sandbox. Inspects tracebacks and iteratively patches runtime faults without human intervention.',
    inputs: ['train_models.py', 'sandbox_environment'],
    agentTask: 'Captures stderr, diagnoses shape mismatches or memory constraints, and applies AST-level code corrections.',
    outputs: ['execution_audit.log', 'self_healed_train.py']
  },
  {
    step: '07',
    title: 'Model Evaluation',
    role: 'Validation Agent',
    icon: LineChart,
    description: 'Ranks candidate models across ROC-AUC, F1-Score, RMSE, and explains decisions using SHAP value analysis.',
    inputs: ['trained_models_weights/', 'train_test_split.npz'],
    agentTask: 'Generates confusion matrices, ROC curves, calibration plots, and tree SHAP feature attribution rankings.',
    outputs: ['leaderboard.json', 'shap_importance_plot.png']
  },
  {
    step: '08',
    title: 'Final Report Generation',
    role: 'Executive Agent',
    icon: FileCheck2,
    description: 'Compiles production-ready artifacts, trained model binaries, and comprehensive visual executive documentation.',
    inputs: ['leaderboard.json', 'pipeline_transform.pkl', 'execution_audit.log'],
    agentTask: 'Packages serialized .joblib model bundle, deployment inference API, and interactive HTML audit report.',
    outputs: ['model_bundle.zip', 'executive_summary.pdf', 'api_endpoint.py']
  }
];

export default function Workflow() {
  const [activeStep, setActiveStep] = useState(0);

  const currentStage = workflowStages[activeStep];
  const CurrentIcon = currentStage.icon;

  return (
    <section id="how-it-works" className="section-padding workflow-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Agentic Architecture</span>
          </div>
          <h2 className="section-title">
            How <span className="text-gradient">MLForge AI</span> Operates
          </h2>
          <p className="section-subtitle">
            A synchronized multi-agent pipeline replacing single monolithic bots with specialized autonomous collaborators that guarantee end-to-end reliability.
          </p>
        </div>

        {/* Workflow 8-Stage Timeline Grid */}
        <div className="workflow-timeline">
          {workflowStages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = idx === activeStep;
            return (
              <div 
                key={stage.step} 
                className={`glass-card workflow-step-card ${isSelected ? 'workflow-step-active' : ''}`}
                onClick={() => setActiveStep(idx)}
                style={{
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--iris-default)' : undefined,
                  boxShadow: isSelected ? 'var(--shadow-lg)' : undefined
                }}
              >
                <div 
                  className="step-badge"
                  style={{
                    background: isSelected ? 'var(--iris-default)' : undefined,
                    color: isSelected ? '#FFFFFF' : undefined
                  }}
                >
                  {stage.step}
                </div>
                <div className="step-icon-wrap">
                  <Icon size={26} color={isSelected ? 'var(--iris-default)' : 'var(--marguerite-default)'} />
                </div>
                <h4>{stage.title}</h4>
                <p>{stage.description}</p>
                <div className="agent-type-pill">{stage.role}</div>
              </div>
            );
          })}
        </div>

        {/* Interactive Deep-Dive Inspector Panel */}
        <div className="glass-card workflow-inspector" style={{ marginTop: '2.5rem', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--slate-100)', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--iris-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                <CurrentIcon size={22} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: '700', letterSpacing: '0.05em' }}>
                  Stage {currentStage.step} Inspection
                </span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--slate-default)', fontWeight: '700' }}>
                  {currentStage.title} — <span style={{ color: 'var(--iris-default)' }}>{currentStage.role}</span>
                </h3>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn btn-secondary" 
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.825rem' }}
                onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : workflowStages.length - 1))}
              >
                Previous Stage
              </button>
              <button 
                className="btn btn-primary" 
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.825rem' }}
                onClick={() => setActiveStep((prev) => (prev < workflowStages.length - 1 ? prev + 1 : 0))}
              >
                Next Stage <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {/* Input Artifacts */}
            <div style={{ background: 'var(--neutral-50)', borderRadius: '12px', padding: '1.25rem', border: '1px solid var(--slate-100)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--iris-700)', fontSize: '0.85rem', fontWeight: '700' }}>
                <FileText size={16} />
                <span>Input Artifacts</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {currentStage.inputs.map((inp, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--slate-default)', background: 'var(--neutral-white)', border: '1px solid var(--slate-200)', padding: '0.35rem 0.6rem', borderRadius: '6px' }}>
                    📄 {inp}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cognitive Task */}
            <div style={{ background: 'var(--marguerite-50)', borderRadius: '12px', padding: '1.25rem', border: '1px solid var(--marguerite-200)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--marguerite-600)', fontSize: '0.85rem', fontWeight: '700' }}>
                <Terminal size={16} />
                <span>Agent Cognitive Protocol</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-default)', lineHeight: '1.6' }}>
                {currentStage.agentTask}
              </p>
            </div>

            {/* Output Artifacts */}
            <div style={{ background: 'var(--success-bg)', borderRadius: '12px', padding: '1.25rem', border: '1px solid #bbf7d0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#15803d', fontSize: '0.85rem', fontWeight: '700' }}>
                <FileCheck2 size={16} />
                <span>Output Artifacts</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {currentStage.outputs.map((out, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#166534', background: 'var(--neutral-white)', padding: '0.35rem 0.6rem', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
                    📦 {out}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Multi-Agent Orchestration Notice */}
        <div className="workflow-notice">
          <div className="workflow-notice-text">
            <Bot size={22} className="brand-highlight" />
            <span>
              <strong>Autonomous Multi-Agent Orchestration:</strong> Every stage is governed by a dedicated specialized agent verifying outputs before passing artifacts to downstream modules.
            </span>
          </div>
          <a href="#features" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            <span>View Agent Capabilities</span>
          </a>
        </div>
      </div>
    </section>
  );
}
