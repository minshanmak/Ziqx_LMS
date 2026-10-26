'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import {
  Plus,
  BookOpenCheck,
  BookOpen,
  Users,
  Clock,
  Wallet,
  ChevronRight,
  Video,
  TrendingUp,
  Database,
  BarChart2,
  FileText,
  PenTool,
  MessageSquare
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import type { Course } from '../types';

export const OverviewView: React.FC = () => {
  const router = useRouter();
  const {
    courses,
    setActiveTab,
    openCourseWorkspace,
    showToast
  } = useApp();

  // Strict Figma visual mapping for Course Performance rows
  const getCourseVisual = (courseTitle: string) => {
    const title = courseTitle.toLowerCase();
    if (title.includes('spreadsheet')) {
      return {
        bg: '#DCE7F9', // Sky
        icon: <TrendingUp size={20} color="#14151A" strokeWidth={1.75} />,
        lessons: 22,
        priceText: 'Free',
        status: 'Published' as const,
        learners: 196
      };
    }
    if (title.includes('analysis')) {
      return {
        bg: '#E8E8FA', // Lavender
        icon: <Database size={20} color="#14151A" strokeWidth={1.75} />,
        lessons: 40,
        priceText: '$79.00',
        status: 'Published' as const,
        learners: 86
      };
    }
    if (title.includes('visualization')) {
      return {
        bg: '#EEF3D8', // Lime
        icon: <BarChart2 size={20} color="#14151A" strokeWidth={1.75} />,
        lessons: 16,
        priceText: '$59.00',
        status: 'Published' as const,
        learners: 24
      };
    }
    if (title.includes('reporting')) {
      return {
        bg: '#E8E8FA', // Lavender
        icon: <FileText size={20} color="#14151A" strokeWidth={1.75} />,
        lessons: 12,
        priceText: '$39.00',
        status: 'Published' as const,
        learners: 6
      };
    }
    if (title.includes('ui')) {
      return {
        bg: '#DCE7F9', // Sky
        icon: <PenTool size={20} color="#14151A" strokeWidth={1.75} />,
        lessons: 24,
        priceText: 'Free',
        status: 'Draft' as const,
        learners: 0
      };
    }
    if (title.includes('communication') || title.includes('client')) {
      return {
        bg: '#EEF3D8', // Lime
        icon: <MessageSquare size={20} color="#14151A" strokeWidth={1.75} />,
        lessons: 0,
        priceText: '$45.00',
        status: 'Draft' as const,
        learners: 0
      };
    }
    return {
      bg: '#F4F4F7',
      icon: <BookOpen size={20} color="#14151A" strokeWidth={1.75} />,
      lessons: 10,
      priceText: 'Free',
      status: 'Published' as const,
      learners: 0
    };
  };

  // Strictly order the courses to match Figma reference (crop_overview_1.png)
  const sortedOverviewCourses = useMemo(() => {
    const figmaOrder = [
      'spreadsheet basics',
      'data analysis',
      'data visualization',
      'reporting for managers',
      'ui fundamentals',
      'client communication'
    ];

    const copy = [...courses];
    return copy
      .filter(c => c.status !== 'Archived')
      .sort((a, b) => {
        const indexA = figmaOrder.findIndex(key => a.title.toLowerCase().includes(key));
        const indexB = figmaOrder.findIndex(key => b.title.toLowerCase().includes(key));
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return 0;
      })
      .slice(0, 6);
  }, [courses]);

  return (
    <div
      className="fade-in page-container"
    >
      {/* Top Header */}
      <div
        className="page-header-row"
      >
        <div>
          <h1
            style={{
              fontSize: '24px',
              lineHeight: '32px',
              fontWeight: 700,
              color: '#14151A',
              letterSpacing: '-0.02em',
              marginBottom: '4px',
            }}
          >
            Good morning, Daniel
          </h1>
          <p
            style={{
              fontSize: '14px',
              lineHeight: '22px',
              fontWeight: 500,
              color: '#5B5E69'
            }}
          >
            Here&apos;s how your courses are doing today.
          </p>
        </div>

        {/* Primary Action Button - 12px rounded rectangle as per Design System & Figma */}
        <button
          onClick={() => router.push('/admin/courses/new')}
          style={{
            height: '44px',
            padding: '0 18px',
            backgroundColor: '#14151A',
            color: '#FFFFFF',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 700,
            borderRadius: '12px',
            border: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2A2D36')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#14151A')}
        >
          <Plus size={16} strokeWidth={1.75} />
          Create course
        </button>
      </div>

      {/* Stats Summary Deck - Strictly single #F6F6F8 container without inner dividers, 20px radius */}
      <div
        className="stats-grid-4"
        style={{
          backgroundColor: '#F6F6F8',
          borderRadius: '20px',
          padding: '24px 32px',
          marginBottom: '40px',
        }}
      >
        {/* Stat 1: Published courses (BookCheck symbol from PDF Page 4) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ color: '#14151A', display: 'flex', alignItems: 'center' }}>
            <BookOpenCheck size={20} strokeWidth={1.75} />
          </div>
          <div>
            <div style={{ fontSize: '28px', lineHeight: '32px', fontWeight: 700, color: '#14151A', letterSpacing: '-0.02em' }}>
              4
            </div>
            <div style={{ fontSize: '13px', lineHeight: '18px', color: '#5B5E69', marginTop: '4px', fontWeight: 500 }}>
              Published courses
            </div>
          </div>
        </div>

        {/* Stat 2: Total learners (284 strictly from Figma) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ color: '#14151A', display: 'flex', alignItems: 'center' }}>
            <Users size={20} strokeWidth={1.75} />
          </div>
          <div>
            <div style={{ fontSize: '28px', lineHeight: '32px', fontWeight: 700, color: '#14151A', letterSpacing: '-0.02em' }}>
              284
            </div>
            <div style={{ fontSize: '13px', lineHeight: '18px', color: '#5B5E69', marginTop: '4px', fontWeight: 500 }}>
              Total learners
            </div>
          </div>
        </div>

        {/* Stat 3: Total hours of content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ color: '#14151A', display: 'flex', alignItems: 'center' }}>
            <Clock size={20} strokeWidth={1.75} />
          </div>
          <div>
            <div style={{ fontSize: '28px', lineHeight: '32px', fontWeight: 700, color: '#14151A', letterSpacing: '-0.02em' }}>
              36 hrs
            </div>
            <div style={{ fontSize: '13px', lineHeight: '18px', color: '#5B5E69', marginTop: '4px', fontWeight: 500 }}>
              Total hours of content
            </div>
          </div>
        </div>

        {/* Stat 4: Course revenue, all time */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ color: '#14151A', display: 'flex', alignItems: 'center' }}>
            <Wallet size={20} strokeWidth={1.75} />
          </div>
          <div>
            <div style={{ fontSize: '28px', lineHeight: '32px', fontWeight: 700, color: '#14151A', letterSpacing: '-0.02em' }}>
              $10,096
            </div>
            <div style={{ fontSize: '13px', lineHeight: '18px', color: '#5B5E69', marginTop: '4px', fontWeight: 500 }}>
              Course revenue, all time
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Course Performance Table + Upcoming Live Sessions */}
      <div
        className="overview-main-grid"
      >
        {/* Left Column: Course Performance */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <h2 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 700, color: '#14151A', letterSpacing: '-0.01em' }}>
              Course performance
            </h2>
            <button
              onClick={() => setActiveTab('courses')}
              style={{
                fontSize: '13px',
                lineHeight: '18px',
                fontWeight: 700,
                color: '#3B40B8',
                cursor: 'pointer',
                border: 'none',
                background: 'none',
                padding: 0,
              }}
            >
              View all courses
            </button>
          </div>

          <div>
            <div>
              {/* Table Header */}
          <div
            className="overview-table-header"
          >
            <div>Course</div>
            <div className="overview-status-col">Status</div>
            <div style={{ textAlign: 'right' }}>Learners</div>
            <div></div>
          </div>

          {/* Table Rows - strictly 65px height matching Figma */}
          <div>
            {sortedOverviewCourses.map((course: Course) => {
              const visual = getCourseVisual(course.title);
              const displayStatus = visual.status || course.status;
              const displayLessons = visual.lessons;
              const displayPrice = visual.priceText;
              const displayLearners = visual.learners;

              return (
                <div
                  key={course.id}
                  onClick={() => openCourseWorkspace(course.id, 'overview')}
                  className="overview-table-row"
                >
                  {/* Course Icon Box & Details */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0, paddingRight: '12px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: visual.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {visual.icon}
                    </div>

                    <div style={{ minWidth: 0, overflow: 'hidden' }}>
                      <div
                        style={{
                          fontSize: '14px',
                          lineHeight: '20px',
                          fontWeight: 700,
                          color: '#14151A',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                        }}
                      >
                        {course.title}
                      </div>
                      <div style={{ fontSize: '13px', lineHeight: '18px', color: '#5B5E69', marginTop: '2px', fontWeight: 500 }}>
                        {displayLessons} lessons · {displayPrice}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="overview-status-col">
                    <StatusBadge status={displayStatus} />
                  </div>

                  {/* Learners Count (right-aligned to column) */}
                  <div style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: '#14151A', fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>
                    {displayLearners}
                  </div>

                  {/* Chevron Icon */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', color: '#70737E' }}>
                    <ChevronRight size={16} strokeWidth={1.75} />
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Upcoming Live Sessions */}
        <div>
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 700, color: '#14151A', letterSpacing: '-0.01em' }}>
              Upcoming live sessions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Card 1: Data analysis: Q&A - Pastel Sky #DCE7F9 */}
            <div
              style={{
                backgroundColor: '#DCE7F9',
                borderRadius: '20px',
                padding: '20px 24px',
                height: '132px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: '#14151A', marginBottom: '2px' }}>
                  Data analysis: Q&A
                </h3>
                <div style={{ fontSize: '13px', lineHeight: '18px', color: '#5B5E69', fontWeight: 500 }}>
                  Today · 10:00 – 11:00 AM
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                  onClick={() => openCourseWorkspace('course-1', 'overview')}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#14151A', cursor: 'pointer' }}
                >
                  <BookOpen size={14} color="#14151A" strokeWidth={1.75} />
                  <span>Data analysis</span>
                </div>

                {/* Start Button - 10px rounded rectangle as per Figma */}
                <button
                  onClick={() => showToast('Starting live session video room...')}
                  style={{
                    height: '32px',
                    padding: '0 14px',
                    borderRadius: '10px',
                    backgroundColor: '#14151A',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    lineHeight: '18px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2A2D36')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#14151A')}
                >
                  <Video size={13} strokeWidth={1.75} />
                  Start
                </button>
              </div>
            </div>

            {/* Card 2: Data visualization workshop - Pastel Lime #EEF3D8 */}
            <div
              style={{
                backgroundColor: '#EEF3D8',
                borderRadius: '20px',
                padding: '20px 24px',
                height: '132px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: '#14151A', marginBottom: '2px' }}>
                  Data visualization workshop
                </h3>
                <div style={{ fontSize: '13px', lineHeight: '18px', color: '#5B5E69', fontWeight: 500 }}>
                  Thu 22 Oct · 2:00 – 3:00 PM
                </div>
              </div>

              <div
                onClick={() => openCourseWorkspace('course-3', 'overview')}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#14151A', cursor: 'pointer' }}
              >
                <BookOpen size={14} color="#14151A" strokeWidth={1.75} />
                <span>Data visualization</span>
              </div>
            </div>

            {/* Card 3: Office hours - Pastel Lavender #E8E8FA */}
            <div
              style={{
                backgroundColor: '#E8E8FA',
                borderRadius: '20px',
                padding: '20px 24px',
                height: '132px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: '#14151A', marginBottom: '2px' }}>
                  Office hours
                </h3>
                <div style={{ fontSize: '13px', lineHeight: '18px', color: '#5B5E69', fontWeight: 500 }}>
                  Mon 26 Oct · 11:00 AM – 12:00 PM
                </div>
              </div>

              <div
                onClick={() => openCourseWorkspace('course-2', 'overview')}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#14151A', cursor: 'pointer' }}
              >
                <BookOpen size={14} color="#14151A" strokeWidth={1.75} />
                <span>Spreadsheet basics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
