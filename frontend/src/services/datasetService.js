/**
 * MLForge AI - Dataset & Project Configuration Service Layer
 * Manages configuration state and provides future REST endpoints hooks.
 * Prepares payload serialization for future FastAPI integration.
 */

import { API_ENDPOINTS } from '../config/api';

const SESSION_KEY = 'mlforge_project_config_draft';

export const datasetService = {
  /**
   * Get temporary configuration draft from sessionStorage
   */
  getConfigDraft() {
    try {
      const data = sessionStorage.getItem(SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      return null;
    }
  },

  /**
   * Save temporary configuration draft in sessionStorage
   */
  saveConfigDraft(config) {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(config));
    } catch (err) {
      // Storage quota or private mode fallback
    }
  },

  /**
   * Clear configuration draft upon completion or reset
   */
  clearConfigDraft() {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch (err) {
      // Ignore
    }
  },

  /**
   * Prepare serialized configuration payload for future FastAPI backend submission
   */
  serializeProjectPayload(config) {
    return {
      project_name: config.projectName || `Project_${config.dataset?.fileName.replace(/\.csv$/i, '')}`,
      dataset_name: config.dataset?.fileName || '',
      dataset_metadata: {
        total_rows: config.dataset?.totalRows || 0,
        total_columns: config.dataset?.totalColumns || 0,
        file_size_bytes: config.dataset?.fileSize || 0,
        headers: config.dataset?.headers || [],
        columns_profile: config.dataset?.columnProfiles || [],
      },
      ml_task_type: config.taskType || '',
      natural_language_objective: config.objective || '',
      target_column: config.targetColumn || '',
      configured_at: new Date().toISOString(),
    };
  },

  /**
   * Future FastAPI API submission method (Phase 5 hook)
   */
  async submitConfigurationToBackend(config) {
    // Phase 5 integration endpoint:
    // const payload = this.serializeProjectPayload(config);
    // const res = await fetch(API_ENDPOINTS.projects.create, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    //   credentials: 'include',
    // });
    // return await res.json();
    return Promise.resolve({
      status: 'success',
      message: 'Configuration validated and prepared for Agentic AI orchestration.',
    });
  },
};

