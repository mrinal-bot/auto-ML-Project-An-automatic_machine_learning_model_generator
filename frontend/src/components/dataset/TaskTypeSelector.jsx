import React from 'react';
import { Layers, TrendingUp, Check } from 'lucide-react';
import { datasetConfig } from '../../config/datasetConfig';

const iconMap = {
  Layers,
  TrendingUp,
};

export default function TaskTypeSelector({ selectedTask, onSelectTask, error }) {
  const tasks = Object.values(datasetConfig.taskTypes);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {error && (
        <div className="auth-alert auth-alert-error" style={{ margin: 0 }}>
          <span>{error}</span>
        </div>
      )}

      <div className="task-cards-grid">
        {tasks.map((task) => {
          const isSelected = selectedTask === task.id;
          const IconComponent = iconMap[task.iconName] || Layers;

          return (
            <div
              key={task.id}
              className={`task-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectTask(task.id)}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  onSelectTask(task.id);
                }
              }}
            >
              <div className="task-card-header">
                <div className="task-card-icon">
                  <IconComponent size={24} />
                </div>
                <div className="task-radio-circle">
                  {isSelected && <div className="task-radio-inner" />}
                </div>
              </div>

              <div className="task-card-title">
                <span>{task.title}</span>
                <span className="task-badge-pill">{task.badge}</span>
              </div>

              <div className="task-card-subtitle">{task.subtitle}</div>

              <p className="task-card-desc">{task.description}</p>

              <div className="task-card-example">{task.example}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

