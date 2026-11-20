import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import ProjectTable from '../../components/dashboard/ProjectTable';
import { dashboardService } from '../../services/dashboardService';

export default function Projects() {
  const [taskFilter, setTaskFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const outletContext = useOutletContext() || {};
  const searchQuery = outletContext.searchQuery || '';

  useEffect(() => {
    async function fetchProjects() {
      const data = await dashboardService.getProjects();
      setProjects(data);
    }
    fetchProjects();
  }, []);

  const filtered = projects.filter((p) => {
    if (taskFilter === 'All') return true;
    return p.task === taskFilter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-default)', marginBottom: '0.25rem' }}>
            My Projects
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Review, inspect, and manage all your automated machine learning projects.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Task Filter */}
          <div style={{ display: 'flex', gap: '0.4rem', background: 'var(--neutral-100)', padding: '0.3rem', borderRadius: '8px', border: '1px solid var(--slate-200)' }}>
            {['All', 'Classification', 'Regression'].map((t) => (
              <button
                key={t}
                onClick={() => setTaskFilter(t)}
                style={{
                  background: taskFilter === t ? 'var(--iris-default)' : 'none',
                  color: taskFilter === t ? '#FFFFFF' : 'var(--slate-default)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <Link to="/dashboard/create-project" className="btn-create-highlight">
            <PlusCircle size={18} />
            <span>New Project</span>
          </Link>
        </div>
      </div>

      {/* Projects Table */}
      <ProjectTable 
        projects={filtered} 
        searchQuery={searchQuery}
        showViewAll={false} 
      />
    </div>
  );
}
