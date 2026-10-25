export type CourseStatus = 'Published' | 'Draft' | 'Archived';

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  videoUrl: string;
  durationMinutes: number;
  order: number;
  status: CourseStatus;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  questions: QuizQuestion[];
  isOptional: boolean;
  afterLessonId: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  order: number;
  status: CourseStatus;
  lessons: Lesson[];
  quizzes?: Quiz[];
}

export interface CourseLearnerProgress {
  learnerId: string;
  learnerName: string;
  learnerInitials: string;
  avatarColor: string;
  enrolledDate: string;
  progressPercent: number;
  lastActivity: string;
  accessStatus: 'Active' | 'Revoked';
}

export interface LiveSession {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  dateStr: string;
  timeRange: string;
  timestamp: string;
  meetUrl: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  bgColor: string;
  tagColor: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  status: CourseStatus;
  modulesCount: number;
  lessonsCount: number;
  learnersCount: number;
  price: number;
  originalPrice?: number;
  isFree: boolean;
  bannerTheme: 'cyan' | 'blue' | 'green' | 'purple' | 'orange' | 'gray';
  bannerIcon: 'database' | 'trending' | 'barChart' | 'layers' | 'book' | 'messageSquare';
  modules: Module[];
  learners: CourseLearnerProgress[];
  liveSessions: LiveSession[];
  thumbnailUrl?: string;
  completionRate?: number;
  averageProgress?: number;
  level?: string;
}

export interface Learner {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  phone: string;
  email: string;
  enrolledOn: string;
  enrolledCourses: string[];
  coursesSummary: string;
}

export interface NotificationItem {
  id: string;
  type: 'payment_failed' | 'new_enrolment' | 'live_session' | 'course_completed' | 'payment_received';
  title: string;
  description: string;
  timestamp: string;
  dateCategory: 'Today' | 'Yesterday' | 'Earlier';
  isRead: boolean;
  actionText?: string;
  actionPayload?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  learner: string;
  course: string;
}

export interface LearnerPortalConfig {
  hero: {
    eyebrow: string;
    headline: string;
    supportingText: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    bannerImage?: string;
  };
  mentor: {
    sectionHeading: string;
    mentorName: string;
    role: string;
    bio: string;
    highlight1: string;
    highlight2: string;
    photo?: string;
  };
  courses: {
    sectionHeading: string;
    subheading: string;
    featuredCourseIds: string[];
  };
  testimonials: {
    sectionHeading: string;
    items: TestimonialItem[];
  };
  footer: {
    orgName: string;
    tagline: string;
    contactEmail: string;
    socialHandle: string;
    copyrightLine: string;
  };
  design: {
    accentColor: string;
    headingStyle: 'sans' | 'serif';
    cornerRadius: number;
  };
}

export interface OrganizationSettings {
  name: string;
  organization: string;
  supportEmail: string;
  timeZone: string;
  customDomain: string;
  isDomainVerified: boolean;
  siteTitle: string;
  metaDescription: string;
  indexSearchEngines?: boolean;
  emailEnrollmentConfirmation?: boolean;
  emailSessionReminders?: boolean;
  emailSessionChanges?: boolean;
  emailWeeklySummary?: boolean;
  googleMeetConnected?: boolean;
  zoomConnected?: boolean;
  paymentGatewayConnected?: boolean;
}

export type ActiveTab = 'overview' | 'courses' | 'course-workspace' | 'learners' | 'learner-portal' | 'settings' | 'notifications' | 'add-lesson' | 'add-quiz';
export type CourseWorkspaceTab = 'overview' | 'modules' | 'learners' | 'sessions' | 'settings';
