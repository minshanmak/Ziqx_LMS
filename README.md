# Ziqx Skills — Admin Dashboard & Course Studio

Modern Learning Management System (LMS) and Course Studio built with **Next.js 16 (App Router)**, **React 19**, and **TypeScript**.

## Features

- **Admin Dashboard**: Overview KPIs, course performance analytics, and quick actions.
- **Course Studio**: Course workspace, curriculum editor, module and lesson manager, quiz creator, and live course preview modal.
- **Learner Portal**: Interactive student view with real-time responsive desktop/mobile previews.
- **Learners & Enrollments**: Roster table with search, status filters, progress tracking, and batch export.
- **Organization Settings & Notifications**: Complete control over branding, notifications, and profile details.
- **Design System**: Strict vanilla CSS token-driven design system with Manrope typography, crisp icons, and micro-animations.

## Project Structure

```
├── public/                 # Static assets (fonts, icons, favicons)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── admin/          # Admin nested routes & shell layout
│   │   │   ├── overview/   # Overview KPI dashboard
│   │   │   ├── courses/    # Courses catalog, workspace, new course, quiz/lesson builders
│   │   │   ├── learners/   # Learner directory
│   │   │   ├── learner-portal/ # Student portal
│   │   │   ├── settings/   # Organization settings
│   │   │   ├── notifications/ # Notification center
│   │   │   └── layout.tsx  # Admin shell layout (Sidebar, Mobile TopBar & Nav, Modals)
│   │   ├── layout.tsx      # Root layout & providers
│   │   └── page.tsx        # Root redirect
│   ├── components/         # Shared UI components & modals
│   ├── context/            # React state context (AppContext)
│   ├── data/               # Mock data & initial states
│   ├── types/              # TypeScript interfaces
│   ├── views/              # Page view components
│   └── index.css           # Global design system & theme tokens
├── next.config.ts          # Next.js configuration & legacy URL redirects
└── tsconfig.json           # TypeScript configuration with @/* path aliases
```

## Getting Started

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```
