import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Cpu, 
  LayoutDashboard, 
  FolderGit2, 
  PlusCircle, 
  Database, 
  BrainCircuit, 
  FileText, 
  BookOpen, 
  Settings, 
  HelpCircle, 
  LogOut, 
  X,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { navigationConfig } from '../../config/navigation';
import { defaultUserMeta } from '../../config/dashboardConfig';

// Map icon names from navigation.js to Lucide React icon components
const iconRegistry = {
  LayoutDashboard,
  FolderGit2,
  PlusCircle,
  Database,
  BrainCircuit,
  FileText,
  BookOpen,
  Settings,
  HelpCircle,
};

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const displayName = user?.name || defaultUserMeta.name;
  const planType = user?.plan || defaultUserMeta.plan;
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <>
      {/* Mobile backdrop */}
      <div 
        className={`sidebar-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      <aside className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand-box">
          <Link to="/" className="sidebar-logo-link">
            <div className="brand-icon-wrapper" style={{ width: '36px', height: '36px' }}>
              <Cpu size={20} strokeWidth={2.2} />
            </div>
            <span>
              MLForge <span className="brand-highlight">AI</span>
            </span>
          </Link>
          <button 
            className="sidebar-close-btn" 
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation scroll area driven by centralized navigationConfig */}
        <div className="sidebar-nav-scroll">
          {navigationConfig.groups.map((group) => (
            <div key={group.id} className="sidebar-group">
              <div className="sidebar-group-title">{group.title}</div>
              <ul className="sidebar-nav-list">
                {group.items.map((item) => {
                  const IconComponent = iconRegistry[item.iconName] || LayoutDashboard;

                  if (item.isExternal) {
                    return (
                      <li key={item.id}>
                        <a 
                          href={item.path}
                          className="sidebar-nav-item"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`${item.label} module is scheduled for future phase.`);
                          }}
                        >
                          <IconComponent size={18} />
                          <span>{item.label}</span>
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={item.id}>
                      <NavLink
                        to={item.path}
                        end={item.exact}
                        className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                        onClick={onClose}
                      >
                        <IconComponent size={18} />
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="sidebar-nav-badge">{item.badge}</span>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Sidebar Footer: User profile */}
        <div className="sidebar-footer">
          <div className="sidebar-user-card">
            <div className="sidebar-user-info">
              <div className="sidebar-user-avatar">
                {initials}
              </div>
              <div className="sidebar-user-text">
                <div className="sidebar-user-name" title={displayName}>
                  {displayName}
                </div>
                <div className="sidebar-user-plan">
                  <Sparkles size={11} />
                  <span>{planType}</span>
                </div>
              </div>
            </div>
            <button 
              className="sidebar-logout-btn" 
              onClick={handleLogout}
              title="Sign Out"
              aria-label="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
