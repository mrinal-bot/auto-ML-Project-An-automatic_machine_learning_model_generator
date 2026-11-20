import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { PlusCircle, Sparkles, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/dashboard/StatCard';
import ProjectTable from '../../components/dashboard/ProjectTable';
import QuickActions from '../../components/dashboard/QuickActions';
import ActivityTimeline from '../../components/dashboard/ActivityTimeline';
import UsageCard from '../../components/dashboard/UsageCard';
import { dashboardService } from '../../services/dashboardService';
import { defaultUserMeta } from '../../config/dashboardConfig';

export default function Dashboard() {
  const { user } = useAuth();
  const outletContext = useOutletContext() || {};
  const searchQuery = outletContext.searchQuery || '';

  const [stats, setStats] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [usageQuota, setUsageQuota] = useState(null);

  // Load data through the centralized dashboardService layer
  useEffect(() => {
    async function loadDashboardData() {
      const [s, p, a, u] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getProjects(),
        dashboardService.getRecentActivity(),
        dashboardService.getUsageQuota(),
      ]);
      setStats(s);
      setProjects(p);
      setActivities(a);
      setUsageQuota(u);
    }
    loadDashboardData();
  }, []);

  const displayName = user?.name || defaultUserMeta.name;

  // Formatted date string for contextual greeting
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <>
      {/* Dashboard Welcome Section */}
      <div className="dashboard-welcome-banner">
        <div className="dashboard-welcome-text">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', color: 'var(--color-accent)', marginBottom: '0.35rem', fontWeight: 600 }}>
            <Calendar size={13} />
            <span>{todayFormatted} • Autonomous Workspace Active</span>
          </div>
          <h1>
            Welcome back, <span className="text-gradient">{displayName}</span>!
          </h1>
          <p>
            Manage your machine learning projects and explore intelligent automation.
          </p>
        </div>

        <Link to="/dashboard/create-project" className="btn-create-highlight">
          <PlusCircle size={18} />
          <span>New Project</span>
        </Link>
      </div>

      {/* 4 Statistics Cards */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            iconName={stat.iconName}
            gradient={stat.gradient}
            accentColor={stat.accentColor}
          />
        ))}
      </div>

      {/* Create New Project Section (Most Prominent Highlight) */}
      <div className="create-project-banner">
        <div className="create-project-glow" />
        <div className="create-project-text">
          <div className="create-project-tag">
            <Sparkles size={13} />
            <span>Agentic Orchestration Ready</span>
          </div>
          <h2 className="create-project-heading">
            Start a New Machine Learning Project
          </h2>
          <p className="create-project-desc">
            Upload your dataset, describe your machine learning objective, and let
            MLForge AI assist you in building intelligent models.
          </p>
        </div>
        <div className="create-project-action">
          <Link to="/dashboard/create-project" className="btn-create-highlight" style={{ fontSize: '1rem', padding: '0.95rem 1.8rem' }}>
            <PlusCircle size={20} />
            <span>+ Create New Project</span>
          </Link>
        </div>
      </div>

      {/* Quick Actions (3 Cards) */}
      <QuickActions />

      {/* Main Split: Projects Table (2fr) & Activity Timeline (1fr) */}
      <div className="dashboard-main-split">
        <ProjectTable 
          projects={projects} 
          searchQuery={searchQuery}
          showViewAll={true} 
        />
        <ActivityTimeline activities={activities} />
      </div>

      {/* Additional Supporting Elements: Resource Quota & Getting Started */}
      {usageQuota && <UsageCard quota={usageQuota} />}
    </>
  );
}
