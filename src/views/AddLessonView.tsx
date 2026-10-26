'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronRight, PlayCircle, EyeOff, Layers, Info } from 'lucide-react';

export const AddLessonView: React.FC = () => {
  const { selectedCourse, setActiveTab, addLesson, showToast } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState(
    selectedCourse?.modules[1]?.id || selectedCourse?.modules[0]?.id || ''
  );
  const [duration, setDuration] = useState('10');
  const [error, setError] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a lesson title.');
      return;
    }

    if (!selectedCourse) return;

    const targetModule = selectedModuleId || selectedCourse.modules[0]?.id;
    if (!targetModule) {
      showToast('Please add a module first.');
      return;
    }

    addLesson(
      selectedCourse.id,
      targetModule,
      title.trim(),
      description.trim(),
      videoUrl.trim() || 'https://www.youtube.com/watch?v=sample',
      parseInt(duration) || 10
    );

    setActiveTab('course-workspace');
  };

  return (
    <div className="fade-in page-container">
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
          style={{ color: 'var(--color-text-secondary)', cursor: 'pointer', border: 'none', background: 'none', padding: 0, fontWeight: 500 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
        >
          Courses
        </button>
        <ChevronRight size={14} color="var(--color-text-muted)" strokeWidth={1.75} />
        <button
          onClick={() => setActiveTab('course-workspace')}
          style={{ color: 'var(--color-text-secondary)', cursor: 'pointer', border: 'none', background: 'none', padding: 0, fontWeight: 500 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
        >
          {selectedCourse?.title || 'Data analysis'}
        </button>
        <ChevronRight size={14} color="var(--color-text-muted)" strokeWidth={1.75} />
        <span style={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>Add content</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', marginBottom: '4px' }}>
          Add content
        </h1>
        <p style={{ fontSize: '14px', lineHeight: '22px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
          Add a lesson to a module: a title, a short description and an unlisted YouTube video.
        </p>
      </div>

      <form onSubmit={handleSave}>
        <div className="course-workspace-grid">
          {/* Left Form Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Lesson details card */}
            <div
              style={{
                backgroundColor: 'var(--color-canvas)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
              }}
            >
              <div>
                <h3 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                  Lesson details
                </h3>
                <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                  What learners see in the lesson list and on the lesson page.
                </p>
              </div>

              {/* Module selection */}
              {selectedCourse && selectedCourse.modules.length > 0 && (
                <div>
                  <label className="form-label">
                    Assign to module
                  </label>
                  <select
                    value={selectedModuleId}
                    onChange={(e) => setSelectedModuleId(e.target.value)}
                    className="form-input"
                  >
                    {selectedCourse.modules.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="form-label">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="e.g. Spotting bad data"
                  className="form-input"
                  style={{
                    borderColor: error ? 'var(--color-border-danger)' : undefined,
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  {error ? (
                    <span style={{ fontSize: '12px', lineHeight: '18px', color: 'var(--color-border-danger)', fontWeight: 600 }}>{error}</span>
                  ) : (
                    <span className="form-helper">Up to 80 characters.</span>
                  )}
                  <span style={{ fontSize: '12px', lineHeight: '18px', color: 'var(--color-text-muted)', fontWeight: 600 }}>{title.length}/80</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>
                    Description · <span style={{ fontWeight: 500, color: 'var(--color-text-secondary)' }}>optional</span>
                  </label>
                  <span style={{ fontSize: '12px', lineHeight: '18px', color: 'var(--color-text-muted)', fontWeight: 600 }}>{description.length}/200</span>
                </div>
                <textarea
                  rows={3}
                  maxLength={200}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A line or two on what this lesson covers."
                  className="form-input"
                  style={{ resize: 'none' }}
                />
              </div>

              {/* Duration */}
              <div style={{ maxWidth: '200px' }}>
                <label className="form-label">
                  Estimated minutes
                </label>
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            {/* Video section */}
            <div
              style={{
                backgroundColor: 'var(--color-canvas)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div>
                <h3 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                  Video
                </h3>
                <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                  Paste the link to an unlisted YouTube video.
                </p>
              </div>

              <div>
                <label className="form-label">
                  Video link *
                </label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="form-input"
                />
              </div>

              {/* PDF Page 3 Info Alert for unlisted YouTube videos */}
              <div className="alert alert-info">
                <Info size={16} strokeWidth={1.75} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Unlisted YouTube videos can be opened by anyone with the link. Embedding does not make them private.</span>
              </div>

              {/* Video Player Preview Area */}
              <div
                style={{
                  height: '180px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-subtle)',
                  border: '1.5px dashed var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-canvas)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-muted)',
                    boxShadow: 'var(--shadow-raised)',
                  }}
                >
                  <PlayCircle size={22} strokeWidth={1.75} />
                </div>
                <span style={{ fontSize: '13px', lineHeight: '18px', fontWeight: 500 }}>
                  {videoUrl ? 'Video URL ready for preview' : 'Paste a link to see a preview'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setActiveTab('course-workspace')}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save lesson
              </button>
            </div>
          </div>

          {/* Right Column: Where it goes card */}
          <div>
            <div
              style={{
                backgroundColor: 'var(--color-canvas)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <h3 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Where it goes
              </h3>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                  <Layers size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Added to the end of the module
                  </div>
                  <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                    Reorder it later from Modules & Lessons.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                  <EyeOff size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Hidden until you publish
                  </div>
                  <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                    Learners only see it once the course is published.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

