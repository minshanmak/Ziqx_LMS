'use client';

import React, { createContext, useContext, useState, useMemo, useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type {
  ActiveTab,
  CourseWorkspaceTab,
  Course,
  Learner,
  NotificationItem,
  LearnerPortalConfig,
  OrganizationSettings,
  Module,
  Lesson
} from '../types';
import {
  initialCourses,
  initialLearners,
  initialNotifications,
  initialPortalConfig,
  initialSettings
} from '../data/mockData';

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  
  // Courses state
  courses: Course[];
  selectedCourseId: string;
  setSelectedCourseId: (id: string) => void;
  selectedCourse: Course | undefined;
  workspaceTab: CourseWorkspaceTab;
  setWorkspaceTab: (tab: CourseWorkspaceTab) => void;
  
  // Modals
  isCreateCourseOpen: boolean;
  setIsCreateCourseOpen: (open: boolean) => void;
  isAddModuleOpen: boolean;
  setIsAddModuleOpen: (open: boolean) => void;
  isArchiveModalOpen: boolean;
  setIsArchiveModalOpen: (open: boolean) => void;
  isUnpublishModalOpen: boolean;
  setIsUnpublishModalOpen: (open: boolean) => void;
  isCoursePreviewOpen: boolean;
  setIsCoursePreviewOpen: (open: boolean) => void;
  targetCourseForAction: Course | null;
  setTargetCourseForAction: (course: Course | null) => void;
  
  // Popovers
  isNotificationsPopoverOpen: boolean;
  setIsNotificationsPopoverOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  isProfilePopoverOpen: boolean;
  setIsProfilePopoverOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  
  // Learners & Notifications
  learners: Learner[];
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markAllNotificationsRead: () => void;
  markNotificationRead: (id: string) => void;
  
  // Portal & Settings
  portalConfig: LearnerPortalConfig;
  setPortalConfig: React.Dispatch<React.SetStateAction<LearnerPortalConfig>>;
  settings: OrganizationSettings;
  setSettings: React.Dispatch<React.SetStateAction<OrganizationSettings>>;
  
  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  // Action Handlers
  openCourseWorkspace: (courseId: string, tab?: CourseWorkspaceTab) => void;
  createCourse: (
    title: string,
    isFree: boolean,
    price: number,
    extra?: {
      slug?: string;
      shortDescription?: string;
      thumbnailUrl?: string;
      level?: string;
      originalPrice?: number;
    }
  ) => Course;
  archiveCourse: (courseId: string) => void;
  unpublishCourse: (courseId: string) => void;
  publishCourse: (courseId: string) => void;
  addModule: (courseId: string, title: string, description?: string) => void;
  addLesson: (courseId: string, moduleId: string, title: string, description: string, videoUrl: string, durationMinutes: number) => void;
  updateCourseDetails: (courseId: string, updates: Partial<Course>) => void;
  deleteModule: (courseId: string, moduleId: string) => void;
  deleteLesson: (courseId: string, moduleId: string, lessonId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  // Derive activeTab directly from current URL pathname
  const activeTab = useMemo<ActiveTab>(() => {
    const path = pathname || '';
    if (path === '/' || path === '/admin' || path.startsWith('/admin/overview') || path.startsWith('/overview')) return 'overview';
    if (path.includes('/add-lesson')) return 'add-lesson';
    if (path.includes('/add-quiz')) return 'add-quiz';
    if (path.includes('/courses/new') || path.includes('/courses/create')) return 'courses';
    if (path.includes('/courses/') || path.includes('/course-workspace')) return 'course-workspace';
    if (path.includes('/courses')) return 'courses';
    if (path.includes('/learners')) return 'learners';
    if (path.includes('/learner-portal')) return 'learner-portal';
    if (path.includes('/settings')) return 'settings';
    if (path.includes('/notifications')) return 'notifications';
    return 'overview';
  }, [pathname]);

  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(() => {
    const match = typeof window !== 'undefined' ? window.location.pathname.match(/\/courses\/([^/]+)/) : null;
    if (match && match[1] && match[1] !== 'add-lesson' && match[1] !== 'add-quiz' && match[1] !== 'new') {
      return match[1];
    }
    return 'course-1';
  });
  const [workspaceTab, setWorkspaceTab] = useState<CourseWorkspaceTab>('overview');

  // Sync selectedCourseId when visiting /admin/courses/:courseId directly
  useEffect(() => {
    if (!pathname) return;
    const match = pathname.match(/\/courses\/([^/]+)/);
    if (match && match[1] && match[1] !== 'add-lesson' && match[1] !== 'add-quiz' && match[1] !== 'new') {
      setSelectedCourseId(match[1]);
    }
  }, [pathname]);
  
  // Modals
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isUnpublishModalOpen, setIsUnpublishModalOpen] = useState(false);
  const [isCoursePreviewOpen, setIsCoursePreviewOpen] = useState(false);
  const [targetCourseForAction, setTargetCourseForAction] = useState<Course | null>(null);
  
  // Popovers
  const [isNotificationsPopoverOpen, setIsNotificationsPopoverOpen] = useState(false);
  const [isProfilePopoverOpen, setIsProfilePopoverOpen] = useState(false);
  
  // Other Entities
  const [learners] = useState<Learner[]>(initialLearners);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [portalConfig, setPortalConfig] = useState<LearnerPortalConfig>(initialPortalConfig);
  const [settings, setSettings] = useState<OrganizationSettings>(initialSettings);
  
  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const selectedCourse = useMemo(() => {
    return courses.find(c => c.id === selectedCourseId) || courses[0];
  }, [courses, selectedCourseId]);

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('All notifications marked as read');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const setActiveTab = (tab: ActiveTab) => {
    const pathMap: Record<ActiveTab, string> = {
      overview: '/admin/overview',
      courses: '/admin/courses',
      'course-workspace': selectedCourseId ? `/admin/courses/${selectedCourseId}` : '/admin/courses',
      'add-lesson': '/admin/courses/add-lesson',
      'add-quiz': '/admin/courses/add-quiz',
      learners: '/admin/learners',
      'learner-portal': '/admin/learner-portal',
      settings: '/admin/settings',
      notifications: '/admin/notifications',
    };
    router.push(pathMap[tab] || '/admin/overview');
  };

  const openCourseWorkspace = (courseId: string, tab: CourseWorkspaceTab = 'overview') => {
    setSelectedCourseId(courseId);
    setWorkspaceTab(tab);
    router.push(`/admin/courses/${courseId}`);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const createCourse = (
    title: string,
    isFree: boolean,
    price: number,
    extra?: {
      slug?: string;
      shortDescription?: string;
      thumbnailUrl?: string;
      level?: string;
      originalPrice?: number;
    }
  ): Course => {
    const slug = extra?.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title,
      slug,
      shortDescription: extra?.shortDescription || 'Add course summary and lessons to get started.',
      status: 'Draft',
      modulesCount: 0,
      lessonsCount: 0,
      learnersCount: 0,
      price: isFree ? 0 : price,
      originalPrice: extra?.originalPrice,
      isFree,
      bannerTheme: 'purple',
      bannerIcon: 'book',
      thumbnailUrl: extra?.thumbnailUrl,
      level: extra?.level || 'Beginner',
      modules: [],
      learners: [],
      liveSessions: []
    };

    setCourses(prev => [newCourse, ...prev]);
    showToast(`Course "${title}" created as draft`);
    return newCourse;
  };

  const archiveCourse = (courseId: string) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status: 'Archived' } : c));
    showToast('Course archived');
  };

  const unpublishCourse = (courseId: string) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status: 'Draft' } : c));
    showToast('Course moved to draft');
  };

  const publishCourse = (courseId: string) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status: 'Published' } : c));
    showToast('Course published successfully');
  };

  const addModule = (courseId: string, title: string, description?: string) => {
    const newMod: Module = {
      id: `mod-${Date.now()}`,
      courseId,
      title,
      description: description || '',
      order: 99,
      status: 'Published',
      lessons: []
    };

    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      const updatedModules = [...c.modules, { ...newMod, order: c.modules.length + 1 }];
      return {
        ...c,
        modules: updatedModules,
        modulesCount: updatedModules.length
      };
    }));
    showToast(`Module "${title}" added`);
  };

  const addLesson = (
    courseId: string,
    moduleId: string,
    title: string,
    description: string,
    videoUrl: string,
    durationMinutes: number
  ) => {
    const newLesson: Lesson = {
      id: `les-${Date.now()}`,
      moduleId,
      title,
      description,
      videoUrl,
      durationMinutes: durationMinutes || 10,
      order: 99,
      status: 'Published'
    };

    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      let totalLessons = 0;
      const updatedModules = c.modules.map(m => {
        if (m.id !== moduleId) {
          totalLessons += m.lessons.length;
          return m;
        }
        const updatedLessons = [...m.lessons, { ...newLesson, order: m.lessons.length + 1 }];
        totalLessons += updatedLessons.length;
        return {
          ...m,
          lessons: updatedLessons
        };
      });

      return {
        ...c,
        modules: updatedModules,
        lessonsCount: totalLessons
      };
    }));
    showToast(`Lesson "${title}" added to module`);
  };

  const updateCourseDetails = (courseId: string, updates: Partial<Course>) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, ...updates } : c));
    showToast('Course settings updated');
  };

  const deleteModule = (courseId: string, moduleId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      const filtered = c.modules.filter(m => m.id !== moduleId);
      const totalLessons = filtered.reduce((acc, m) => acc + m.lessons.length, 0);
      return {
        ...c,
        modules: filtered,
        modulesCount: filtered.length,
        lessonsCount: totalLessons
      };
    }));
    showToast('Module removed');
  };

  const deleteLesson = (courseId: string, moduleId: string, lessonId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      let totalLessons = 0;
      const updatedModules = c.modules.map(m => {
        if (m.id !== moduleId) {
          totalLessons += m.lessons.length;
          return m;
        }
        const updatedLessons = m.lessons.filter(l => l.id !== lessonId);
        totalLessons += updatedLessons.length;
        return {
          ...m,
          lessons: updatedLessons
        };
      });

      return {
        ...c,
        modules: updatedModules,
        lessonsCount: totalLessons
      };
    }));
    showToast('Lesson removed');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileSidebarOpen,
        setMobileSidebarOpen,
        courses,
        selectedCourseId,
        setSelectedCourseId,
        selectedCourse,
        workspaceTab,
        setWorkspaceTab,
        isCreateCourseOpen,
        setIsCreateCourseOpen,
        isAddModuleOpen,
        setIsAddModuleOpen,
        isArchiveModalOpen,
        setIsArchiveModalOpen,
        isUnpublishModalOpen,
        setIsUnpublishModalOpen,
        isCoursePreviewOpen,
        setIsCoursePreviewOpen,
        targetCourseForAction,
        setTargetCourseForAction,
        isNotificationsPopoverOpen,
        setIsNotificationsPopoverOpen,
        isProfilePopoverOpen,
        setIsProfilePopoverOpen,
        learners,
        notifications,
        unreadNotificationsCount,
        markAllNotificationsRead,
        markNotificationRead,
        portalConfig,
        setPortalConfig,
        settings,
        setSettings,
        toastMessage,
        showToast,
        openCourseWorkspace,
        createCourse,
        archiveCourse,
        unpublishCourse,
        publishCourse,
        addModule,
        addLesson,
        updateCourseDetails,
        deleteModule,
        deleteLesson
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
