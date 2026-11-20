import React from 'react';
import { 
  History, 
  CheckCircle2, 
  UploadCloud, 
  PlayCircle, 
  FileText, 
  AlertTriangle 
} from 'lucide-react';
import EmptyState from './EmptyState';

const iconForType = {
  success: CheckCircle2,
  info: UploadCloud,
  processing: PlayCircle,
  warning: FileText,
  error: AlertTriangle,
};

export default function ActivityTimeline({ activities = [] }) {
  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <h3 className="dash-card-title">
          <History size={20} className="brand-highlight" />
          <span>Recent Activity</span>
        </h3>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          Log Stream
        </span>
      </div>

      {activities && activities.length > 0 ? (
        <div className="activity-timeline">
          {activities.map((item) => {
            const IconComp = iconForType[item.type] || History;
            return (
              <div key={item.id} className="activity-item">
                <div className="activity-connector" />
                <div className={`activity-icon-node ${item.type}`}>
                  <IconComp size={15} />
                </div>
                <div className="activity-text">
                  <div className="activity-header">
                    <span className="activity-title">{item.title}</span>
                    <span className="activity-time">{item.time}</span>
                  </div>
                  <p className="activity-desc">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState 
          icon={History}
          title="No recent activity"
          description="Activity logs will appear here once agents begin executing workflows."
        />
      )}
    </div>
  );
}
