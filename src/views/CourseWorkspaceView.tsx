import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ChevronRight,
  Eye,
  Database,
  Plus,
  Calendar,
  Trash2,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  HelpCircle,
  GripVertical,
  Video,
  Upload,
  Pencil,
  Layers,
  Users,
  Wallet
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import type { CourseWorkspaceTab } from '../types';

export const CourseWorkspaceView: React.FC = () => {
  const {
    selectedCourse,
    setActiveTab,
    workspaceTab,
    setWorkspaceTab,
    setIsAddModuleOpen,
    setIsCoursePreviewOpen,
    deleteModule,
    deleteLesson,
    updateCourseDetails,
    showToast
  } = useApp();

  const [openModuleId, setOpenModuleId] = useState<string>('mod-2');
  
  // Settings tab local state
  const [courseTitle, setCourseTitle] = useState(selectedCourse?.title || '');
  const [courseDesc, setCourseDesc] = useState(selectedCourse?.shortDescription || '');
  const [isPaid, setIsPaid] = useState(!selectedCourse?.isFree);
  const [price, setPrice] = useState(selectedCourse?.price.toString() || '59.00');
  const [origPrice, setOrigPrice] = useState(selectedCourse?.originalPrice?.toString() || '79.00');

  if (!selectedCourse) {
    return (
      <div style={{ padding: '48px', textAlign: 'center', backgroundColor: 'var(--color-canvas)' }}>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: '22px' }}>No course selected.</p>
        <button onClick={() => setActiveTab('courses')} className="btn-primary" style={{ marginTop: '16px' }}>
          Back to courses
        </button>
      </div>
    );
  }

  const toggleModuleAccordion = (id: string) => {
    setOpenModuleId(prev => (prev === id ? '' : id));
  };

  const handleSaveSettings = () => {
    updateCourseDetails(selectedCourse.id, {
      title: courseTitle,
      shortDescription: courseDesc,
      isFree: !isPaid,
      price: parseFloat(price) || 0,
      originalPrice: parseFloat(origPrice) || undefined,
    });
    showToast('Course settings saved successfully!');
  };

  return (
    <div
      className="fade-in page-container"
    >
      {/* Breadcrumb Navigation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '13px',
          lineHeight: '18px',
          color: 'var(--color-text-secondary)',
          marginBottom: '20px',
        }}
      >
        <button
          onClick={() => setActiveTab('courses')}
          style={{
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            fontWeight: 500,
            border: 'none',
            background: 'none',
            padding: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
        >
          Courses
        </button>
        <ChevronRight size={14} color="var(--color-text-muted)" strokeWidth={1.75} />
        <span style={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>{selectedCourse.title}</span>
      </div>

      {/* Course Title Header Bar */}
      <div
        className="page-header-row"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Surface Lavender icon container */}
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-surface-lavender)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-primary)',
              flexShrink: 0,
            }}
          >
            <Database size={28} strokeWidth={1.75} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
                {selectedCourse.title}
              </h1>
              <StatusBadge status={selectedCourse.status} />
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsCoursePreviewOpen(true)}
          className="btn-secondary"
        >
          <Eye size={16} strokeWidth={1.75} />
          Preview
        </button>
      </div>

      {/* Workspace Underline Tabs Navigation matching PDF Page 2 */}
      <div
        className="tabs-scroll-container"
        style={{
          marginBottom: '32px',
        }}
      >
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'modules', label: 'Modules & Lessons' },
          { id: 'learners', label: 'Learners' },
          { id: 'sessions', label: 'Live Sessions' },
          { id: 'settings', label: 'Settings' },
        ].map((tab) => {
          const isActive = workspaceTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setWorkspaceTab(tab.id as CourseWorkspaceTab)}
              style={{
                padding: '10px 0 14px',
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                borderBottom: isActive ? '2px solid var(--color-text-primary)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                background: 'none',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {workspaceTab === 'overview' && (
        <div className="course-workspace-grid">
          {/* Main Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Course Summary Box */}
            <div
              style={{
                backgroundColor: 'var(--color-canvas)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                padding: '28px',
              }}
            >
              <h3 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                Course summary
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '22px', color: 'var(--color-text-body)', fontWeight: 500 }}>
                {selectedCourse.shortDescription}
              </p>
            </div>

            {/* Stat Deck: Single #f6f6f8 box without borders, 20px radius */}
            <div
              className="stats-grid-4"
              style={{
                backgroundColor: 'var(--color-bg-muted)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px 36px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center' }}>
                  <Layers size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <div style={{ fontSize: '28px', lineHeight: '32px', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
                    6
                  </div>
                  <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', marginTop: '4px', fontWeight: 500 }}>
                    Modules
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center' }}>
                  <PlayCircle size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <div style={{ fontSize: '28px', lineHeight: '32px', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
                    40
                  </div>
                  <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', marginTop: '4px', fontWeight: 500 }}>
                    Lessons
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center' }}>
                  <Users size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <div style={{ fontSize: '28px', lineHeight: '32px', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
                    86
                  </div>
                  <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', marginTop: '4px', fontWeight: 500 }}>
                    Enrolled learners
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center' }}>
                  <Wallet size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <div style={{ fontSize: '28px', lineHeight: '32px', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
                    $59.00
                  </div>
                  <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', marginTop: '4px', fontWeight: 500 }}>
                    Course fee · was $79.00
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Summary Card */}
            <div
              style={{
                backgroundColor: 'var(--color-canvas)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                padding: '28px',
              }}
            >
              <h3 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '18px' }}>
                Progress summary
              </h3>

              {/* Multi-segment Progress Bar: Completed (#14151A), In progress (#BFD4F2), Not started (#EDEDF0) */}
              <div
                style={{
                  height: '12px',
                  width: '100%',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-bg-disabled)',
                  display: 'flex',
                  overflow: 'hidden',
                  marginBottom: '18px',
                }}
              >
                <div style={{ width: '16%', backgroundColor: 'var(--color-action-primary)' }} title="Completed: 14" />
                <div style={{ width: '55%', backgroundColor: 'var(--color-avatar-blue)' }} title="In progress: 47" />
                <div style={{ width: '29%', backgroundColor: 'var(--color-bg-disabled)' }} title="Not started: 25" />
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '13px', lineHeight: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: 'var(--color-action-primary)' }} />
                  <span style={{ color: 'var(--color-text-secondary)' }}>Completed</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums' }}>14</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: 'var(--color-avatar-blue)' }} />
                  <span style={{ color: 'var(--color-text-secondary)' }}>In progress</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums' }}>47</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: 'var(--color-bg-disabled)' }} />
                  <span style={{ color: 'var(--color-text-secondary)' }}>Not started</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums' }}>25</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Actions & Upcoming Live Session */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Quick Actions Card */}
            <div
              style={{
                backgroundColor: 'var(--color-canvas)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                padding: '24px',
              }}
            >
              <h4 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '16px' }}>
                Quick actions
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={() => setIsAddModuleOpen(true)}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Plus size={16} strokeWidth={1.75} />
                  Add module
                </button>

                <button
                  onClick={() => setWorkspaceTab('sessions')}
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Calendar size={16} strokeWidth={1.75} />
                  Schedule live session
                </button>
              </div>
            </div>

            {/* Upcoming Live Session Card - Surface Sky #DCE7F9 */}
            <div
              style={{
                backgroundColor: 'var(--color-surface-sky)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ fontSize: '13px', lineHeight: '18px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                Upcoming live session
              </div>
              <h4 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Data analysis: Q&A
              </h4>
              <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-body)', marginBottom: '12px', fontWeight: 500 }}>
                Today · 10:00 – 11:00 AM (GMT+1)
              </div>
              <button
                onClick={() => setWorkspaceTab('sessions')}
                style={{
                  fontSize: '13px',
                  lineHeight: '18px',
                  fontWeight: 700,
                  color: 'var(--color-link)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  alignSelf: 'flex-start',
                }}
              >
                View sessions →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MODULES & LESSONS */}
      {workspaceTab === 'modules' && (
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
            }}
          >
            <div>
              <h2 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>
                Modules and lessons
              </h2>
              <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', marginTop: '2px', fontWeight: 500 }}>
                6 modules · 40 lessons
              </p>
            </div>

            <button
              onClick={() => setIsAddModuleOpen(true)}
              className="btn-primary"
            >
              <Plus size={16} strokeWidth={1.75} />
              Add module
            </button>
          </div>

          {/* Modules Accordion Container */}
          <div
            style={{
              backgroundColor: 'var(--color-canvas)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              overflow: 'hidden',
            }}
          >
            {/* Module 1: Getting started (Collapsed) */}
            <div
              style={{
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--color-divider)',
                transition: 'background-color 0.15s ease',
              }}
            >
              <div
                onClick={() => toggleModuleAccordion('mod-1')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  cursor: 'pointer',
                  flexGrow: 1,
                }}
              >
                <GripVertical size={18} color="var(--color-text-muted)" strokeWidth={1.75} />
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '13px',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  1
                </div>
                <div>
                  <div style={{ fontSize: '15px', lineHeight: '22px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Getting started
                  </div>
                  <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', marginTop: '2px', fontWeight: 500 }}>
                    5 lessons
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <StatusBadge status="Published" />

                <button
                  onClick={() => toggleModuleAccordion('mod-1')}
                  style={{ color: 'var(--color-text-secondary)', cursor: 'pointer', border: 'none', background: 'none', padding: '4px' }}
                >
                  {openModuleId === 'mod-1' ? <ChevronUp size={18} strokeWidth={1.75} /> : <ChevronDown size={18} strokeWidth={1.75} />}
                </button>

                <button
                  onClick={() => showToast('Edit module: Getting started')}
                  style={{ color: 'var(--color-text-secondary)', cursor: 'pointer', border: 'none', background: 'none', padding: '4px' }}
                  title="Edit module"
                >
                  <Pencil size={16} strokeWidth={1.75} />
                </button>

                <button
                  onClick={() => deleteModule(selectedCourse.id, 'mod-1')}
                  style={{ color: 'var(--color-border-danger)', cursor: 'pointer', border: 'none', background: 'none', padding: '4px' }}
                  title="Delete module"
                >
                  <Trash2 size={16} strokeWidth={1.75} />
                </button>
              </div>
            </div>

            {/* Module 2: Cleaning messy data (Expanded) */}
            <div style={{ borderBottom: '1px solid var(--color-divider)' }}>
              {/* Header */}
              <div
                style={{
                  padding: '18px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--color-canvas)',
                }}
              >
                <div
                  onClick={() => toggleModuleAccordion('mod-2')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    cursor: 'pointer',
                    flexGrow: 1,
                  }}
                >
                  <GripVertical size={18} color="var(--color-text-muted)" strokeWidth={1.75} />
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '13px',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    2
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', lineHeight: '22px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      Cleaning messy data
                    </div>
                    <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', marginTop: '2px', fontWeight: 500 }}>
                      8 lessons
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <StatusBadge status="Published" />

                  <button
                    onClick={() => toggleModuleAccordion('mod-2')}
                    style={{ color: 'var(--color-text-secondary)', cursor: 'pointer', border: 'none', background: 'none', padding: '4px' }}
                  >
                    {openModuleId === 'mod-2' ? <ChevronUp size={18} strokeWidth={1.75} /> : <ChevronDown size={18} strokeWidth={1.75} />}
                  </button>

                  <button
                    onClick={() => showToast('Edit module: Cleaning messy data')}
                    style={{ color: 'var(--color-text-secondary)', cursor: 'pointer', border: 'none', background: 'none', padding: '4px' }}
                    title="Edit module"
                  >
                    <Pencil size={16} strokeWidth={1.75} />
                  </button>

                  <button
                    onClick={() => showToast('Delete module: Cleaning messy data')}
                    style={{ color: 'var(--color-border-danger)', cursor: 'pointer', border: 'none', background: 'none', padding: '4px' }}
                    title="Delete module"
                  >
                    <Trash2 size={16} strokeWidth={1.75} />
                  </button>
                </div>
              </div>

              {/* Expanded Lessons */}
              {openModuleId === 'mod-2' && (
                <div style={{ borderTop: '1px solid var(--color-divider)', padding: '6px 0 16px' }}>
                  {[
                    { id: 'les-1', title: 'Spotting bad data', desc: 'Find duplicates, blanks and mismatched formats.', duration: '9 min' },
                    { id: 'les-2', title: 'Removing duplicates', desc: 'Detect repeated rows and keep one clean record.', duration: '14 min' },
                    { id: 'les-3', title: 'Fixing dates and text', desc: 'Convert text dates and keep one consistent format.', duration: '10 min' },
                    { id: 'les-4', title: 'Handling blanks', desc: 'Decide when to fill, flag or remove empty cells.', duration: '6 min' },
                    { id: 'les-5', title: 'Cleaning checklist', desc: 'A repeatable checklist to review any dataset.', duration: '11 min' },
                  ].map((lesson) => (
                    <div
                      key={lesson.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 24px 12px 52px',
                        transition: 'background-color 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bg-panel)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                        <GripVertical size={16} color="var(--color-text-muted)" strokeWidth={1.75} />
                        <PlayCircle size={18} color="var(--color-text-secondary)" strokeWidth={1.75} />
                        <div>
                          <div style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                            {lesson.title}
                          </div>
                          <div style={{ fontSize: '12px', lineHeight: '18px', color: 'var(--color-text-secondary)', marginTop: '2px', fontWeight: 500 }}>
                            {lesson.desc}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                          {lesson.duration}
                        </span>

                        <button
                          onClick={() => setActiveTab('add-lesson')}
                          style={{ color: 'var(--color-text-secondary)', cursor: 'pointer', border: 'none', background: 'none', padding: '4px' }}
                          title="Edit lesson"
                        >
                          <Pencil size={15} strokeWidth={1.75} />
                        </button>

                        <button
                          onClick={() => deleteLesson(selectedCourse.id, 'mod-2', lesson.id)}
                          style={{ color: 'var(--color-border-danger)', cursor: 'pointer', border: 'none', background: 'none', padding: '4px' }}
                          title="Delete lesson"
                        >
                          <Trash2 size={15} strokeWidth={1.75} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add Content & Add Quiz buttons inside Module 2 */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px 24px 0 52px',
                    }}
                  >
                    <button
                      onClick={() => setActiveTab('add-lesson')}
                      className="btn-secondary btn-sm"
                    >
                      <PlayCircle size={15} strokeWidth={1.75} />
                      Add content
                    </button>

                    <button
                      onClick={() => setActiveTab('add-quiz')}
                      className="btn-secondary btn-sm"
                    >
                      <HelpCircle size={15} strokeWidth={1.75} />
                      Add quiz
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Module 3: Exploring datasets (Collapsed) */}
            <div
              style={{
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div
                onClick={() => toggleModuleAccordion('mod-3')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  cursor: 'pointer',
                  flexGrow: 1,
                }}
              >
                <GripVertical size={18} color="var(--color-text-muted)" strokeWidth={1.75} />
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '13px',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  3
                </div>
                <div>
                  <div style={{ fontSize: '15px', lineHeight: '22px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Exploring datasets
                  </div>
                  <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', marginTop: '2px', fontWeight: 500 }}>
                    7 lessons
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <StatusBadge status="Published" />

                <button
                  onClick={() => toggleModuleAccordion('mod-3')}
                  style={{ color: 'var(--color-text-secondary)', cursor: 'pointer', border: 'none', background: 'none', padding: '4px' }}
                >
                  {openModuleId === 'mod-3' ? <ChevronUp size={18} strokeWidth={1.75} /> : <ChevronDown size={18} strokeWidth={1.75} />}
                </button>

                <button
                  onClick={() => showToast('Edit module: Exploring datasets')}
                  style={{ color: 'var(--color-text-secondary)', cursor: 'pointer', border: 'none', background: 'none', padding: '4px' }}
                  title="Edit module"
                >
                  <Pencil size={16} strokeWidth={1.75} />
                </button>

                <button
                  onClick={() => deleteModule(selectedCourse.id, 'mod-3')}
                  style={{ color: 'var(--color-border-danger)', cursor: 'pointer', border: 'none', background: 'none', padding: '4px' }}
                  title="Delete module"
                >
                  <Trash2 size={16} strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LEARNERS */}
      {workspaceTab === 'learners' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Learners Header Stats */}
          <div
            style={{
              backgroundColor: 'var(--color-canvas)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              padding: '24px',
            }}
          >
            <div>
              <div style={{ fontSize: '28px', lineHeight: '32px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                86
              </div>
              <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', marginTop: '4px', fontWeight: 500 }}>Enrolled learners</div>
            </div>

            <div>
              <div style={{ fontSize: '28px', lineHeight: '32px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                14
              </div>
              <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', marginTop: '4px', fontWeight: 500 }}>Completed</div>
            </div>

            <div>
              <div style={{ fontSize: '28px', lineHeight: '32px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                38%
              </div>
              <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', marginTop: '4px', fontWeight: 500 }}>Average progress</div>
            </div>
          </div>

          {/* Paid Notice Banner - Info Alert style */}
          <div
            style={{
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-status-info-bg)',
              color: 'var(--color-status-info-fg)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '13px',
              lineHeight: '18px',
            }}
          >
            <span style={{ fontWeight: 700 }}>Paid course · $79.00</span>
            <span>— Learners get access after payment is verified. They keep access if you unpublish or archive the course.</span>
          </div>

          {/* Enrolled Learners Table */}
          <div className="table-responsive-container">
            <div
              style={{
                backgroundColor: 'var(--color-canvas)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                minWidth: '640px',
              }}
            >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1.5fr 1fr 100px',
                padding: '12px 24px',
                backgroundColor: 'var(--color-bg-panel)',
                borderBottom: '1px solid var(--color-divider)',
                fontSize: '12px',
                lineHeight: '18px',
                fontWeight: 600,
                color: 'var(--color-text-muted)',
              }}
            >
              <div>Learner</div>
              <div>Enrolled</div>
              <div>Progress</div>
              <div>Last activity</div>
              <div>Access</div>
            </div>

            <div>
              {selectedCourse.learners.map((lrn, idx) => {
                const avatarBgOptions = [
                  'var(--color-avatar-peach)',
                  'var(--color-avatar-blue)',
                  'var(--color-avatar-green)',
                  'var(--color-avatar-purple)'
                ];
                const avatarBg = avatarBgOptions[idx % avatarBgOptions.length];

                return (
                  <div
                    key={lrn.learnerId}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 1.5fr 1fr 100px',
                      alignItems: 'center',
                      padding: '14px 24px',
                      borderBottom: '1px solid var(--color-divider)',
                    }}
                  >
                    {/* Learner Info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: avatarBg,
                          color: 'var(--color-text-primary)',
                          fontSize: '12px',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {lrn.learnerInitials}
                      </div>
                      <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        {lrn.learnerName}
                      </span>
                    </div>

                    {/* Enrolled date */}
                    <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                      {lrn.enrolledDate}
                    </div>

                    {/* Progress bar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          height: '6px',
                          width: '120px',
                          backgroundColor: 'var(--color-bg-disabled)',
                          borderRadius: 'var(--radius-full)',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${lrn.progressPercent}%`,
                            backgroundColor: 'var(--color-action-primary)',
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '12px', lineHeight: '18px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        {lrn.progressPercent}%
                      </span>
                    </div>

                    {/* Last Activity */}
                    <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                      {lrn.lastActivity}
                    </div>

                    {/* Access Status */}
                    <div>
                      <StatusBadge status={lrn.accessStatus === 'Active' ? 'Active' : 'Revoked'} />
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LIVE SESSIONS */}
      {workspaceTab === 'sessions' && (
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <div>
              <h2 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Live sessions
              </h2>
              <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', marginTop: '2px', fontWeight: 500 }}>
                Google Meet links for this course. Times in GMT+1.
              </p>
            </div>

            <button
              onClick={() => showToast('Opening session scheduler...')}
              className="btn-primary"
            >
              <Calendar size={15} strokeWidth={1.75} />
              Schedule live session
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {selectedCourse.liveSessions.map((session) => (
              <div
                key={session.id}
                style={{
                  backgroundColor: 'var(--color-canvas)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-surface-sky)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-link)',
                    }}
                  >
                    <Video size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', lineHeight: '22px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {session.title}
                    </div>
                    <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                      {session.dateStr}: {session.timeRange}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <StatusBadge status={session.status === 'Completed' ? 'Completed' : session.status === 'Live' ? 'Live now' : 'Upcoming'} />

                  <button
                    onClick={() => showToast(`Opening meeting room: ${session.meetUrl}`)}
                    className="btn-secondary btn-sm"
                  >
                    Join Meet
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: COURSE SETTINGS */}
      {workspaceTab === 'settings' && (
        <div style={{ maxWidth: '680px' }}>
          <div
            style={{
              backgroundColor: 'var(--color-canvas)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                Basics
              </h3>
              <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                What learners see first. Fields marked * are required.
              </p>
            </div>

            <div>
              <label className="form-label">
                Course title *
              </label>
              <input
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="form-input"
              />
              <p className="form-helper">
                Shown on the course card. Up to 80 characters.
              </p>
            </div>

            <div>
              <label className="form-label">
                Short description * <span style={{ fontWeight: 500, color: 'var(--color-text-secondary)' }}>required to publish</span>
              </label>
              <textarea
                rows={3}
                value={courseDesc}
                onChange={(e) => setCourseDesc(e.target.value)}
                className="form-input"
                style={{ resize: 'none' }}
              />
            </div>

            {/* Thumbnail upload mockup */}
            <div>
              <label className="form-label">
                Thumbnail <span style={{ fontWeight: 500, color: 'var(--color-text-secondary)' }}>· optional</span>
              </label>
              <div
                style={{
                  padding: '20px',
                  border: '1.5px dashed var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-bg-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  <Upload size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <button
                    onClick={() => showToast('Thumbnail file selector triggered')}
                    className="btn-secondary btn-sm"
                  >
                    Upload image
                  </button>
                  <div style={{ fontSize: '12px', lineHeight: '18px', color: 'var(--color-text-secondary)', marginTop: '4px', fontWeight: 500 }}>
                    PNG or JPG, landscape, up to 2 MB.
                  </div>
                </div>
              </div>
            </div>

            {/* Access & Price */}
            <div style={{ borderTop: '1px solid var(--color-divider)', paddingTop: '20px' }}>
              <h3 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                Access and price
              </h3>
              <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', marginBottom: '16px', fontWeight: 500 }}>
                Free courses are open to anyone with an account.
              </p>

              <div style={{ display: 'inline-flex', backgroundColor: 'var(--color-bg-subtle)', padding: '3px', borderRadius: 'var(--radius-full)', marginBottom: '16px' }}>
                <button
                  type="button"
                  onClick={() => setIsPaid(false)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '13px',
                    fontWeight: 700,
                    backgroundColor: !isPaid ? 'var(--color-action-primary)' : 'transparent',
                    color: !isPaid ? 'var(--color-action-primary-text)' : 'var(--color-text-secondary)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Free
                </button>
                <button
                  type="button"
                  onClick={() => setIsPaid(true)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '13px',
                    fontWeight: 700,
                    backgroundColor: isPaid ? 'var(--color-action-primary)' : 'transparent',
                    color: isPaid ? 'var(--color-action-primary-text)' : 'var(--color-text-secondary)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Paid
                </button>
              </div>

              {isPaid && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label className="form-label">
                      Price (USD) *
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      Discount price · optional
                    </label>
                    <input
                      type="number"
                      value={origPrice}
                      onChange={(e) => setOrigPrice(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Save Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid var(--color-divider)' }}>
              <button onClick={handleSaveSettings} className="btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

