import React from 'react';
import { Link } from 'react-router-dom';
import { UploadCloud, PlusCircle, FileBarChart2, ArrowRight } from 'lucide-react';
import { quickActionsConfig } from '../../config/dashboardConfig';

const iconMap = {
  UploadCloud,
  PlusCircle,
  FileBarChart2,
};

export default function QuickActions({ actions = quickActionsConfig }) {
  return (
    <div className="quick-actions-grid">
      {actions.map((act) => {
        const IconComponent = iconMap[act.iconName] || PlusCircle;
        return (
          <Link key={act.id} to={act.path} className="quick-action-card">
            <div className="quick-action-icon">
              <IconComponent size={22} />
            </div>
            <div className="quick-action-info">
              <h4>
                <span>{act.title}</span>
                <ArrowRight size={14} style={{ opacity: 0.6 }} />
              </h4>
              <p>{act.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
