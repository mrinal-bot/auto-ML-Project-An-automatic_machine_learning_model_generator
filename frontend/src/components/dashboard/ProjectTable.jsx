import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderGit2, 
  ChevronRight, 
  Eye, 
  ExternalLink,
  FileCode2,
  X,
  PlusCircle,
  FolderOpen,
  Search
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import EmptyState from './EmptyState';
import { projectTableColumns } from '../../config/dashboardConfig';

export default function ProjectTable({ 
  projects = [], 
  searchQuery = '', 
  showViewAll = true,
  columns = projectTableColumns 
}) {
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter projects by search query
  const filteredProjects = projects.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.dataset?.toLowerCase().includes(q) ||
      p.task?.toLowerCase().includes(q) ||
      p.status?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <h3 className="dash-card-title">
          <FolderGit2 size={20} className="brand-highlight" />
          <span>Recent Machine Learning Projects</span>
        </h3>
        {showViewAll && projects.length > 0 && (
          <Link to="/dashboard/projects" className="dash-card-link">
            <span>View All Projects</span>
            <ChevronRight size={14} />
          </Link>
        )}
      </div>

      <div className="table-responsive">
        <table className="projects-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={{ textAlign: col.align || 'left' }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((proj) => (
                <tr key={proj.id}>
                  {/* Project Name & Subtext */}
                  <td>
                    <div className="project-name-cell">
                      <div className="project-name-icon">
                        <FileCode2 size={16} />
                      </div>
                      <div>
                        <div className="project-name-text">{proj.name}</div>
                        <div className="project-subtext">Best: {proj.bestModel || '—'}</div>
                      </div>
                    </div>
                  </td>

                  {/* Dataset */}
                  <td>
                    <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#93C5FD' }}>
                      {proj.dataset || '—'}
                    </code>
                  </td>

                  {/* ML Task */}
                  <td>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      {proj.task || '—'}
                    </span>
                  </td>

                  {/* Last Updated */}
                  <td>{proj.updatedAt || '—'}</td>

                  {/* Status Badge */}
                  <td>
                    <StatusBadge status={proj.status} />
                  </td>

                  {/* Action */}
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="table-action-btn"
                      onClick={() => setSelectedProject(proj)}
                      title="Inspect project details"
                      aria-label={`View details for ${proj.name}`}
                    >
                      <Eye size={13} />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  {projects.length === 0 ? (
                    <EmptyState 
                      icon={FolderOpen}
                      title="No projects yet"
                      description="Create your first project to get started with autonomous machine learning."
                      action={
                        <Link to="/dashboard/create-project" className="btn btn-primary" style={{ fontSize: '0.825rem', padding: '0.5rem 1.15rem' }}>
                          <PlusCircle size={15} />
                          <span>Create Project</span>
                        </Link>
                      }
                    />
                  ) : (
                    <EmptyState 
                      icon={Search}
                      title="No matching projects found"
                      description={`No projects matched the search query "${searchQuery}".`}
                    />
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(6, 9, 19, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '1.5rem',
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="dash-card"
            style={{ maxWidth: '520px', width: '100%', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div className="project-name-icon" style={{ width: '40px', height: '40px' }}>
                  <FileCode2 size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--slate-default)', fontWeight: 800 }}>
                    {selectedProject.name}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--iris-700)', fontWeight: 600 }}>
                    Task: {selectedProject.task || '—'}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                style={{ background: 'none', border: 'none', color: 'var(--slate-400)', cursor: 'pointer' }}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--neutral-50)', border: '1px solid var(--slate-100)', padding: '0.85rem', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.725rem', color: 'var(--neutral-700)', textTransform: 'uppercase' }}>Dataset</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--iris-700)', marginTop: '0.2rem' }}>
                  {selectedProject.dataset || '—'}
                </div>
              </div>
              <div style={{ background: 'var(--neutral-50)', border: '1px solid var(--slate-100)', padding: '0.85rem', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.725rem', color: 'var(--neutral-700)', textTransform: 'uppercase' }}>Status</span>
                <div style={{ marginTop: '0.2rem' }}>
                  <StatusBadge status={selectedProject.status} />
                </div>
              </div>
              <div style={{ background: 'var(--neutral-50)', border: '1px solid var(--slate-100)', padding: '0.85rem', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.725rem', color: 'var(--neutral-700)', textTransform: 'uppercase' }}>Candidate Models</span>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--slate-default)', marginTop: '0.2rem' }}>
                  {selectedProject.modelsEvaluated ? `${selectedProject.modelsEvaluated} Tested` : '—'}
                </div>
              </div>
              <div style={{ background: 'var(--neutral-50)', border: '1px solid var(--slate-100)', padding: '0.85rem', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.725rem', color: 'var(--neutral-700)', textTransform: 'uppercase' }}>Primary Metric</span>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#15803d', marginTop: '0.2rem' }}>
                  {selectedProject.score || '—'}
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--neutral-50)', border: '1px solid var(--slate-100)', padding: '0.85rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.725rem', color: 'var(--neutral-700)', textTransform: 'uppercase' }}>Synthesized Model Architecture</span>
              <div style={{ color: 'var(--slate-default)', fontSize: '0.9rem', fontWeight: 600, marginTop: '0.25rem' }}>
                {selectedProject.bestModel || '—'}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setSelectedProject(null)}
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                Close
              </button>
              <Link
                to="/dashboard/results"
                className="btn btn-primary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                onClick={() => setSelectedProject(null)}
              >
                <span>View In Model Results</span>
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
