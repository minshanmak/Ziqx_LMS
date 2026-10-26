'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '../../components/Sidebar';
import { MobileTopBar } from '../../components/MobileTopBar';
import { MobileBottomNav } from '../../components/MobileBottomNav';
import { CreateCourseModal } from '../../components/modals/CreateCourseModal';
import { AddModuleModal } from '../../components/modals/AddModuleModal';
import { ConfirmModal } from '../../components/modals/ConfirmModal';
import { CoursePreviewModal } from '../../components/modals/CoursePreviewModal';
import { Toast } from '../../components/Toast';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPortal = pathname?.includes('/learner-portal');

  return (
    <div className="app-container">
      <Sidebar />
      <main
        className="main-content"
        style={{
          flexGrow: 1,
          minWidth: 0,
          height: '100vh',
          maxHeight: '100vh',
          backgroundColor: 'var(--color-canvas)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Suspense fallback={null}>
          <MobileTopBar />
        </Suspense>

        <div
          className="main-content-scroll"
          style={{
            flex: '1 1 0%',
            minHeight: 0,
            overflowY: isPortal ? 'hidden' : 'auto',
            width: '100%',
          }}
        >
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <MobileBottomNav />
        </Suspense>

        {/* Global Modals & Notifications */}
        <CreateCourseModal />
        <AddModuleModal />
        <ConfirmModal />
        <CoursePreviewModal />
        <Toast />
      </main>
    </div>
  );
}
