/**
 * MLForge AI - Centralized API Configuration
 * Defines base URLs and REST endpoint mappings for future FastAPI database integration.
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  // Authentication & User Session
  auth: {
    register: `${API_BASE_URL}/api/auth/register`,
    login: `${API_BASE_URL}/api/auth/login`,
    logout: `${API_BASE_URL}/api/auth/logout`,
    me: `${API_BASE_URL}/api/auth/me`,
    forgotPassword: `${API_BASE_URL}/api/auth/forgot-password`,
    resetPassword: `${API_BASE_URL}/api/auth/reset-password`,
  },
  
  // Future Database REST Endpoints (Phase 4 Integration)
  dashboard: {
    stats: `${API_BASE_URL}/api/dashboard/stats`,
    quota: `${API_BASE_URL}/api/dashboard/quota`,
    activity: `${API_BASE_URL}/api/dashboard/activity`,
    notifications: `${API_BASE_URL}/api/dashboard/notifications`,
  },

  projects: {
    list: `${API_BASE_URL}/api/projects`,
    detail: (id) => `${API_BASE_URL}/api/projects/${id}`,
    create: `${API_BASE_URL}/api/projects`,
    delete: (id) => `${API_BASE_URL}/api/projects/${id}`,
  },

  datasets: {
    list: `${API_BASE_URL}/api/datasets`,
    detail: (id) => `${API_BASE_URL}/api/datasets/${id}`,
    upload: `${API_BASE_URL}/api/datasets/upload`,
  },

  results: {
    list: `${API_BASE_URL}/api/results`,
    detail: (id) => `${API_BASE_URL}/api/results/${id}`,
    downloadModel: (id) => `${API_BASE_URL}/api/results/${id}/download`,
  },

  reports: {
    list: `${API_BASE_URL}/api/reports`,
    detail: (id) => `${API_BASE_URL}/api/reports/${id}`,
    download: (id) => `${API_BASE_URL}/api/reports/${id}/download`,
  },
};

