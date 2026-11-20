import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Key, Save } from 'lucide-react';
import { defaultUserMeta } from '../../config/dashboardConfig';

export default function Settings() {
  const { user } = useAuth();
  const displayName = user?.name || defaultUserMeta.name;
  const displayEmail = user?.email || defaultUserMeta.email;

  return (
    <div style={{ maxWidth: '850px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-default)', marginBottom: '0.25rem' }}>
          Account & Workspace Settings
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
          Manage your personal profile, credentials, and future agent execution preferences.
        </p>
      </div>

      {/* Profile Details */}
      <div className="dash-card">
        <h3 className="dash-card-title" style={{ marginBottom: '1.25rem' }}>
          <User size={18} className="brand-highlight" />
          <span>User Profile</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              defaultValue={displayName} 
              className="form-input" 
              style={{ paddingLeft: '1rem' }} 
              placeholder="Your full name"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              defaultValue={displayEmail} 
              disabled 
              className="form-input" 
              style={{ paddingLeft: '1rem', opacity: 0.7 }} 
              placeholder="user@mlforge.ai"
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            className="btn btn-primary"
            onClick={() => alert('Profile settings will sync with the database once backend integration is activated.')}
            style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
          >
            <Save size={15} />
            <span>Save Profile</span>
          </button>
        </div>
      </div>

      {/* Security & API Keys */}
      <div className="dash-card">
        <h3 className="dash-card-title" style={{ marginBottom: '1.25rem' }}>
          <Key size={18} className="brand-highlight" />
          <span>FastAPI REST API Token</span>
        </h3>

        <div style={{ background: 'var(--neutral-50)', border: '1px solid var(--slate-100)', padding: '1rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--slate-default)', fontSize: '0.9rem' }}>Workspace Integration Token</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
              mlforge_live_sk_••••••••••••••••••••••••
            </div>
          </div>
          <button 
            className="btn btn-secondary"
            onClick={() => alert('Token generation will be handled by the FastAPI auth service.')}
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
          >
            Generate Key
          </button>
        </div>
      </div>
    </div>
  );
}
