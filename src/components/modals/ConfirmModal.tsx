import React from 'react';
import { useApp } from '../../context/AppContext';
import { Archive, EyeOff } from 'lucide-react';

export const ConfirmModal: React.FC = () => {
  const {
    isArchiveModalOpen,
    setIsArchiveModalOpen,
    isUnpublishModalOpen,
    setIsUnpublishModalOpen,
    targetCourseForAction,
    setTargetCourseForAction,
    archiveCourse,
    unpublishCourse
  } = useApp();

  if (!isArchiveModalOpen && !isUnpublishModalOpen) return null;
  if (!targetCourseForAction) return null;

  const isArchive = isArchiveModalOpen;

  const handleClose = () => {
    setIsArchiveModalOpen(false);
    setIsUnpublishModalOpen(false);
    setTargetCourseForAction(null);
  };

  const handleConfirm = () => {
    if (isArchive) {
      archiveCourse(targetCourseForAction.id);
    } else {
      unpublishCourse(targetCourseForAction.id);
    }
    handleClose();
  };

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
      onClick={handleClose}
    >
      <div
        className="pop-in modal-dialog"
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'var(--bg-canvas, #ffffff)',
          borderRadius: 'var(--radius-lg, 20px)',
          padding: '28px',
          boxShadow: 'var(--shadow-modal)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Warning Icon Badge in round circle as in PDF Page 3 */}
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-full, 9999px)',
            backgroundColor: isArchive ? 'var(--status-warning-bg, #FCEFD2)' : 'var(--status-neutral-bg, #EDEDF0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isArchive ? 'var(--status-warning-fg, #8A5A0B)' : 'var(--status-neutral-fg, #4A4D57)',
            marginBottom: '16px',
          }}
        >
          {isArchive ? <Archive size={20} strokeWidth={1.75} /> : <EyeOff size={20} strokeWidth={1.75} />}
        </div>

        <h3 style={{ fontSize: '17px', lineHeight: '24px', fontWeight: 700, color: 'var(--text-primary, #14151A)', marginBottom: '8px' }}>
          {isArchive
            ? `Archive "${targetCourseForAction.title}"?`
            : `Unpublish "${targetCourseForAction.title}"?`}
        </h3>

        <p style={{ fontSize: '14px', lineHeight: '22px', fontWeight: 500, color: 'var(--text-body, #3A3D47)', marginBottom: '24px' }}>
          {isArchive
            ? `It will be hidden from the catalogue and new learners can't enroll. ${
                targetCourseForAction.learnersCount || 128
              } enrolled learners keep their access. You can restore it later.`
            : `It returns to draft and disappears from the catalogue. Enrolled learners keep their access.`}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            type="button"
            onClick={handleClose}
            className="btn-secondary"
          >
            {isArchive ? 'Keep course' : 'Keep published'}
          </button>
          
          <button
            type="button"
            onClick={handleConfirm}
            className={isArchive ? 'btn-danger' : 'btn-primary'}
          >
            {isArchive ? 'Archive course' : 'Unpublish'}
          </button>
        </div>
      </div>
    </div>
  );
};
