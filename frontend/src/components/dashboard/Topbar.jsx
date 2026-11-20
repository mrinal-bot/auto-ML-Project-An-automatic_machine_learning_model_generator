import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Bell, 
  HelpCircle, 
  ChevronRight, 
  User, 
  Settings, 
  LogOut, 
  ExternalLink,
  Inbox
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getRouteMeta } from '../../config/navigation';
import { defaultUserMeta } from '../../config/dashboardConfig';
import { dashboardService } from '../../services/dashboardService';

export default function Topbar({ onToggleSidebar, searchQuery, onSearchChange }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  // Load notifications from service layer
  useEffect(() => {
    async function loadNotifications() {
      const data = await dashboardService.getNotifications();
      setNotifications(data || []);
    }
    loadNotifications();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setShowUserMenu(false);
    await logout();
    navigate('/login');
  };

  const displayName = user?.name || defaultUserMeta.name;
  const displayEmail = user?.email || '—';
  const initials = displayName
    ? displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
    : 'U';

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Automatically update page title and breadcrumbs based on the route configuration
  const { section, title } = getRouteMeta(location.pathname);

  return (
    <header className="dashboard-topbar">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="topbar-left">
        <button 
          className="mobile-sidebar-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation drawer"
        >
          <Menu size={22} />
        </button>

        <div>
          <div className="topbar-breadcrumbs">
            <Link to="/dashboard">Dashboard</Link>
            <ChevronRight size={12} />
            <span>{section}</span>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--slate-default)', fontWeight: 600 }}>{title}</span>
          </div>
          <h2 className="topbar-title">{title}</h2>
        </div>
      </div>

      {/* Right: Search, Notifications, Help, User Avatar */}
      <div className="topbar-right">
        {/* Search Input */}
        <div className="topbar-search-box">
          <Search size={16} className="topbar-search-icon" />
          <input
            type="text"
            placeholder="Search projects, models..."
            value={searchQuery || ''}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="topbar-search-input"
            aria-label="Search dashboard records"
          />
        </div>

        {/* Notifications Dropdown */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button 
            className="topbar-icon-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            aria-label="View notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="notification-badge" />}
          </button>

          {showNotifications && (
            <div className="dropdown-panel notifications-panel">
              <div className="dropdown-header">
                <span>Notifications</span>
                <span className="dropdown-header-badge">
                  {unreadCount > 0 ? `${unreadCount} New` : '0 New'}
                </span>
              </div>
              <ul className="notification-list">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <li 
                      key={notif.id} 
                      className={`notification-item ${notif.unread ? 'unread' : ''}`}
                      onClick={() => setShowNotifications(false)}
                    >
                      {notif.unread && <span className="notif-dot" />}
                      <div className="notif-content">
                        <h5>{notif.title}</h5>
                        <p>{notif.message}</p>
                        <span className="notif-time">{notif.time}</span>
                      </div>
                    </li>
                  ))
                ) : (
                  <li style={{ padding: '2rem 1.25rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    <Inbox size={24} style={{ margin: '0 auto 0.5rem auto', opacity: 0.5, display: 'block' }} />
                    <p style={{ fontSize: '0.85rem' }}>No new notifications.</p>
                  </li>
                )}
              </ul>
              {notifications.length > 0 && (
                <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
                  <span 
                    style={{ fontSize: '0.75rem', color: 'var(--color-accent)', cursor: 'pointer', fontWeight: 600 }}
                    onClick={() => setShowNotifications(false)}
                  >
                    Mark all as read
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Help Button */}
        <button 
          className="topbar-icon-btn"
          onClick={() => alert('MLForge AI Platform Documentation will be available in future releases.')}
          aria-label="Platform Help"
          title="Help & Guidance"
        >
          <HelpCircle size={18} />
        </button>

        {/* User Profile Menu */}
        <div ref={userMenuRef} style={{ position: 'relative' }}>
          <button 
            className="topbar-user-btn"
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            aria-label="User profile menu"
          >
            <div className="topbar-avatar">
              {initials}
            </div>
          </button>

          {showUserMenu && (
            <div className="dropdown-panel user-dropdown-panel">
              <div className="user-dropdown-header">
                <div className="user-dropdown-name">{displayName}</div>
                <div className="user-dropdown-email">{displayEmail}</div>
              </div>

              <Link 
                to="/dashboard/settings" 
                className="user-dropdown-link"
                onClick={() => setShowUserMenu(false)}
              >
                <User size={16} />
                <span>My Profile</span>
              </Link>

              <Link 
                to="/dashboard/settings" 
                className="user-dropdown-link"
                onClick={() => setShowUserMenu(false)}
              >
                <Settings size={16} />
                <span>Account Settings</span>
              </Link>

              <Link 
                to="/" 
                className="user-dropdown-link"
                onClick={() => setShowUserMenu(false)}
              >
                <ExternalLink size={16} />
                <span>Landing Page</span>
              </Link>

              <div style={{ margin: '0.35rem 0', borderTop: '1px solid var(--color-border)' }} />

              <button 
                onClick={handleLogout}
                className="user-dropdown-link logout"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
