import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Database, User } from 'lucide-react';

export const CoursePreviewModal: React.FC = () => {
  const { isCoursePreviewOpen, setIsCoursePreviewOpen, selectedCourse } = useApp();

  if (!isCoursePreviewOpen || !selectedCourse) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(20, 21, 26, 0.45)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={() => setIsCoursePreviewOpen(false)}
    >
      <div
        className="pop-in modal-dialog"
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: 'var(--bg-canvas, #ffffff)',
          borderRadius: 'var(--radius-lg, 20px)',
          boxShadow: 'var(--shadow-modal)',
          overflow: 'hidden',
          padding: 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Preview Top Header Bar */}
        <div
          style={{
            padding: '12px 20px',
            backgroundColor: 'var(--bg-muted, #F6F6F8)',
            borderBottom: '1px solid var(--border-divider, #ECECEF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--status-neutral-fg, #4A4D57)',
                backgroundColor: 'var(--status-neutral-bg, #EDEDF0)',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full, 9999px)',
              }}
            >
              Learner preview · {selectedCourse.status === 'Published' ? 'live' : 'not published'}
            </span>
          </div>
          <button
            onClick={() => setIsCoursePreviewOpen(false)}
            style={{ color: 'var(--icon-secondary, #5B5E69)', cursor: 'pointer' }}
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px', maxHeight: '75vh', overflowY: 'auto' }}>
          {/* Banner Graphic Header using PDF surface/sky #DCE7F9 */}
          <div
            style={{
              height: '110px',
              borderRadius: 'var(--radius-md, 12px)',
              backgroundColor: 'var(--surface-sky, #DCE7F9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                backgroundColor: 'var(--bg-canvas, #ffffff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--icon-default, #14151A)',
                boxShadow: 'var(--shadow-raised)',
              }}
            >
              <Database size={24} strokeWidth={1.75} />
            </div>
          </div>

          <h2 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 700, color: 'var(--text-primary, #14151A)', letterSpacing: '-0.01em', marginBottom: '8px' }}>
            {selectedCourse.title}
          </h2>
          <p style={{ fontSize: '14px', lineHeight: '22px', fontWeight: 500, color: 'var(--text-body, #3A3D47)', marginBottom: '16px' }}>
            {selectedCourse.shortDescription}
          </p>

          {/* Meta Line */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: '12px',
              color: 'var(--text-secondary, #5B5E69)',
              paddingBottom: '16px',
              borderBottom: '1px solid var(--border-divider, #ECECEF)',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, color: 'var(--text-primary, #14151A)' }}>
              <User size={13} strokeWidth={1.75} />
              Daniel Mensah
            </div>
            <span>·</span>
            <span>{selectedCourse.modulesCount || 6} modules</span>
            <span>·</span>
            <span>{selectedCourse.lessonsCount || 40} lessons</span>
            <span>·</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary, #14151A)' }}>
              {selectedCourse.isFree ? 'Free' : `$${selectedCourse.price.toFixed(2)}`}
              {selectedCourse.originalPrice && (
                <span style={{ textDecoration: 'line-through', color: 'var(--text-muted, #70737E)', marginLeft: '4px', fontWeight: 500 }}>
                  ${selectedCourse.originalPrice.toFixed(2)}
                </span>
              )}
            </span>
          </div>

          {/* Outline Syllabus */}
          <div>
            <h4 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--text-primary, #14151A)', marginBottom: '12px' }}>
              Course outline
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(selectedCourse.modules.length > 0
                ? selectedCourse.modules
                : [
                    { id: '1', title: 'Getting started with data', lessons: [1, 2, 3, 4, 5, 6, 7, 8] },
                    { id: '2', title: 'Cleaning messy data', lessons: [1, 2, 3, 4, 5, 6, 7] },
                    { id: '3', title: 'Exploring with charts', lessons: [1, 2, 3, 4, 5, 6] },
                    { id: '4', title: 'Pivot tables', lessons: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
                    { id: '5', title: 'Telling the story', lessons: [1, 2, 3, 4, 5] },
                    { id: '6', title: 'Final project', lessons: [1, 2, 3, 4, 5] },
                  ]
              ).map((mod, idx) => (
                <div
                  key={mod.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm, 8px)',
                    backgroundColor: 'var(--bg-panel, #F8F8FA)',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: 'var(--text-body, #3A3D47)',
                    border: '1px solid var(--border-divider, #ECECEF)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-muted, #70737E)', width: '16px' }}>{idx + 1}</span>
                    <span style={{ fontWeight: 600 }}>{mod.title}</span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted, #70737E)', fontWeight: 600 }}>
                    {mod.lessons.length} lessons
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: 'var(--bg-canvas, #ffffff)',
            borderTop: '1px solid var(--border-divider, #ECECEF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={() => setIsCoursePreviewOpen(false)}
            className="btn-primary"
            style={{ width: '100%' }}
          >
            Close preview
          </button>
        </div>
      </div>
    </div>
  );
};
