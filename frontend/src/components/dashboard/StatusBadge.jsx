import React from 'react';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { statusConfig } from '../../config/dashboardConfig';

const iconMap = {
  CheckCircle2: CheckCircle2,
  Clock: Clock,
  AlertCircle: AlertCircle,
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || {
    label: status,
    className: 'completed',
    color: '#94A3B8',
    iconName: 'Clock',
  };

  const IconComponent = iconMap[config.iconName] || Clock;

  return (
    <span className={`status-pill ${config.className}`}>
      <IconComponent size={12} />
      <span>{config.label}</span>
    </span>
  );
}

