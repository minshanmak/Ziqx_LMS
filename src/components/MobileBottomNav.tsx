'use client';

import React, { Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LayoutGrid, BookOpen, Users, Globe, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { ActiveTab } from '../types';

const MobileBottomNavContent: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setActiveTab } = useApp();

  const isPortal = pathname?.includes('/learner-portal');
  // If in portal full preview, we don't show the admin bottom nav
  if (isPortal && searchParams?.get('preview') === 'true') {
    return null;
  }

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; path: string }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutGrid size={20} strokeWidth={1.75} />, path: '/admin/overview' },
    { id: 'courses', label: 'Courses', icon: <BookOpen size={20} strokeWidth={1.75} />, path: '/admin/courses' },
    { id: 'learners', label: 'Learners', icon: <Users size={20} strokeWidth={1.75} />, path: '/admin/learners' },
    { id: 'learner-portal', label: 'Portal', icon: <Globe size={20} strokeWidth={1.75} />, path: '/admin/learner-portal' },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} strokeWidth={1.75} />, path: '/admin/settings' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setActiveTab(item.id);
    router.push(item.path);
  };

  const currentPath = pathname || '';

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      {navItems.map((item) => {
        const isActive =
          currentPath.startsWith(item.path) ||
          (item.id === 'courses' && currentPath.includes('/course/'));

        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item)}
            className={`mobile-bottom-nav-item ${isActive ? 'active' : ''}`}
            aria-label={item.label}
          >
            <div className="mobile-bottom-nav-icon">
              {item.icon}
            </div>
            <span className="mobile-bottom-nav-label">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export const MobileBottomNav: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <MobileBottomNavContent />
    </Suspense>
  );
};
