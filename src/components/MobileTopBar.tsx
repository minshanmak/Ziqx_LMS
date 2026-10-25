import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, ChevronDown, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileTopBar: React.FC = () => {
  const location = useLocation();
  const { unreadNotificationsCount, showToast } = useApp();
  const [profileOpen, setProfileOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Determine current title as per Figma screen: "Overview", "Courses", "Learners", etc.
  let pageTitle = 'Overview';
  const path = location.pathname;
  if (path.includes('/admin/courses') || path.includes('/admin/course/')) {
    pageTitle = 'Courses';
  } else if (path.includes('/admin/learners')) {
    pageTitle = 'Learners';
  } else if (path.includes('/admin/learner-portal')) {
    pageTitle = 'Learner portal';
  } else if (path.includes('/admin/settings')) {
    pageTitle = 'Settings';
  } else if (path.includes('/admin/notifications')) {
    pageTitle = 'Notifications';
  }

  // In Learner portal full preview mode, hide the top bar
  if (path.includes('/admin/learner-portal') && location.search.includes('preview=true')) {
    return null;
  }

  return (
    <header className="mobile-topbar" style={{ position: 'relative' }}>
      {/* Left: Active Page Title matching Figma ov_row2_box1.png */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <h1
          style={{
            fontSize: '20px',
            lineHeight: '28px',
            fontWeight: 700,
            color: 'var(--color-text-primary, #14151A)',
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          {pageTitle}
        </h1>
      </div>

      {/* Right: Notifications Bell + User Avatar DM with chevron */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} ref={popoverRef}>
        {/* Notifications Icon Button */}
        <Link
          to="/admin/notifications"
          aria-label="View notifications"
          style={{
            position: 'relative',
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-primary, #14151A)',
            textDecoration: 'none',
          }}
        >
          <Bell size={19} strokeWidth={1.75} />
          {unreadNotificationsCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '7px',
                right: '7px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--action-danger, #C23030)',
              }}
            />
          )}
        </Link>

        {/* User Avatar "DM" in light blue with chevron */}
        <button
          onClick={() => setProfileOpen(prev => !prev)}
          aria-label="Account profile menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-full, 9999px)',
              backgroundColor: '#DCE7F9',
              color: '#14151A',
              fontWeight: 700,
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            DM
          </div>
          <ChevronDown size={14} color="#70737E" strokeWidth={1.75} />
        </button>

        {/* Profile Popover on Mobile */}
        {profileOpen && (
          <div
            style={{
              position: 'absolute',
              top: '52px',
              right: '16px',
              width: '240px',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: 'var(--shadow-modal, 0 16px 40px rgba(0,0,0,0.12))',
              border: '1px solid var(--border-divider, #ECECEF)',
              padding: '12px',
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <div style={{ padding: '8px 10px', borderBottom: '1px solid #ECECEF', marginBottom: '4px' }}>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#14151A' }}>Daniel Mensah</div>
              <div style={{ fontSize: '12px', color: '#5B5E69' }}>daniel@trainly.example</div>
            </div>

            <Link
              to="/admin/settings"
              onClick={() => setProfileOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#14151A',
                textDecoration: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F6F6F8')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <SettingsIcon size={16} strokeWidth={1.75} />
              <span>Settings</span>
            </Link>

            <button
              onClick={() => {
                setProfileOpen(false);
                showToast('Signed out of Trainly LMS');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#C23030',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FDF2F2')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <LogOut size={16} strokeWidth={1.75} />
              <span>Log out</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
