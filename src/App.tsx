import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Toast } from './components/Toast';

// Modals
import { CreateCourseModal } from './components/modals/CreateCourseModal';
import { AddModuleModal } from './components/modals/AddModuleModal';
import { ConfirmModal } from './components/modals/ConfirmModal';
import { CoursePreviewModal } from './components/modals/CoursePreviewModal';

// Views
import { OverviewView } from './views/OverviewView';
import { CoursesView } from './views/CoursesView';
import { CreateCourseView } from './views/CreateCourseView';
import { CourseWorkspaceView } from './views/CourseWorkspaceView';
import { AddLessonView } from './views/AddLessonView';
import { AddQuizView } from './views/AddQuizView';
import { LearnersView } from './views/LearnersView';
import { LearnerPortalView } from './views/LearnerPortalView';
import { SettingsView } from './views/SettingsView';
import { NotificationsView } from './views/NotificationsView';

import { MobileTopBar } from './components/MobileTopBar';
import { MobileBottomNav } from './components/MobileBottomNav';

const MainContent: React.FC = () => {
  const location = useLocation();
  const isPortal = location.pathname.includes('/learner-portal');

  return (
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
      <MobileTopBar />

      <div
        className="main-content-scroll"
        style={{
          flex: '1 1 0%',
          minHeight: 0,
          overflowY: isPortal ? 'hidden' : 'auto',
          width: '100%',
        }}
      >
      <Routes>
        {/* Default redirects */}
        <Route path="/" element={<Navigate to="/admin/overview" replace />} />
        <Route path="/admin" element={<Navigate to="/admin/overview" replace />} />

        {/* Primary Admin Routes */}
        <Route path="/admin/overview" element={<OverviewView />} />
        <Route path="/admin/courses" element={<CoursesView />} />
        <Route path="/admin/courses/new" element={<CreateCourseView />} />
        <Route path="/admin/courses/create" element={<Navigate to="/admin/courses/new" replace />} />
        <Route path="/admin/courses/:courseId" element={<CourseWorkspaceView />} />
        <Route path="/admin/courses/add-lesson" element={<AddLessonView />} />
        <Route path="/admin/courses/add-quiz" element={<AddQuizView />} />
        <Route path="/admin/course-workspace" element={<CourseWorkspaceView />} />
        <Route path="/admin/add-lesson" element={<AddLessonView />} />
        <Route path="/admin/add-quiz" element={<AddQuizView />} />
        <Route path="/admin/learners" element={<LearnersView />} />
        <Route path="/admin/learner-portal" element={<LearnerPortalView />} />
        <Route path="/admin/settings" element={<SettingsView />} />
        <Route path="/admin/notifications" element={<NotificationsView />} />

        {/* Backward Compatibility Redirects */}
        <Route path="/overview" element={<Navigate to="/admin/overview" replace />} />
        <Route path="/courses" element={<Navigate to="/admin/courses" replace />} />
        <Route path="/courses/new" element={<Navigate to="/admin/courses/new" replace />} />
        <Route path="/courses/:courseId" element={<Navigate to="/admin/courses/:courseId" replace />} />
        <Route path="/learners" element={<Navigate to="/admin/learners" replace />} />
        <Route path="/learner-portal" element={<Navigate to="/admin/learner-portal" replace />} />
        <Route path="/settings" element={<Navigate to="/admin/settings" replace />} />
        <Route path="/notifications" element={<Navigate to="/admin/notifications" replace />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/admin/overview" replace />} />
      </Routes>
      </div>

      <MobileBottomNav />

      {/* Global Modals & Notifications */}
      <CreateCourseModal />
      <AddModuleModal />
      <ConfirmModal />
      <CoursePreviewModal />
      <Toast />
    </main>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="app-container">
          <Sidebar />
          <MainContent />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
