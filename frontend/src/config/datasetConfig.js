/**
 * MLForge AI - Phase 4: Dataset & ML Configuration
 * Centralized configuration for CSV validation, ML tasks, and workflow stepper.
 */

export const datasetConfig = {
  // File restrictions
  allowedExtensions: ['.csv'],
  allowedMimeTypes: ['text/csv', 'application/vnd.ms-excel', 'text/plain'],
  maxFileSizeBytes: 50 * 1024 * 1024, // 50 MB
  maxFileSizeLabel: '50 MB',
  previewRowLimit: 10,

  // ML Task Types
  taskTypes: {
    Classification: {
      id: 'Classification',
      title: 'Classification',
      badge: 'Discrete Categories',
      subtitle: 'Predicting categorical or class-based outcomes',
      description: 'Select this when your target variable belongs to distinct classes or labels (e.g., customer churn [Yes/No], credit risk [Low/Med/High], or fraud detection).',
      example: 'Example: "Predict whether a customer will cancel their subscription."',
      iconName: 'Layers',
      defaultMetrics: ['ROC-AUC', 'F1-Score', 'Precision', 'Recall', 'Accuracy'],
    },
    Regression: {
      id: 'Regression',
      title: 'Regression',
      badge: 'Continuous Numbers',
      subtitle: 'Predicting continuous numerical outcomes',
      description: 'Select this when your target variable is a continuous numerical quantity (e.g., house prices, sales revenue, store footfall, or delivery transit time).',
      example: 'Example: "Predict the final sale price of a residential property."',
      iconName: 'TrendingUp',
      defaultMetrics: ['RMSE', 'MAE', 'R² Score', 'MAPE'],
    },
  },

  // 6 Workflow Steps
  steps: [
    { number: 1, id: 'upload', title: 'Dataset Upload', short: 'Upload' },
    { number: 2, id: 'preview', title: 'Dataset Preview', short: 'Preview' },
    { number: 3, id: 'task', title: 'ML Task Configuration', short: 'Task Type' },
    { number: 4, id: 'requirement', title: 'Requirement Description', short: 'Objective' },
    { number: 5, id: 'target', title: 'Target Column Selection', short: 'Target' },
    { number: 6, id: 'summary', title: 'Configuration Review', short: 'Review' },
  ],
};

