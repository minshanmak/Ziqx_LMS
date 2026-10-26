'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X } from 'lucide-react';

export const LearnersView: React.FC = () => {
  const { learners } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  // 4 avatar color tints from PDF Design System (Page 2) with dark primary text
  const getLearnerAvatarPalette = (initials: string) => {
    switch (initials) {
      case 'OH':
      case 'AR':
      case 'CM':
        return { bg: 'var(--color-avatar-peach)', text: 'var(--color-text-primary)' }; // #F4C7A8
      case 'MS':
      case 'NP':
        return { bg: 'var(--color-avatar-blue)', text: 'var(--color-text-primary)' }; // #BFD4F2
      case 'TB':
      case 'SA':
      case 'IY':
        return { bg: 'var(--color-avatar-green)', text: 'var(--color-text-primary)' }; // #CBE2B0
      case 'KA':
      case 'PO':
      case 'LF':
      case 'GL':
      default:
        return { bg: 'var(--color-avatar-purple)', text: 'var(--color-text-primary)' }; // #D9C7F0
    }
  };

  const filteredLearners = useMemo(() => {
    if (!searchQuery.trim()) return learners;
    const q = searchQuery.toLowerCase().trim();
    return learners.filter(
      l =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        l.enrolledCourses.some(c => c.toLowerCase().includes(q))
    );
  }, [learners, searchQuery]);

  return (
    <div
      className="fade-in page-container"
    >
      {/* Header & Search */}
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
            Learners
          </h1>
          <p style={{ fontSize: '14px', lineHeight: '22px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
            Everyone enrolled in your courses.
          </p>
        </div>

        {/* Search Input Field - Pill shape matching PDF */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
          <Search
            size={16}
            color="var(--color-text-secondary)"
            strokeWidth={1.75}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email or phone"
            style={{
              width: '100%',
              height: '40px',
              padding: '0 38px 0 42px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-border)',
              fontSize: '13px',
              lineHeight: '18px',
              color: 'var(--color-text-primary)',
              backgroundColor: 'var(--color-bg-subtle)',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
                border: 'none',
                background: 'none',
              }}
            >
              <X size={15} strokeWidth={1.75} />
            </button>
          )}
        </div>
      </div>

      {/* Main Table Container: Directly on canvas without card borders */}
      {filteredLearners.length > 0 ? (
        <div className="table-responsive-container">
          <div style={{ minWidth: '760px' }}>
            {/* Table Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(220px, 1.8fr) 1.2fr 1.8fr 1.2fr 1.8fr',
                padding: '10px 0',
                fontSize: '12px',
                lineHeight: '18px',
                fontWeight: 600,
                color: 'var(--color-text-muted)',
                borderBottom: '1px solid var(--color-divider)',
              }}
            >
              <div>Name</div>
              <div>Phone</div>
              <div>Email</div>
              <div>Enrolled on</div>
              <div>Enrolled course</div>
            </div>

            {/* Rows */}
            <div>
              {filteredLearners.map((lrn) => {
              const pal = getLearnerAvatarPalette(lrn.initials);

              return (
                <div
                  key={lrn.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(220px, 1.8fr) 1.2fr 1.8fr 1.2fr 1.8fr',
                    alignItems: 'center',
                    padding: '16px 0',
                    borderBottom: '1px solid var(--color-divider)',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bg-panel)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {/* Avatar + Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: pal.bg,
                        color: pal.text,
                        fontWeight: 700,
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {lrn.initials}
                    </div>
                    <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {lrn.name}
                    </span>
                  </div>

                  {/* Phone */}
                  <div style={{ fontSize: '14px', lineHeight: '20px', color: 'var(--color-text-body)', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
                    {lrn.phone}
                  </div>

                  {/* Email */}
                  <div style={{ fontSize: '14px', lineHeight: '20px', color: 'var(--color-text-body)', fontWeight: 500 }}>
                    {lrn.email}
                  </div>

                  {/* Enrolled on */}
                  <div style={{ fontSize: '14px', lineHeight: '20px', color: 'var(--color-text-body)', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
                    {lrn.enrolledOn}
                  </div>

                  {/* Enrolled course summary */}
                  <div style={{ fontSize: '14px', lineHeight: '20px', color: 'var(--color-text-primary)', fontWeight: 700 }}>
                    {lrn.coursesSummary}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
        ) : (
          <div
            style={{
              padding: '64px 20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-bg-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
              }}
            >
              <Search size={22} strokeWidth={1.75} />
            </div>
            <h3 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
              No learners found
            </h3>
            <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', marginBottom: '18px', fontWeight: 500 }}>
              Try a different name, email or phone number.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="btn-secondary btn-sm"
            >
              Clear search
            </button>
          </div>
        )}
    </div>
  );
};


