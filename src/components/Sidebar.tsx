'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutGrid,
  BookOpen,
  Users,
  Globe,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Sliders,
  GraduationCap,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { ActiveTab } from '../types';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    unreadNotificationsCount,
    notifications,
    markAllNotificationsRead,
    isNotificationsPopoverOpen,
    setIsNotificationsPopoverOpen,
    isProfilePopoverOpen,
    setIsProfilePopoverOpen,
    showToast
  } = useApp();

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsPopoverOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfilePopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsNotificationsPopoverOpen, setIsProfilePopoverOpen]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 768 && width <= 1024) {
        setSidebarCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarCollapsed]);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; path: string }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutGrid size={18} />, path: '/admin/overview' },
    { id: 'courses', label: 'Courses', icon: <BookOpen size={18} />, path: '/admin/courses' },
    { id: 'learners', label: 'Learners', icon: <Users size={18} />, path: '/admin/learners' },
    { id: 'learner-portal', label: 'Learner portal', icon: <Globe size={18} />, path: '/admin/learner-portal' },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} />, path: '/admin/settings' },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      <div
        className={`sidebar-mobile-backdrop ${mobileSidebarOpen ? 'active' : ''}`}
        onClick={() => setMobileSidebarOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`app-sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileSidebarOpen ? 'mobile-open' : ''}`}
        style={{
          width: sidebarCollapsed ? '76px' : '248px',
          minWidth: sidebarCollapsed ? '76px' : '248px',
          backgroundColor: 'var(--bg-canvas, #ffffff)',
          borderRight: '1px solid var(--border-divider, #ECECEF)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100vh',
          position: 'sticky',
          top: 0,
          transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), min-width 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 50,
          userSelect: 'none',
        }}
      >
        {/* Floating Border Collapse Button - Desktop/Tablet only */}
        <button
          onClick={() => setSidebarCollapsed(prev => !prev)}
          className="sidebar-collapse-btn"
          style={{
            position: 'absolute',
            right: '-12px',
            top: '22px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-default, #D9DADF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary, #5B5E69)',
            boxShadow: 'var(--shadow-raised)',
            zIndex: 60,
            cursor: 'pointer',
          }}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
        {sidebarCollapsed ? <ChevronRight size={13} strokeWidth={1.75} /> : <ChevronLeft size={13} strokeWidth={1.75} />}
      </button>

      {/* Top Area: Logo & Nav Links */}
      <div>
        {/* Brand Header */}
        <div
          style={{
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: sidebarCollapsed ? '0 16px' : '0 16px 0 24px',
          }}
        >
          <Link
            href="/admin/overview"
            onClick={() => setMobileSidebarOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--action-primary, #14151A)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                flexShrink: 0,
              }}
            >
              <GraduationCap size={18} strokeWidth={1.75} />
            </div>

            {!sidebarCollapsed && (
              <span
                className="sidebar-logo-text"
                style={{
                  fontWeight: 700,
                  fontSize: '17px',
                  lineHeight: '24px',
                  color: 'var(--text-primary, #14151A)',
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                }}
              >
                Ziqx Skills
              </span>
            )}
          </Link>

          {/* Close button for mobile drawer */}
          <button
            className="mobile-sidebar-close-btn"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close navigation"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const isActive =
              activeTab === item.id ||
              (item.id === 'courses' &&
                (activeTab === 'course-workspace' || activeTab === 'add-lesson' || activeTab === 'add-quiz'));

            return (
              <Link
                key={item.id}
                href={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                title={sidebarCollapsed ? item.label : undefined}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: sidebarCollapsed ? '10px 0' : '9px 12px',
                  justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                  borderRadius: '12px',
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--text-primary, #14151A)' : 'var(--text-secondary, #5B5E69)',
                  backgroundColor: isActive ? 'var(--bg-disabled, #EDEDF0)' : 'transparent',
                  transition: 'background-color 0.15s ease, color 0.15s ease',
                  border: 'none',
                  textDecoration: 'none',
                  boxSizing: 'border-box',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'var(--bg-muted, #F6F6F8)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {/* Active page indicator (black box at the left edge) */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '4px',
                      height: '20px',
                      backgroundColor: 'var(--action-primary, #14151A)',
                      borderRadius: '0 4px 4px 0',
                    }}
                  />
                )}

                <div style={{ color: isActive ? 'var(--icon-default, #14151A)' : 'var(--icon-secondary, #5B5E69)', display: 'flex', alignItems: 'center' }}>
                  {item.icon}
                </div>
                {!sidebarCollapsed && <span className="sidebar-text-label">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Notifications & Profile */}
      <div
        style={{
          padding: '14px 14px 18px',
          borderTop: '1px solid var(--border-divider, #ECECEF)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          position: 'relative',
        }}
      >
        {/* Notifications Button */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setIsNotificationsPopoverOpen(prev => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarCollapsed ? 'center' : 'space-between',
              width: '100%',
              padding: sidebarCollapsed ? '9px 0' : '9px 12px',
              borderRadius: '8px',
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: isNotificationsPopoverOpen ? 700 : 500,
              color: 'var(--text-secondary, #5B5E69)',
              backgroundColor: isNotificationsPopoverOpen ? 'var(--bg-disabled, #EDEDF0)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (!isNotificationsPopoverOpen) e.currentTarget.style.backgroundColor = 'var(--bg-muted, #F6F6F8)';
            }}
            onMouseLeave={(e) => {
              if (!isNotificationsPopoverOpen) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', color: 'var(--icon-secondary, #5B5E69)' }}>
                <Bell size={18} strokeWidth={1.75} />
                {unreadNotificationsCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-1px',
                      right: '-1px',
                      width: '6px',
                      height: '6px',
                      backgroundColor: 'var(--action-danger, #C23030)',
                      borderRadius: '50%',
                    }}
                  />
                )}
              </div>
              {!sidebarCollapsed && <span className="sidebar-footer-text">Notifications</span>}
            </div>
          </button>

          {/* Notifications Popover */}
          {isNotificationsPopoverOpen && (
            <div
              className="pop-in"
              style={{
                position: 'absolute',
                bottom: '100%',
                left: sidebarCollapsed ? '80px' : '0',
                width: '320px',
                backgroundColor: 'var(--bg-canvas, #ffffff)',
                border: '1px solid var(--border-default, #D9DADF)',
                borderRadius: '16px',
                boxShadow: 'var(--shadow-overlay)',
                padding: '16px',
                marginBottom: '10px',
                zIndex: 100,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '12px',
                  borderBottom: '1px solid var(--border-divider, #ECECEF)',
                  marginBottom: '10px',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: 'var(--text-primary, #14151A)' }}>
                  Notifications
                </div>
                <button
                  onClick={markAllNotificationsRead}
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-link, #3B40B8)',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Mark all read
                </button>
              </div>

              <div style={{ maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notifications.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setIsNotificationsPopoverOpen(false);
                      setActiveTab('notifications');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '8px 6px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Circle icon */}
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor:
                          item.type === 'payment_failed'
                            ? 'var(--status-danger-bg, #FBE4E4)'
                            : item.type === 'new_enrolment'
                            ? 'var(--status-info-bg, #E3E7FB)'
                            : 'var(--status-success-bg, #E1F3E3)',
                        color:
                          item.type === 'payment_failed'
                            ? 'var(--status-danger-fg, #B42E2E)'
                            : item.type === 'new_enrolment'
                            ? 'var(--status-info-fg, #3B40B8)'
                            : 'var(--status-success-fg, #25703A)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {item.type === 'payment_failed' ? '✕' : item.type === 'new_enrolment' ? '👤' : '▶'}
                    </div>

                    <div style={{ flexGrow: 1, paddingRight: '12px' }}>
                      <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--text-primary, #14151A)', fontWeight: 500, marginBottom: '2px' }}>
                        {item.description}
                      </p>
                      <span style={{ fontSize: '12px', lineHeight: '18px', color: 'var(--text-muted, #70737E)', fontWeight: 600 }}>
                        {item.timestamp}
                      </span>
                    </div>

                    {!item.isRead && (
                      <span
                        style={{
                          position: 'absolute',
                          right: '6px',
                          top: '12px',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--action-danger, #C23030)',
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div style={{ paddingTop: '10px', borderTop: '1px solid var(--border-divider, #ECECEF)', textAlign: 'center' }}>
                <Link
                  href="/admin/notifications"
                  onClick={() => setIsNotificationsPopoverOpen(false)}
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-link, #3B40B8)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  View all notifications →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Card & Menu */}
        <div ref={profileRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setIsProfilePopoverOpen(prev => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: sidebarCollapsed ? '8px 0' : '8px 10px',
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              borderRadius: '12px',
              cursor: 'pointer',
              border: 'none',
              backgroundColor: isProfilePopoverOpen ? 'var(--bg-disabled, #EDEDF0)' : 'transparent',
              textAlign: 'left',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (!isProfilePopoverOpen) e.currentTarget.style.backgroundColor = 'var(--bg-muted, #F6F6F8)';
            }}
            onMouseLeave={(e) => {
              if (!isProfilePopoverOpen) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {/* Avatar Pill using PDF Page 1 avatar/blue token #BFD4F2 */}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--avatar-blue, #BFD4F2)',
                color: 'var(--text-primary, #14151A)',
                fontWeight: 800,
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              DM
            </div>

            {!sidebarCollapsed && (
              <div className="sidebar-footer-text" style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 700,
                    color: 'var(--text-primary, #14151A)',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  Daniel Mensah
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    lineHeight: '18px',
                    color: 'var(--text-secondary, #5B5E69)',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  Trainer and admin
                </div>
              </div>
            )}
          </button>

          {/* Profile Menu Popover */}
          {isProfilePopoverOpen && (
            <div
              className="pop-in"
              style={{
                position: 'absolute',
                bottom: '100%',
                left: sidebarCollapsed ? '80px' : '0',
                width: '220px',
                backgroundColor: 'var(--bg-canvas, #ffffff)',
                border: '1px solid var(--border-default, #D9DADF)',
                borderRadius: '16px',
                boxShadow: 'var(--shadow-overlay)',
                padding: '6px',
                marginBottom: '8px',
                zIndex: 100,
              }}
            >
              <Link
                href="/admin/settings"
                onClick={() => setIsProfilePopoverOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  lineHeight: '18px',
                  fontWeight: 500,
                  color: 'var(--text-body, #3A3D47)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  boxSizing: 'border-box',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-muted, #F6F6F8)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <User size={15} strokeWidth={1.75} color="var(--icon-secondary, #5B5E69)" />
                Profile & account
              </Link>

              <Link
                href="/admin/notifications"
                onClick={() => setIsProfilePopoverOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  lineHeight: '18px',
                  fontWeight: 500,
                  color: 'var(--text-body, #3A3D47)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  boxSizing: 'border-box',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-muted, #F6F6F8)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <Sliders size={15} strokeWidth={1.75} color="var(--icon-secondary, #5B5E69)" />
                Notification preferences
              </Link>

              <div style={{ margin: '4px 0', borderTop: '1px solid var(--border-divider, #ECECEF)' }} />

              <button
                onClick={() => {
                  setIsProfilePopoverOpen(false);
                  showToast('Signed out of session');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  lineHeight: '18px',
                  fontWeight: 700,
                  color: 'var(--action-danger, #C23030)',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--status-danger-bg, #FBE4E4)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <LogOut size={15} strokeWidth={1.75} color="var(--action-danger, #C23030)" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
    </>
  );
};
