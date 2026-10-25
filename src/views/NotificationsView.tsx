import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Check,
  Sliders,
  AlertCircle,
  UserPlus,
  Video,
  Award,
  CreditCard
} from 'lucide-react';
import type { NotificationItem } from '../types';

export const NotificationsView: React.FC = () => {
  const {
    notifications,
    markAllNotificationsRead,
    markNotificationRead,
    setActiveTab,
    showToast
  } = useApp();

  const [filterTab, setFilterTab] = useState<'All' | 'Unread' | 'Enrolments' | 'Payments' | 'Sessions'>('All');

  const filteredNotifications = notifications.filter(n => {
    if (filterTab === 'Unread') return !n.isRead;
    if (filterTab === 'Enrolments') return n.type === 'new_enrolment';
    if (filterTab === 'Payments') return n.type === 'payment_failed' || n.type === 'payment_received';
    if (filterTab === 'Sessions') return n.type === 'live_session';
    return true;
  });

  const getNotifIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'payment_failed':
        return (
          <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-status-danger-bg)', color: 'var(--color-status-danger-fg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertCircle size={18} strokeWidth={1.75} />
          </div>
        );
      case 'new_enrolment':
        return (
          <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-status-info-bg)', color: 'var(--color-status-info-fg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserPlus size={18} strokeWidth={1.75} />
          </div>
        );
      case 'live_session':
        return (
          <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-surface-sky)', color: 'var(--color-link)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Video size={18} strokeWidth={1.75} />
          </div>
        );
      case 'course_completed':
        return (
          <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-surface-lavender)', color: 'var(--color-link)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={18} strokeWidth={1.75} />
          </div>
        );
      case 'payment_received':
        return (
          <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-status-success-bg)', color: 'var(--color-status-success-fg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CreditCard size={18} strokeWidth={1.75} />
          </div>
        );
    }
  };

  const handleActionClick = (notif: NotificationItem) => {
    markNotificationRead(notif.id);
    if (notif.actionText === 'View learner') {
      setActiveTab('learners');
    } else if (notif.actionText === 'Open session') {
      showToast('Opening live session meeting...');
    }
  };

  // Group by category
  const todayList = filteredNotifications.filter(n => n.dateCategory === 'Today');
  const yesterdayList = filteredNotifications.filter(n => n.dateCategory === 'Yesterday');
  const earlierList = filteredNotifications.filter(n => n.dateCategory === 'Earlier');

  return (
    <div
      className="fade-in page-container"
      style={{
        maxWidth: '1000px',
      }}
    >
      {/* Top Header */}
      <div
        className="page-header-row"
      >
        <div>
          <h1
            style={{
              fontSize: '24px',
              lineHeight: '32px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '4px',
            }}
          >
            Notifications
          </h1>
          <p style={{ fontSize: '14px', lineHeight: '22px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
            Enrolments, payments and live sessions across your courses.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              lineHeight: '18px',
              fontWeight: 700,
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              border: 'none',
              background: 'none',
            }}
          >
            <Sliders size={15} strokeWidth={1.75} />
            Notification preferences
          </button>

          <button
            onClick={markAllNotificationsRead}
            className="btn-secondary btn-sm"
          >
            <Check size={14} strokeWidth={1.75} />
            Mark all read
          </button>
        </div>
      </div>

      {/* Filter Tabs matching Underline tab from PDF Page 2 */}
      <div
        className="tabs-scroll-container"
        style={{
          marginBottom: '28px',
        }}
      >
        {(['All', 'Unread', 'Enrolments', 'Payments', 'Sessions'] as const).map((tab) => {
          const isActive = filterTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              style={{
                padding: '10px 14px',
                fontSize: '13px',
                lineHeight: '18px',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                borderBottom: isActive ? '2px solid var(--color-text-primary)' : '2px solid transparent',
                cursor: 'pointer',
                background: 'none',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Notifications Groups */}
      {filteredNotifications.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* TODAY */}
          {todayList.length > 0 && (
            <div>
              <div style={{ fontSize: '12px', lineHeight: '18px', fontWeight: 700, color: 'var(--color-text-muted)', letterSpacing: '0.04em', marginBottom: '10px' }}>
                TODAY
              </div>
              <div
                style={{
                  backgroundColor: 'var(--color-canvas)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  overflow: 'hidden',
                }}
              >
                {todayList.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 20px',
                      borderBottom: '1px solid var(--color-divider)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      {getNotifIcon(item.type)}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                          <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                            {item.title}
                          </span>
                          {!item.isRead && (
                            <span style={{ width: '6px', height: '6px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-border-danger)' }} />
                          )}
                        </div>
                        <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-body)', fontWeight: 500 }}>
                          {item.description}
                        </p>
                        {item.actionText && (
                          <button
                            onClick={() => handleActionClick(item)}
                            style={{
                              fontSize: '12px',
                              lineHeight: '18px',
                              fontWeight: 700,
                              color: 'var(--color-link)',
                              marginTop: '6px',
                              cursor: 'pointer',
                              border: 'none',
                              background: 'none',
                              padding: 0,
                            }}
                          >
                            {item.actionText} →
                          </button>
                        )}
                      </div>
                    </div>

                    <div style={{ fontSize: '12px', lineHeight: '18px', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', fontWeight: 600 }}>
                      {item.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* YESTERDAY */}
          {yesterdayList.length > 0 && (
            <div>
              <div style={{ fontSize: '12px', lineHeight: '18px', fontWeight: 700, color: 'var(--color-text-muted)', letterSpacing: '0.04em', marginBottom: '10px' }}>
                YESTERDAY
              </div>
              <div
                style={{
                  backgroundColor: 'var(--color-canvas)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  overflow: 'hidden',
                }}
              >
                {yesterdayList.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 20px',
                      borderBottom: '1px solid var(--color-divider)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      {getNotifIcon(item.type)}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                          <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                            {item.title}
                          </span>
                        </div>
                        <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-body)', fontWeight: 500 }}>
                          {item.description}
                        </p>
                        {item.actionText && (
                          <button
                            onClick={() => handleActionClick(item)}
                            style={{
                              fontSize: '12px',
                              lineHeight: '18px',
                              fontWeight: 700,
                              color: 'var(--color-link)',
                              marginTop: '6px',
                              cursor: 'pointer',
                              border: 'none',
                              background: 'none',
                              padding: 0,
                            }}
                          >
                            {item.actionText} →
                          </button>
                        )}
                      </div>
                    </div>

                    <div style={{ fontSize: '12px', lineHeight: '18px', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', fontWeight: 600 }}>
                      {item.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EARLIER */}
          {earlierList.length > 0 && (
            <div>
              <div style={{ fontSize: '12px', lineHeight: '18px', fontWeight: 700, color: 'var(--color-text-muted)', letterSpacing: '0.04em', marginBottom: '10px' }}>
                EARLIER
              </div>
              <div
                style={{
                  backgroundColor: 'var(--color-canvas)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  overflow: 'hidden',
                }}
              >
                {earlierList.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 20px',
                      borderBottom: '1px solid var(--color-divider)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      {getNotifIcon(item.type)}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                          <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                            {item.title}
                          </span>
                        </div>
                        <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-body)', fontWeight: 500 }}>
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div style={{ fontSize: '12px', lineHeight: '18px', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', fontWeight: 600 }}>
                      {item.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div
          style={{
            backgroundColor: 'var(--color-canvas)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            padding: '64px 20px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-status-success-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-status-success-fg)',
              marginBottom: '16px',
            }}
          >
            <Bell size={22} strokeWidth={1.75} />
          </div>
          <h3 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
            No notifications
          </h3>
          <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
            New enrolments, payments and session reminders will show up here.
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationsView;


