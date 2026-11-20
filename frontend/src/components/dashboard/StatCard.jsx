import React from 'react';
import { Folder, Database, BrainCircuit, Activity, ArrowUpRight } from 'lucide-react';

const iconMap = {
  Folder: Folder,
  Database: Database,
  BrainCircuit: BrainCircuit,
  Activity: Activity,
};

export default function StatCard({ 
  title, 
  value, 
  change, 
  trend, 
  iconName = 'Activity', 
  gradient, 
  accentColor = '#A78BFA' 
}) {
  const IconComponent = iconMap[iconName] || Activity;

  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        <div 
          className="stat-icon-wrapper"
          style={{ 
            background: gradient || 'linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(124, 58, 237, 0.1) 100%)', 
            color: accentColor 
          }}
        >
          <IconComponent size={22} />
        </div>
      </div>

      <div className="stat-card-value">{value || '—'}</div>

      <div className="stat-card-subtitle">
        {trend === 'up' && (
          <span className="stat-pill up">
            <ArrowUpRight size={12} />
            {change}
          </span>
        )}
        {trend === 'neutral' && (
          <span className="stat-pill neutral">
            {change}
          </span>
        )}
        {!trend && <span>{change}</span>}
      </div>
    </div>
  );
}
