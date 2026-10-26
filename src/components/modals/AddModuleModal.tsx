'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AddModuleModal: React.FC = () => {
  const { isAddModuleOpen, setIsAddModuleOpen, selectedCourseId, addModule } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  if (!isAddModuleOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a module title.');
      return;
    }

    addModule(selectedCourseId, title.trim(), description.trim());
    setIsAddModuleOpen(false);
    setTitle('');
    setDescription('');
    setError('');
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
      onClick={() => setIsAddModuleOpen(false)}
    >
      <div
        className="pop-in modal-dialog"
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: 'var(--bg-canvas, #ffffff)',
          borderRadius: 'var(--radius-lg, 20px)',
          padding: '32px',
          boxShadow: 'var(--shadow-modal)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 700, color: 'var(--text-primary, #14151A)', letterSpacing: '-0.01em', marginBottom: '4px' }}>
          Add module
        </h2>
        <p style={{ fontSize: '14px', lineHeight: '22px', fontWeight: 500, color: 'var(--text-secondary, #5B5E69)', marginBottom: '24px' }}>
          Modules group related lessons. Learners see them in this order.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label className="form-label">
              Module title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. Cleaning messy data"
              autoFocus
              className={`form-input ${error ? 'error' : ''}`}
            />
            {error && (
              <p className="form-helper error">
                {error}
              </p>
            )}
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>
                Description <span style={{ fontWeight: 500, color: 'var(--text-secondary, #5B5E69)' }}>· optional</span>
              </label>
              <span style={{ fontSize: '12px', color: 'var(--text-muted, #70737E)', fontWeight: 600 }}>
                {description.length}/200
              </span>
            </div>
            <textarea
              rows={4}
              maxLength={200}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What this module covers."
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm, 8px)',
                border: '1px solid var(--border-default, #D9DADF)',
                fontSize: '14px',
                lineHeight: '22px',
                fontFamily: 'inherit',
                fontWeight: 500,
                outline: 'none',
                color: 'var(--text-primary, #14151A)',
                backgroundColor: 'var(--bg-canvas, #ffffff)',
                resize: 'none',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '12px',
              marginTop: '12px',
            }}
          >
            <button
              type="button"
              onClick={() => setIsAddModuleOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Add module
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

