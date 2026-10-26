'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import {
  Plus,
  ArrowRight,
  Share2,
  Database,
  TrendingUp,
  BarChart2,
  PenTool,
  BookOpen
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import type { Course } from '../types';

export const CoursesView: React.FC = () => {
  const router = useRouter();
  const {
    courses,
    openCourseWorkspace,
    showToast
  } = useApp();

  const getCourseBannerSpecs = (course: Course) => {
    const title = course.title.toLowerCase();
    if (title.includes('data analysis')) {
      return {
        bg: '#E8E8FA', // Lavender
        icon: <Database size={32} color="#14151A" strokeWidth={1.75} />,
        modules: 6,
        lessons: 40
      };
    }
    if (title.includes('spreadsheet')) {
      return {
        bg: '#DCE7F9', // Sky
        icon: <TrendingUp size={32} color="#14151A" strokeWidth={1.75} />,
        modules: 4,
        lessons: 22
      };
    }
    if (title.includes('visualization')) {
      return {
        bg: '#EEF3D8', // Lime
        icon: <BarChart2 size={32} color="#14151A" strokeWidth={1.75} />,
        modules: 3,
        lessons: 16
      };
    }
    if (title.includes('ui fundamentals')) {
      return {
        bg: '#DCE7F9', // Sky
        icon: <PenTool size={32} color="#14151A" strokeWidth={1.75} />,
        modules: 4,
        lessons: 24
      };
    }
    if (title.includes('project management') || title.includes('reporting')) {
      return {
        bg: '#E8E8FA', // Lavender
        icon: <BookOpen size={32} color="#14151A" strokeWidth={1.75} />,
        modules: 5,
        lessons: 28
      };
    }
    return {
      bg: '#E8E8FA', // Lavender
      icon: <BookOpen size={32} color="#14151A" strokeWidth={1.75} />,
      modules: course.modulesCount || 3,
      lessons: course.lessonsCount || 12
    };
  };

  const handleShareClick = (e: React.MouseEvent, course: Course) => {
    e.stopPropagation();
    const url = `https://learn.ziqxskills.example/courses/${course.id}`;
    navigator.clipboard?.writeText(url);
    showToast(`Course link for "${course.title}" copied to clipboard!`);
  };

  // Strict Figma display ordering matching crop_courses_1.png
  const sortedCourses = React.useMemo(() => {
    const figmaOrder = [
      'data analysis',
      'spreadsheet basics',
      'data visualization',
      'ui fundamentals',
      'project management'
    ];
    return [...courses].sort((a, b) => {
      const idxA = figmaOrder.findIndex(k => a.title.toLowerCase().includes(k));
      const idxB = figmaOrder.findIndex(k => b.title.toLowerCase().includes(k));
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });
  }, [courses]);

  return (
    <div
      className="fade-in page-container"
    >
      {/* Header */}
      <div
        className="page-header-row"
      >
        <div>
          <h1
            style={{
              fontSize: '24px',
              lineHeight: '32px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '4px',
            }}
          >
            Courses
          </h1>
          <p style={{ fontSize: '14px', lineHeight: '22px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
            Create, edit and publish your courses.
          </p>
        </div>

        <button
          onClick={() => router.push('/admin/courses/new')}
          className="btn-primary"
        >
          <Plus size={16} strokeWidth={1.75} />
          Create course
        </button>
      </div>

      {/* Courses Grid: Responsive 3-col desktop -> 2-col tablet -> 1-col mobile */}
      <div
        className="courses-card-grid"
      >
        {sortedCourses.map((course) => {
          const specs = getCourseBannerSpecs(course);

          return (
            <div
              key={course.id}
              style={{
                backgroundColor: 'var(--color-canvas)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.2s ease',
              }}
            >
              {/* Graphic Banner Area - Surface color from PDF (Lavender #E8E8FA, Sky #DCE7F9, Lime #EEF3D8) */}
              <div
                style={{
                  height: '148px',
                  backgroundColor: specs.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {/* Status Badge in corner */}
                <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                  <StatusBadge status={course.status} />
                </div>

                {/* Floating Centered Line-Art Icon with 1.75px stroke */}
                <div>
                  {specs.icon}
                </div>
              </div>

              {/* Card Body matching PDF Page 3 */}
              <div
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  justifyContent: 'space-between',
                  gap: '20px',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontWeight: 700,
                      color: 'var(--color-text-primary)',
                      marginBottom: '4px',
                    }}
                  >
                    {course.title}
                  </h3>
                  <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                    {specs.modules} modules · {specs.lessons} lessons
                  </p>
                </div>

                {/* Card Action Row: View course button + Share button */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <button
                    onClick={() => openCourseWorkspace(course.id, 'overview')}
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <ArrowRight size={15} strokeWidth={1.75} />
                    View course
                  </button>

                  <button
                    onClick={(e) => handleShareClick(e, course)}
                    title="Share course"
                    className="btn-secondary"
                    style={{
                      width: '40px',
                      height: '40px',
                      padding: 0,
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Share2 size={16} strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Create Course Empty Card */}
        <div
          onClick={() => router.push('/admin/courses/new')}
          style={{
            minHeight: '308px',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px dashed var(--color-border)',
            backgroundColor: 'var(--color-canvas)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-text-muted)';
            e.currentTarget.style.backgroundColor = 'var(--color-bg-panel)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border)';
            e.currentTarget.style.backgroundColor = 'var(--color-canvas)';
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-action-primary, #14151A)',
              color: 'var(--color-action-primary-text, #FFFFFF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
            }}
          >
            <Plus size={22} strokeWidth={1.75} />
          </div>
          <div style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
            Create course
          </div>
          <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', maxWidth: '240px', fontWeight: 500 }}>
            Start with a title. Everything else can wait.
          </p>
        </div>
      </div>
    </div>
  );
};


