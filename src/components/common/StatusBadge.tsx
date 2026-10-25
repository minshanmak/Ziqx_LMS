import React from 'react';
import {
  CheckCircle,
  PenLine,
  Archive,
  Clock,
  Radio,
  Check,
  PlayCircle,
  Hourglass,
  XCircle,
  Ban,
  AlertTriangle,
  CircleDashed,
} from 'lucide-react';
import type { CourseStatus } from '../../types';

export type AnyBadgeStatus =
  | CourseStatus
  | 'Upcoming'
  | 'Live now'
  | 'Live'
  | 'Completed'
  | 'In progress'
  | 'Pending'
  | 'Failed'
  | 'Cancelled'
  | 'Active'
  | 'Needs support'
  | 'Not started'
  | 'Revoked';

interface StatusBadgeProps {
  status: AnyBadgeStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const isSm = size === 'sm';
  const iconSize = isSm ? 11 : 12;

  switch (status) {
    case 'Published':
      return (
        <span className="status-badge published" style={{ fontSize: isSm ? '11px' : '12px', padding: isSm ? '2px 8px' : '3px 10px' }}>
          <CheckCircle size={iconSize} strokeWidth={1.75} />
          Published
        </span>
      );
    case 'Draft':
      return (
        <span className="status-badge draft" style={{ fontSize: isSm ? '11px' : '12px', padding: isSm ? '2px 8px' : '3px 10px' }}>
          <PenLine size={iconSize} strokeWidth={1.75} />
          Draft
        </span>
      );
    case 'Archived':
      return (
        <span className="status-badge archived" style={{ fontSize: isSm ? '11px' : '12px', padding: isSm ? '2px 8px' : '3px 10px' }}>
          <Archive size={iconSize} strokeWidth={1.75} />
          Archived
        </span>
      );
    case 'Active':
      return (
        <span className="status-badge active" style={{ fontSize: isSm ? '11px' : '12px', padding: isSm ? '2px 8px' : '3px 10px' }}>
          <CheckCircle size={iconSize} strokeWidth={1.75} />
          Active
        </span>
      );
    case 'Revoked':
      return (
        <span className="status-badge revoked" style={{ fontSize: isSm ? '11px' : '12px', padding: isSm ? '2px 8px' : '3px 10px' }}>
          <Ban size={iconSize} strokeWidth={1.75} />
          Revoked
        </span>
      );
    case 'Upcoming':
      return (
        <span className="status-badge upcoming" style={{ fontSize: isSm ? '11px' : '12px', padding: isSm ? '2px 8px' : '3px 10px' }}>
          <Clock size={iconSize} strokeWidth={1.75} />
          Upcoming
        </span>
      );
    case 'Live':
    case 'Live now':
      return (
        <span className="status-badge live-now" style={{ fontSize: isSm ? '11px' : '12px', padding: isSm ? '2px 8px' : '3px 10px' }}>
          <Radio size={iconSize} strokeWidth={1.75} />
          Live now
        </span>
      );
    case 'Completed':
      return (
        <span className="status-badge completed" style={{ fontSize: isSm ? '11px' : '12px', padding: isSm ? '2px 8px' : '3px 10px' }}>
          <Check size={iconSize} strokeWidth={1.75} />
          Completed
        </span>
      );
    case 'In progress':
      return (
        <span className="status-badge in-progress" style={{ fontSize: isSm ? '11px' : '12px', padding: isSm ? '2px 8px' : '3px 10px' }}>
          <PlayCircle size={iconSize} strokeWidth={1.75} />
          In progress
        </span>
      );
    case 'Pending':
      return (
        <span className="status-badge pending" style={{ fontSize: isSm ? '11px' : '12px', padding: isSm ? '2px 8px' : '3px 10px' }}>
          <Hourglass size={iconSize} strokeWidth={1.75} />
          Pending
        </span>
      );
    case 'Failed':
      return (
        <span className="status-badge failed" style={{ fontSize: isSm ? '11px' : '12px', padding: isSm ? '2px 8px' : '3px 10px' }}>
          <XCircle size={iconSize} strokeWidth={1.75} />
          Failed
        </span>
      );
    case 'Needs support':
      return (
        <span className="status-badge needs-support" style={{ fontSize: isSm ? '11px' : '12px', padding: isSm ? '2px 8px' : '3px 10px' }}>
          <AlertTriangle size={iconSize} strokeWidth={1.75} />
          Needs support
        </span>
      );
    case 'Not started':
      return (
        <span className="status-badge not-started" style={{ fontSize: isSm ? '11px' : '12px', padding: isSm ? '2px 8px' : '3px 10px' }}>
          <CircleDashed size={iconSize} strokeWidth={1.75} />
          Not started
        </span>
      );
    case 'Cancelled':
      return (
        <span className="status-badge cancelled" style={{ fontSize: isSm ? '11px' : '12px', padding: isSm ? '2px 8px' : '3px 10px' }}>
          <Ban size={iconSize} strokeWidth={1.75} />
          Cancelled
        </span>
      );
    default:
      return (
        <span className="status-badge draft" style={{ fontSize: isSm ? '11px' : '12px', padding: isSm ? '2px 8px' : '3px 10px' }}>
          {status}
        </span>
      );
  }
};
