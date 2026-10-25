import type { Course, Learner, NotificationItem, LearnerPortalConfig, OrganizationSettings } from '../types';

export const initialCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Data analysis',
    slug: 'data-analysis',
    shortDescription: 'Learn to clean, explore and explain data using spreadsheets and simple charts, with no coding needed.',
    status: 'Published',
    modulesCount: 6,
    lessonsCount: 40,
    learnersCount: 86,
    price: 59.0,
    originalPrice: 79.0,
    isFree: false,
    bannerTheme: 'cyan',
    bannerIcon: 'database',
    completionRate: 16,
    averageProgress: 38,
    modules: [
      {
        id: 'mod-1',
        courseId: 'course-1',
        title: 'Getting started',
        description: 'Orientation to data concepts, setup and first workbook.',
        order: 1,
        status: 'Published',
        lessons: [
          { id: 'les-1-1', moduleId: 'mod-1', title: 'Welcome & workspace walkthrough', description: 'Quick intro to how lessons work.', videoUrl: 'https://youtube.com/watch?v=demo1', durationMinutes: 7, order: 1, status: 'Published' },
          { id: 'les-1-2', moduleId: 'mod-1', title: 'Data terminology 101', description: 'Rows, columns, observations, and values.', videoUrl: 'https://youtube.com/watch?v=demo2', durationMinutes: 12, order: 2, status: 'Published' },
          { id: 'les-1-3', moduleId: 'mod-1', title: 'Downloading practice datasets', description: 'Get the CSV files used throughout.', videoUrl: 'https://youtube.com/watch?v=demo3', durationMinutes: 5, order: 3, status: 'Published' },
          { id: 'les-1-4', moduleId: 'mod-1', title: 'Formulas vs functions', description: 'Fundamental math and logic.', videoUrl: 'https://youtube.com/watch?v=demo4', durationMinutes: 14, order: 4, status: 'Published' },
          { id: 'les-1-5', moduleId: 'mod-1', title: 'Module 1 wrap-up & knowledge check', description: 'Test what you have absorbed.', videoUrl: 'https://youtube.com/watch?v=demo5', durationMinutes: 8, order: 5, status: 'Published' }
        ]
      },
      {
        id: 'mod-2',
        courseId: 'course-1',
        title: 'Cleaning messy data',
        description: 'Techniques to detect errors, duplicates and irregular formats.',
        order: 2,
        status: 'Published',
        lessons: [
          { id: 'les-2-1', moduleId: 'mod-2', title: 'Spotting bad data', description: 'Find duplicates, blanks and mismatched formats.', videoUrl: 'https://youtube.com/watch?v=demo6', durationMinutes: 9, order: 1, status: 'Published' },
          { id: 'les-2-2', moduleId: 'mod-2', title: 'Removing duplicates', description: 'Detect repeated rows and keep one clean record.', videoUrl: 'https://youtube.com/watch?v=demo7', durationMinutes: 14, order: 2, status: 'Published' },
          { id: 'les-2-3', moduleId: 'mod-2', title: 'Fixing dates and text', description: 'Convert text dates and keep one consistent format.', videoUrl: 'https://youtube.com/watch?v=demo8', durationMinutes: 10, order: 3, status: 'Published' },
          { id: 'les-2-4', moduleId: 'mod-2', title: 'Handling blanks', description: 'Decide when to fill, flag or remove empty cells.', videoUrl: 'https://youtube.com/watch?v=demo9', durationMinutes: 6, order: 4, status: 'Published' },
          { id: 'les-2-5', moduleId: 'mod-2', title: 'Cleaning checklist', description: 'A repeatable checklist to review any dataset.', videoUrl: 'https://youtube.com/watch?v=demo10', durationMinutes: 11, order: 5, status: 'Published' }
        ],
        quizzes: [
          {
            id: 'quiz-2-1',
            moduleId: 'mod-2',
            title: 'Cleaning messy data quiz',
            afterLessonId: 'les-2-3',
            isOptional: false,
            questions: [
              {
                id: 'q-1',
                question: 'Which of these is a sign of duplicate data?',
                options: [
                  'The same customer email appears on several rows',
                  'Every value in a column is different',
                  'Dates are written in one format',
                  'Numbers are aligned to the right'
                ],
                correctOptionIndex: 0,
                explanation: 'Duplicate email records in transaction logs usually signal multiple accidental submissions.'
              },
              {
                id: 'q-2',
                question: 'What is the best way to handle blank cells in numeric columns?',
                options: [
                  'Replace all blanks with 0 without checking',
                  'Determine if blanks mean zero or missing values first',
                  'Delete the entire column immediately',
                  'Color them red'
                ],
                correctOptionIndex: 1,
                explanation: 'Always verify domain context to differentiate missing information from actual zero measurements.'
              },
              {
                id: 'q-3',
                question: 'Which chart suits a trend over time?',
                options: [
                  'Pie chart',
                  'Line chart',
                  'Donut chart',
                  'Radar chart'
                ],
                correctOptionIndex: 1,
                explanation: 'Line charts are the most intuitive visualization for chronological data trends.'
              }
            ]
          }
        ]
      },
      {
        id: 'mod-3',
        courseId: 'course-1',
        title: 'Exploring datasets',
        description: '7 lessons on statistical summaries and filtering.',
        order: 3,
        status: 'Published',
        lessons: [
          { id: 'les-3-1', moduleId: 'mod-3', title: 'Averages, medians, and modes', description: 'Understand distributions.', videoUrl: 'https://youtube.com/watch?v=demo11', durationMinutes: 13, order: 1, status: 'Published' },
          { id: 'les-3-2', moduleId: 'mod-3', title: 'Outliers detection', description: 'How to spot unexpected data spikes.', videoUrl: 'https://youtube.com/watch?v=demo12', durationMinutes: 15, order: 2, status: 'Published' }
        ]
      },
      {
        id: 'mod-4',
        courseId: 'course-1',
        title: 'Pivot tables',
        description: '9 lessons on fast aggregation and dynamic views.',
        order: 4,
        status: 'Published',
        lessons: []
      },
      {
        id: 'mod-5',
        courseId: 'course-1',
        title: 'Telling the story',
        description: '5 lessons on executive summaries and presentations.',
        order: 5,
        status: 'Published',
        lessons: []
      },
      {
        id: 'mod-6',
        courseId: 'course-1',
        title: 'Final project',
        description: 'Capstone project analyzed end to end.',
        order: 6,
        status: 'Published',
        lessons: []
      }
    ],
    learners: [
      { learnerId: 'lrn-1', learnerName: 'Olive Hart', learnerInitials: 'OH', avatarColor: '#f97316', enrolledDate: 'Oct 3, 2026', progressPercent: 30, lastActivity: 'Today', accessStatus: 'Active' },
      { learnerId: 'lrn-2', learnerName: 'Maria Santos', learnerInitials: 'MS', avatarColor: '#0ea5e9', enrolledDate: 'Oct 12, 2026', progressPercent: 62, lastActivity: 'Today', accessStatus: 'Active' },
      { learnerId: 'lrn-4', learnerName: 'Kofi Asante', learnerInitials: 'KA', avatarColor: '#84cc16', enrolledDate: 'Sep 29, 2026', progressPercent: 88, lastActivity: 'Yesterday', accessStatus: 'Active' },
      { learnerId: 'lrn-10', learnerName: 'Lena Fischer', learnerInitials: 'LF', avatarColor: '#eab308', enrolledDate: 'Jul 20, 2026', progressPercent: 45, lastActivity: 'Sep 2, 2026', accessStatus: 'Revoked' },
      { learnerId: 'lrn-6', learnerName: 'Noah Park', learnerInitials: 'NP', avatarColor: '#06b6d4', enrolledDate: 'Oct 19, 2026', progressPercent: 5, lastActivity: 'Oct 19, 2026', accessStatus: 'Active' }
    ],
    liveSessions: [
      {
        id: 'ls-1',
        courseId: 'course-1',
        courseTitle: 'Data analysis',
        title: 'Data analysis: Q&A',
        dateStr: 'Today',
        timeRange: '10:00 - 11:00 AM (GMT+1)',
        timestamp: 'Today',
        meetUrl: 'https://meet.google.com/ziqx-data-qa',
        status: 'Upcoming',
        bgColor: '#eff6ff',
        tagColor: '#3b82f6'
      },
      {
        id: 'ls-2',
        courseId: 'course-1',
        courseTitle: 'Data analysis',
        title: 'Cleaning data workshop',
        dateStr: 'Thu 29 Oct',
        timeRange: '2:00 - 3:00 PM (GMT+1)',
        timestamp: 'Thu 29 Oct',
        meetUrl: 'https://meet.google.com/ziqx-clean-ws',
        status: 'Upcoming',
        bgColor: '#ecfdf5',
        tagColor: '#10b981'
      },
      {
        id: 'ls-3',
        courseId: 'course-1',
        courseTitle: 'Data analysis',
        title: 'Kickoff session',
        dateStr: 'Mon 5 Oct',
        timeRange: '10:00 - 11:00 AM (GMT+1)',
        timestamp: 'Mon 5 Oct',
        meetUrl: 'https://meet.google.com/ziqx-kickoff',
        status: 'Completed',
        bgColor: '#f3f4f6',
        tagColor: '#6b7280'
      }
    ]
  },
  {
    id: 'course-2',
    title: 'Spreadsheet basics',
    slug: 'spreadsheet-basics',
    shortDescription: 'Master formulas, formatting, tables and everyday spreadsheet shortcuts from scratch.',
    status: 'Published',
    modulesCount: 4,
    lessonsCount: 22,
    learnersCount: 196,
    price: 0,
    isFree: true,
    bannerTheme: 'blue',
    bannerIcon: 'trending',
    modules: [],
    learners: [],
    liveSessions: [
      {
        id: 'ls-4',
        courseId: 'course-2',
        courseTitle: 'Spreadsheet basics',
        title: 'Office hours',
        dateStr: 'Mon 26 Oct',
        timeRange: '11:00 AM - 12:00 PM',
        timestamp: 'Mon 26 Oct',
        meetUrl: 'https://meet.google.com/ziqx-office-hours',
        status: 'Upcoming',
        bgColor: '#f5f3ff',
        tagColor: '#8b5cf6'
      }
    ]
  },
  {
    id: 'course-3',
    title: 'Data visualization',
    slug: 'data-visualization',
    shortDescription: 'Create clean, high-impact bar charts, line graphs and dashboards that business leaders can easily read.',
    status: 'Published',
    modulesCount: 3,
    lessonsCount: 16,
    learnersCount: 24,
    price: 59.0,
    isFree: false,
    bannerTheme: 'green',
    bannerIcon: 'barChart',
    modules: [],
    learners: [],
    liveSessions: [
      {
        id: 'ls-5',
        courseId: 'course-3',
        courseTitle: 'Data visualization',
        title: 'Data visualization workshop',
        dateStr: 'Thu 22 Oct',
        timeRange: '2:00 - 3:00 PM',
        timestamp: 'Thu 22 Oct',
        meetUrl: 'https://meet.google.com/ziqx-dataviz-ws',
        status: 'Upcoming',
        bgColor: '#f0fdf4',
        tagColor: '#16a34a'
      }
    ]
  },
  {
    id: 'course-4',
    title: 'Reporting for managers',
    slug: 'reporting-for-managers',
    shortDescription: 'Build monthly and quarterly executive KPI summaries with actionable insights.',
    status: 'Published',
    modulesCount: 4,
    lessonsCount: 12,
    learnersCount: 6,
    price: 39.0,
    isFree: false,
    bannerTheme: 'purple',
    bannerIcon: 'book',
    modules: [],
    learners: [],
    liveSessions: []
  },
  {
    id: 'course-5',
    title: 'UI fundamentals',
    slug: 'ui-fundamentals',
    shortDescription: 'Learn grids, typography hierarchies, layout alignment, and design tokens for web and mobile.',
    status: 'Draft',
    modulesCount: 4,
    lessonsCount: 24,
    learnersCount: 0,
    price: 0,
    isFree: true,
    bannerTheme: 'gray',
    bannerIcon: 'layers',
    modules: [],
    learners: [],
    liveSessions: []
  },
  {
    id: 'course-6',
    title: 'Intro to project management',
    slug: 'intro-to-project-management',
    shortDescription: 'Frameworks, sprint planning, client communications, and stakeholder roadmapping.',
    status: 'Archived',
    modulesCount: 5,
    lessonsCount: 28,
    learnersCount: 0,
    price: 45.0,
    isFree: false,
    bannerTheme: 'purple',
    bannerIcon: 'book',
    modules: [],
    learners: [],
    liveSessions: []
  },
  {
    id: 'course-7',
    title: 'Client communication',
    slug: 'client-communication',
    shortDescription: 'Draft clear client scopes, email negotiations, milestone reviews and presentations.',
    status: 'Draft',
    modulesCount: 0,
    lessonsCount: 0,
    learnersCount: 0,
    price: 45.0,
    isFree: false,
    bannerTheme: 'orange',
    bannerIcon: 'messageSquare',
    modules: [],
    learners: [],
    liveSessions: []
  }
];

export const initialLearners: Learner[] = [
  { id: 'lrn-1', name: 'Olive Hart', initials: 'OH', avatarColor: '#f97316', phone: '+1 555 0142', email: 'olive.hart@example.com', enrolledOn: 'Oct 3, 2026', enrolledCourses: ['Data analysis', 'Spreadsheet basics'], coursesSummary: 'Data analysis +1 more' },
  { id: 'lrn-2', name: 'Maria Santos', initials: 'MS', avatarColor: '#0ea5e9', phone: '+1 555 0178', email: 'maria.santos@example.com', enrolledOn: 'Oct 21, 2026', enrolledCourses: ['Data analysis', 'Data visualization'], coursesSummary: 'Data analysis +1 more' },
  { id: 'lrn-3', name: 'Tunde Bello', initials: 'TB', avatarColor: '#10b981', phone: '+1 555 0193', email: 'tunde.bello@example.com', enrolledOn: 'Oct 21, 2026', enrolledCourses: ['Data analysis', 'UI fundamentals'], coursesSummary: 'Data analysis +1 more' },
  { id: 'lrn-4', name: 'Kofi Asante', initials: 'KA', avatarColor: '#8b5cf6', phone: '+1 555 0127', email: 'kofi.asante@example.com', enrolledOn: 'Oct 20, 2026', enrolledCourses: ['Data visualization', 'Spreadsheet basics', 'Data analysis'], coursesSummary: 'Data visualization +2 more' },
  { id: 'lrn-5', name: 'Chloe Martin', initials: 'CM', avatarColor: '#ec4899', phone: '+1 555 0165', email: 'chloe.martin@example.com', enrolledOn: 'Oct 18, 2026', enrolledCourses: ['Reporting for managers', 'Client communication'], coursesSummary: 'Reporting for managers +1 more' },
  { id: 'lrn-6', name: 'Noah Park', initials: 'NP', avatarColor: '#06b6d4', phone: '+1 555 0111', email: 'noah.park@example.com', enrolledOn: 'Oct 19, 2026', enrolledCourses: ['Spreadsheet basics'], coursesSummary: 'Spreadsheet basics' },
  { id: 'lrn-7', name: 'Ibrahim Yusuf', initials: 'IY', avatarColor: '#84cc16', phone: '+1 555 0184', email: 'ibrahim.yusuf@example.com', enrolledOn: 'Sep 28, 2026', enrolledCourses: ['Data visualization'], coursesSummary: 'Data visualization' },
  { id: 'lrn-8', name: 'Grace Lin', initials: 'GL', avatarColor: '#6366f1', phone: '+1 555 0136', email: 'grace.lin@example.com', enrolledOn: 'Sep 24, 2026', enrolledCourses: ['Spreadsheet basics'], coursesSummary: 'Spreadsheet basics' },
  { id: 'lrn-9', name: 'Amit Rao', initials: 'AR', avatarColor: '#f43f5e', phone: '+1 555 0159', email: 'amit.rao@example.com', enrolledOn: 'Sep 22, 2026', enrolledCourses: ['Spreadsheet basics'], coursesSummary: 'Spreadsheet basics' },
  { id: 'lrn-10', name: 'Lena Fischer', initials: 'LF', avatarColor: '#eab308', phone: '+1 555 0102', email: 'lena.fischer@example.com', enrolledOn: 'Jul 20, 2026', enrolledCourses: ['Intro to project management'], coursesSummary: 'Intro to project management' },
  { id: 'lrn-11', name: 'Sofia Alvarez', initials: 'SA', avatarColor: '#14b8a6', phone: '+1 555 0174', email: 'sofia.alvarez@example.com', enrolledOn: 'Jul 8, 2026', enrolledCourses: ['Data analysis', 'Spreadsheet basics'], coursesSummary: 'Data analysis +1 more' },
  { id: 'lrn-12', name: 'Peter Okoye', initials: 'PO', avatarColor: '#a855f7', phone: '+1 555 0149', email: 'peter.okoye@example.com', enrolledOn: 'Jun 30, 2026', enrolledCourses: ['Spreadsheet basics'], coursesSummary: 'Spreadsheet basics' }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'payment_failed',
    title: 'Payment failed',
    description: "Maria Santos's payment for Data analysis didn't go through. No access was granted.",
    timestamp: '12 min ago',
    dateCategory: 'Today',
    isRead: false,
    actionText: 'View learner'
  },
  {
    id: 'notif-2',
    type: 'new_enrolment',
    title: 'New enrolment',
    description: 'Olive Hart completed enrolment in Data analysis.',
    timestamp: '1 h ago',
    dateCategory: 'Today',
    isRead: false,
    actionText: 'View learner'
  },
  {
    id: 'notif-3',
    type: 'live_session',
    title: 'Live session today',
    description: 'Data analysis: Q&A starts today at 10:00 AM.',
    timestamp: '3 h ago',
    dateCategory: 'Today',
    isRead: false,
    actionText: 'Open session'
  },
  {
    id: 'notif-4',
    type: 'course_completed',
    title: 'Course completed',
    description: 'Olive Hart completed Cleaning messy data module.',
    timestamp: 'Yesterday, 4:20 PM',
    dateCategory: 'Yesterday',
    isRead: true,
    actionText: 'View learner'
  },
  {
    id: 'notif-5',
    type: 'new_enrolment',
    title: 'New enrolment',
    description: 'Maria Santos enrolled in Data visualization.',
    timestamp: 'Yesterday, 11:05 AM',
    dateCategory: 'Yesterday',
    isRead: true,
    actionText: 'View learner'
  },
  {
    id: 'notif-6',
    type: 'payment_received',
    title: 'Payment received',
    description: 'Kofi Asante paid $59.00 for Spreadsheet basics.',
    timestamp: 'Mon 19 Oct',
    dateCategory: 'Earlier',
    isRead: true,
    actionText: 'View learner'
  }
];

export const initialPortalConfig: LearnerPortalConfig = {
  hero: {
    eyebrow: 'Live cohorts · Self-paced lessons',
    headline: 'Learn data skills that get you hired',
    supportingText: 'Practical courses led by working analysts, with live Q&A sessions and projects you can show to employers.',
    primaryButtonText: 'Browse courses',
    secondaryButtonText: 'Meet your mentor',
    bannerImage: ''
  },
  mentor: {
    sectionHeading: 'Your mentor',
    mentorName: 'Daniel Mensah',
    role: 'Senior data analyst',
    bio: 'Daniel has trained more than 1,200 learners in data analysis. He teaches with real datasets, weekly live sessions and honest feedback on every project.',
    highlight1: '10 yrs experience',
    highlight2: '1,200+ learners',
    photo: ''
  },
  courses: {
    sectionHeading: 'Popular courses',
    subheading: 'Start with a course that fits where you are today.',
    featuredCourseIds: ['course-1', 'course-2', 'course-3']
  },
  testimonials: {
    sectionHeading: 'What learners say',
    items: [
      {
        id: 't-1',
        quote: 'The live sessions made the difference. I got my first analyst role three months after finishing.',
        learner: 'Maria Santos',
        course: 'Data analysis'
      },
      {
        id: 't-2',
        quote: 'Clear lessons and quick feedback on projects. I now build dashboards for my whole team.',
        learner: 'Tunde Bello',
        course: 'Data visualization'
      },
      {
        id: 't-3',
        quote: 'I started with zero experience. The pace was easy to follow and the mentor answered every question.',
        learner: 'Amina Yusuf',
        course: 'SQL fundamentals'
      }
    ]
  },
  footer: {
    orgName: 'Ziqx Skills',
    tagline: 'Practical learning for working people.',
    contactEmail: 'hello@ziqxskills.example',
    socialHandle: '@ziqxskills',
    copyrightLine: '© 2026 Ziqx Skills. All rights reserved.'
  },
  design: {
    accentColor: '#3b40b8',
    headingStyle: 'sans',
    cornerRadius: 16
  }
};

export const initialSettings: OrganizationSettings = {
  name: 'Daniel Mensah',
  organization: 'Ziqx Skills Academy',
  supportEmail: 'support@example.com',
  timeZone: 'GMT+1 · West Africa',
  customDomain: 'learn.yourdomain.com',
  isDomainVerified: false,
  siteTitle: 'Ziqx Skills Academy',
  metaDescription: 'Practical data courses with live mentor sessions. Learn at your pace and build projects employers notice.',
  indexSearchEngines: true,
  emailEnrollmentConfirmation: true,
  emailSessionReminders: true,
  emailSessionChanges: true,
  emailWeeklySummary: false,
  googleMeetConnected: true,
  zoomConnected: false,
  paymentGatewayConnected: true,
};
