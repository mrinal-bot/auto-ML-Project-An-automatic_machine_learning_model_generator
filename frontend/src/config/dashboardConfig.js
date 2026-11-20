/**
 * MLForge AI - Centralized Dashboard Configuration
 * Defines table columns, status themes, quick actions, and stats meta.
 * Prepared for future database integration with blank initial states.
 */

export const statusConfig = {
  Completed: {
    label: 'Completed',
    className: 'completed',
    color: '#34D399',
    bg: 'rgba(16, 185, 129, 0.12)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    iconName: 'CheckCircle2',
  },
  Processing: {
    label: 'Processing',
    className: 'processing',
    color: '#60A5FA',
    bg: 'rgba(59, 130, 246, 0.12)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    iconName: 'Clock',
  },
  Failed: {
    label: 'Failed',
    className: 'failed',
    color: '#F87171',
    bg: 'rgba(239, 68, 68, 0.12)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    iconName: 'AlertCircle',
  },
};

export const projectTableColumns = [
  { key: 'name', label: 'Project Name', sortable: true },
  { key: 'dataset', label: 'Dataset', sortable: false },
  { key: 'task', label: 'ML Task', sortable: true },
  { key: 'updatedAt', label: 'Last Updated', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'action', label: 'Action', align: 'right' },
];

export const quickActionsConfig = [
  {
    id: 'upload-dataset',
    title: 'Upload Dataset',
    description: 'Import a CSV dataset to start your machine learning workflow.',
    path: '/dashboard/datasets',
    iconName: 'UploadCloud',
    badge: 'Step 1',
  },
  {
    id: 'create-project',
    title: 'Create Project',
    description: 'Define a new machine learning objective.',
    path: '/dashboard/create-project',
    iconName: 'PlusCircle',
    badge: 'Step 2',
  },
  {
    id: 'view-reports',
    title: 'View Reports',
    description: 'Explore previously generated model reports.',
    path: '/dashboard/reports',
    iconName: 'FileBarChart2',
    badge: 'Step 3',
  },
];

export const initialBlankStats = [
  {
    id: 'projects',
    title: 'Total Projects',
    value: '—',
    change: 'No projects yet',
    trend: null,
    iconName: 'Folder',
    gradient: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(59, 130, 246, 0.05) 100%)',
    accentColor: '#3B82F6',
  },
  {
    id: 'datasets',
    title: 'Datasets Uploaded',
    value: '—',
    change: 'No datasets uploaded',
    trend: null,
    iconName: 'Database',
    gradient: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(167, 139, 250, 0.05) 100%)',
    accentColor: '#8B5CF6',
  },
  {
    id: 'models',
    title: 'Models Generated',
    value: '—',
    change: 'No models generated',
    trend: null,
    iconName: 'BrainCircuit',
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(52, 211, 153, 0.05) 100%)',
    accentColor: '#10B981',
  },
  {
    id: 'runs',
    title: 'Completed Runs',
    value: '—',
    change: 'No execution runs',
    trend: null,
    iconName: 'Activity',
    gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(251, 191, 36, 0.05) 100%)',
    accentColor: '#F59E0B',
  },
];

export const initialBlankQuota = {
  planName: 'Free Research Tier',
  computeUsed: 0,
  computeHours: '0 / 40 hrs',
  datasetsUsed: 0,
  datasetsTotal: 25,
  storageUsed: '0 GB',
  storageTotal: '10.0 GB',
  activeAgentSlots: '0 / 8 slots',
};

export const defaultUserMeta = {
  name: 'User',
  email: '',
  role: 'Member',
  plan: 'Free Plan',
};
