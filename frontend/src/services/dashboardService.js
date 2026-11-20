/**
 * MLForge AI - Reusable Dashboard API Service Layer
 * Keeps API communication separate from UI components.
 * Configured with API_ENDPOINTS for future FastAPI database integration.
 * Currently returns clean, empty structures with zero mock or fake data.
 */

import { API_ENDPOINTS } from '../config/api';
import { 
  initialStats, 
  initialProjects, 
  initialActivities, 
  initialNotifications, 
  initialDatasets, 
  initialResults, 
  initialReports, 
  initialUsageQuota 
} from '../data/mockDashboardData';

export const dashboardService = {
  /**
   * Fetch 4 core KPI statistics (returns "—" placeholders until database connected)
   */
  async getStats() {
    // When backend API is active, uncomment:
    // const res = await fetch(API_ENDPOINTS.dashboard.stats, { credentials: 'include' });
    // return await res.json();
    return Promise.resolve(initialStats);
  },

  /**
   * Fetch user machine learning projects (empty [] until database connected)
   */
  async getProjects() {
    // When backend API is active:
    // const res = await fetch(API_ENDPOINTS.projects.list, { credentials: 'include' });
    // return await res.json();
    return Promise.resolve(initialProjects);
  },

  /**
   * Fetch uploaded datasets (empty [] until database connected)
   */
  async getDatasets() {
    // When backend API is active:
    // const res = await fetch(API_ENDPOINTS.datasets.list, { credentials: 'include' });
    // return await res.json();
    return Promise.resolve(initialDatasets);
  },

  /**
   * Fetch generated model results (empty [] until database connected)
   */
  async getResults() {
    // When backend API is active:
    // const res = await fetch(API_ENDPOINTS.results.list, { credentials: 'include' });
    // return await res.json();
    return Promise.resolve(initialResults);
  },

  /**
   * Fetch generated reports (empty [] until database connected)
   */
  async getReports() {
    // When backend API is active:
    // const res = await fetch(API_ENDPOINTS.reports.list, { credentials: 'include' });
    // return await res.json();
    return Promise.resolve(initialReports);
  },

  /**
   * Fetch recent activity logs (empty [] until database connected)
   */
  async getRecentActivity() {
    // When backend API is active:
    // const res = await fetch(API_ENDPOINTS.dashboard.activity, { credentials: 'include' });
    // return await res.json();
    return Promise.resolve(initialActivities);
  },

  /**
   * Fetch user notifications (empty [] until database connected)
   */
  async getNotifications() {
    // When backend API is active:
    // const res = await fetch(API_ENDPOINTS.dashboard.notifications, { credentials: 'include' });
    // return await res.json();
    return Promise.resolve(initialNotifications);
  },

  /**
   * Fetch compute and resource quota overview
   */
  async getUsageQuota() {
    // When backend API is active:
    // const res = await fetch(API_ENDPOINTS.dashboard.quota, { credentials: 'include' });
    // return await res.json();
    return Promise.resolve(initialUsageQuota);
  },

  /**
   * Filter projects by search query and task type
   */
  async searchProjects(query = '', taskFilter = 'All') {
    const allProjects = await this.getProjects();
    const q = query.toLowerCase().trim();
    const filtered = allProjects.filter((p) => {
      const matchesTask = taskFilter === 'All' || p.task === taskFilter;
      const matchesQuery = 
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.dataset?.toLowerCase().includes(q) ||
        p.task?.toLowerCase().includes(q) ||
        p.status?.toLowerCase().includes(q);
      return matchesTask && matchesQuery;
    });
    return Promise.resolve(filtered);
  },
};
