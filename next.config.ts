import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/admin/overview',
        permanent: false,
      },
      {
        source: '/admin',
        destination: '/admin/overview',
        permanent: false,
      },
      {
        source: '/admin/courses/create',
        destination: '/admin/courses/new',
        permanent: true,
      },
      {
        source: '/admin/course-workspace',
        destination: '/admin/courses',
        permanent: false,
      },
      {
        source: '/admin/add-lesson',
        destination: '/admin/courses/add-lesson',
        permanent: true,
      },
      {
        source: '/admin/add-quiz',
        destination: '/admin/courses/add-quiz',
        permanent: true,
      },
      // Backward compatibility redirects from root paths
      {
        source: '/overview',
        destination: '/admin/overview',
        permanent: true,
      },
      {
        source: '/courses',
        destination: '/admin/courses',
        permanent: true,
      },
      {
        source: '/courses/new',
        destination: '/admin/courses/new',
        permanent: true,
      },
      {
        source: '/courses/:courseId',
        destination: '/admin/courses/:courseId',
        permanent: true,
      },
      {
        source: '/learners',
        destination: '/admin/learners',
        permanent: true,
      },
      {
        source: '/learner-portal',
        destination: '/admin/learner-portal',
        permanent: true,
      },
      {
        source: '/settings',
        destination: '/admin/settings',
        permanent: true,
      },
      {
        source: '/notifications',
        destination: '/admin/notifications',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
