'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Monitor,
  Smartphone,
  Globe,
  User,
  BookOpen,
  MessageSquare,
  PanelBottom,
  Palette,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Menu,
  Award,
  Users,
  BarChart2,
  PieChart,
  Database,
  GraduationCap,
  Mail,
  AtSign,
  Check,
  LayoutTemplate,
  Pencil
} from 'lucide-react';

export const LearnerPortalView: React.FC = () => {
  const { portalConfig, setPortalConfig, courses, showToast } = useApp();
  const [activeSection, setActiveSection] = useState<'hero' | 'mentor' | 'courses' | 'testimonials' | 'footer' | 'design'>('hero');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedTestimonialIdx, setSelectedTestimonialIdx] = useState(0);
  const [portalMobileView, setPortalMobileView] = useState<'editor' | 'preview'>('editor');

  // Section order & visibility state for realistic live reordering in the portal
  const [sectionOrder, setSectionOrder] = useState<string[]>(['hero', 'mentor', 'courses', 'testimonials', 'footer']);
  const [hiddenSections, setHiddenSections] = useState<Record<string, boolean>>({});

  const handleSaveDraft = () => {
    showToast('Portal draft saved');
  };

  const handlePublish = () => {
    showToast('Learner portal published successfully to learn.ziqxskills.example!');
  };

  const sectionsList = [
    { id: 'hero', label: 'Hero', icon: LayoutTemplate, hasControls: false },
    { id: 'mentor', label: 'About / mentor', icon: User, hasControls: true },
    { id: 'courses', label: 'Courses', icon: BookOpen, hasControls: true },
    { id: 'testimonials', label: 'What learners say', icon: MessageSquare, hasControls: true },
    { id: 'footer', label: 'Footer', icon: PanelBottom, hasControls: false },
    { id: 'design', label: 'Design', icon: Palette, hasControls: false },
  ];

  // Reordering handler for sections with controls
  const handleMoveSection = (secId: string, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIdx = sectionOrder.indexOf(secId);
    if (currentIdx === -1) return;

    const newIdx = direction === 'up' ? currentIdx - 1 : currentIdx + 1;
    // Don't move hero (first) or footer (last)
    if (newIdx <= 0 || newIdx >= sectionOrder.length - 1) return;

    const newOrder = [...sectionOrder];
    const temp = newOrder[currentIdx];
    newOrder[currentIdx] = newOrder[newIdx];
    newOrder[newIdx] = temp;
    setSectionOrder(newOrder);
    showToast(`Moved section ${direction}`);
  };

  const handleToggleVisibility = (secId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHiddenSections(prev => {
      const isHidden = !prev[secId];
      showToast(isHidden ? `Hidden in live preview` : `Visible in live preview`);
      return { ...prev, [secId]: isHidden };
    });
  };

  // Accent colors from design system
  const accentColors = ['#3B40B8', '#0F6E5E', '#C23030', '#14151A'];

  const courseIcons = [BarChart2, PieChart, Database];
  const courseBanners = ['#DCE7F9', '#EEF3D8', '#E8E8FA'];

  // PDF Page 2 Avatar color tints with #14151A text
  const testimonialAvatars = [
    { initials: 'MS', bg: '#BFD4F2', color: '#14151A' },
    { initials: 'TB', bg: '#F4C7A8', color: '#14151A' },
    { initials: 'AY', bg: '#D9C7F0', color: '#14151A' },
  ];

  return (
    <div
      className="fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: 'var(--color-canvas)',
        overflow: 'hidden',
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          height: '68px',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-canvas)',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
            Learner portal
          </h1>
          {/* PDF Page 2 Status Warning Badge */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              lineHeight: '18px',
              fontWeight: 600,
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-status-warning-bg)',
              color: 'var(--color-status-warning-fg)',
            }}
          >
            <Pencil size={12} strokeWidth={1.75} />
            Draft · unpublished changes
          </span>
        </div>

        {/* Action Controls - Pill Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Mobile / Tablet Editor vs Preview Toggle */}
          <div className="portal-view-toggle">
            <button
              type="button"
              onClick={() => setPortalMobileView('editor')}
              className={portalMobileView === 'editor' ? 'active' : ''}
            >
              Editor
            </button>
            <button
              type="button"
              onClick={() => setPortalMobileView('preview')}
              className={portalMobileView === 'preview' ? 'active' : ''}
            >
              Preview
            </button>
          </div>

          <button
            onClick={handleSaveDraft}
            className="btn-secondary btn-sm"
          >
            Save draft
          </button>
          <button
            onClick={handlePublish}
            className="btn-primary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Globe size={15} strokeWidth={1.75} />
            Publish
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Editor Column + Right Live Preview Column */}
      <div
        className="portal-split-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: '360px minmax(0, 1fr)',
          flex: '1 1 0%',
          minHeight: 0,
          height: 'calc(100vh - 68px)',
          overflow: 'hidden',
        }}
      >
        {/* LEFT PANEL: Sections & Settings Editor */}
        <div
          className={`portal-editor-panel ${portalMobileView === 'preview' ? 'hidden-mobile' : ''}`}
          style={{
            borderRight: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-canvas)',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            height: '100%',
            overflowY: 'auto',
            padding: '24px 28px',
          }}
        >
          {/* Section Selector List */}
          <div>
            <div
              style={{
                fontSize: '12px',
                lineHeight: '18px',
                fontWeight: 700,
                color: 'var(--color-text-muted)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              PAGE SECTIONS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {sectionsList.map((sec) => {
                const isSelected = activeSection === sec.id;
                const IconComponent = sec.icon;
                const isHidden = hiddenSections[sec.id];
                return (
                  <div
                    key={sec.id}
                    onClick={() => setActiveSection(sec.id as any)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      fontWeight: isSelected ? 700 : 500,
                      backgroundColor: isSelected ? 'var(--color-panel)' : 'transparent',
                      color: isSelected ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <IconComponent size={16} strokeWidth={1.75} color={isSelected ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'} />
                      <span>{sec.label}</span>
                    </div>

                    {sec.hasControls && (
                      <div
                        style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--color-text-secondary)' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={(e) => handleMoveSection(sec.id, 'up', e)}
                          title="Move up"
                          style={{
                            padding: '3px',
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text-secondary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <ChevronUp size={14} strokeWidth={1.75} />
                        </button>
                        <button
                          onClick={(e) => handleMoveSection(sec.id, 'down', e)}
                          title="Move down"
                          style={{
                            padding: '3px',
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text-secondary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <ChevronDown size={14} strokeWidth={1.75} />
                        </button>
                        <button
                          onClick={(e) => handleToggleVisibility(sec.id, e)}
                          title={isHidden ? 'Show section' : 'Hide section'}
                          style={{
                            padding: '3px',
                            background: 'none',
                            border: 'none',
                            color: isHidden ? 'var(--color-danger)' : 'var(--color-text-secondary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {isHidden ? <EyeOff size={14} strokeWidth={1.75} /> : <Eye size={14} strokeWidth={1.75} />}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Thin divider line below PAGE SECTIONS */}
          <div style={{ borderBottom: '1px solid var(--color-divider)', margin: '22px 0 24px 0' }} />

          {/* Active Section Form Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* HERO SECTION */}
            {activeSection === 'hero' && (
              <>
                <h3 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 4px 0' }}>Hero</h3>
                <div>
                  <label className="form-label">
                    Eyebrow
                  </label>
                  <input
                    type="text"
                    value={portalConfig.hero.eyebrow}
                    onChange={(e) =>
                      setPortalConfig(prev => ({
                        ...prev,
                        hero: { ...prev.hero, eyebrow: e.target.value },
                      }))
                    }
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={portalConfig.hero.headline}
                    onChange={(e) =>
                      setPortalConfig(prev => ({
                        ...prev,
                        hero: { ...prev.hero, headline: e.target.value },
                      }))
                    }
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Supporting text
                  </label>
                  <textarea
                    rows={3}
                    value={portalConfig.hero.supportingText}
                    onChange={(e) =>
                      setPortalConfig(prev => ({
                        ...prev,
                        hero: { ...prev.hero, supportingText: e.target.value },
                      }))
                    }
                    className="form-input"
                    style={{ resize: 'none', lineHeight: '22px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label className="form-label">
                      Primary button
                    </label>
                    <input
                      type="text"
                      value={portalConfig.hero.primaryButtonText}
                      onChange={(e) =>
                        setPortalConfig(prev => ({
                          ...prev,
                          hero: { ...prev.hero, primaryButtonText: e.target.value },
                        }))
                      }
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      Secondary button
                    </label>
                    <input
                      type="text"
                      value={portalConfig.hero.secondaryButtonText}
                      onChange={(e) =>
                        setPortalConfig(prev => ({
                          ...prev,
                          hero: { ...prev.hero, secondaryButtonText: e.target.value },
                        }))
                      }
                      className="form-input"
                    />
                  </div>
                </div>
              </>
            )}

            {/* MENTOR SECTION */}
            {activeSection === 'mentor' && (
              <>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#101828', margin: '0 0 4px 0' }}>About / mentor</h3>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#344054', marginBottom: '6px' }}>
                    Section heading
                  </label>
                  <input
                    type="text"
                    value={portalConfig.mentor.sectionHeading}
                    onChange={(e) =>
                      setPortalConfig(prev => ({
                        ...prev,
                        mentor: { ...prev.mentor, sectionHeading: e.target.value },
                      }))
                    }
                    style={{
                      width: '100%',
                      height: '40px',
                      padding: '0 12px',
                      borderRadius: '8px',
                      border: '1px solid #d0d5dd',
                      fontSize: '13px',
                      color: '#101828',
                      backgroundColor: '#ffffff',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label className="form-label">
                      Mentor name
                    </label>
                    <input
                      type="text"
                      value={portalConfig.mentor.mentorName}
                      onChange={(e) =>
                        setPortalConfig(prev => ({
                          ...prev,
                          mentor: { ...prev.mentor, mentorName: e.target.value },
                        }))
                      }
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">
                      Role
                    </label>
                    <input
                      type="text"
                      value={portalConfig.mentor.role}
                      onChange={(e) =>
                        setPortalConfig(prev => ({
                          ...prev,
                          mentor: { ...prev.mentor, role: e.target.value },
                        }))
                      }
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">
                    About / bio
                  </label>
                  <textarea
                    rows={4}
                    value={portalConfig.mentor.bio}
                    onChange={(e) =>
                      setPortalConfig(prev => ({
                        ...prev,
                        mentor: { ...prev.mentor, bio: e.target.value },
                      }))
                    }
                    className="form-input"
                    style={{ resize: 'none', lineHeight: '22px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label className="form-label">
                      Highlight 1
                    </label>
                    <input
                      type="text"
                      value={portalConfig.mentor.highlight1}
                      onChange={(e) =>
                        setPortalConfig(prev => ({
                          ...prev,
                          mentor: { ...prev.mentor, highlight1: e.target.value },
                        }))
                      }
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">
                      Highlight 2
                    </label>
                    <input
                      type="text"
                      value={portalConfig.mentor.highlight2}
                      onChange={(e) =>
                        setPortalConfig(prev => ({
                          ...prev,
                          mentor: { ...prev.mentor, highlight2: e.target.value },
                        }))
                      }
                      className="form-input"
                    />
                  </div>
                </div>
              </>
            )}

            {/* COURSES SECTION */}
            {activeSection === 'courses' && (
              <>
                <h3 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 4px 0' }}>Courses</h3>
                <div>
                  <label className="form-label">
                    Section heading
                  </label>
                  <input
                    type="text"
                    value={portalConfig.courses.sectionHeading}
                    onChange={(e) =>
                      setPortalConfig(prev => ({
                        ...prev,
                        courses: { ...prev.courses, sectionHeading: e.target.value },
                      }))
                    }
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Subheading
                  </label>
                  <input
                    type="text"
                    value={portalConfig.courses.subheading}
                    onChange={(e) =>
                      setPortalConfig(prev => ({
                        ...prev,
                        courses: { ...prev.courses, subheading: e.target.value },
                      }))
                    }
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Featured courses <span style={{ fontWeight: 500, color: 'var(--color-text-muted)' }}>· published only</span>
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {courses.slice(0, 4).map((c) => {
                      const isChecked = portalConfig.courses.featuredCourseIds.includes(c.id);
                      return (
                        <div
                          key={c.id}
                          onClick={() => {
                            setPortalConfig(prev => {
                              const exists = prev.courses.featuredCourseIds.includes(c.id);
                              const nextIds = exists
                                ? prev.courses.featuredCourseIds.filter(id => id !== c.id)
                                : [...prev.courses.featuredCourseIds, c.id];
                              return {
                                ...prev,
                                courses: { ...prev.courses, featuredCourseIds: nextIds },
                              };
                            });
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 14px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--color-canvas)',
                            border: '1px solid var(--color-border)',
                            cursor: 'pointer',
                            transition: 'border 0.15s ease',
                          }}
                        >
                          {/* Styled checkbox matching PDF Page 2 */}
                          <div
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '4px',
                              backgroundColor: isChecked ? 'var(--color-text-primary)' : 'var(--color-canvas)',
                              border: isChecked ? 'none' : '1.5px solid var(--color-border)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {isChecked && <Check size={12} strokeWidth={2} color="#ffffff" />}
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', lineHeight: '18px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{c.title}</div>
                            <div style={{ fontSize: '12px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontVariantNumeric: 'tabular-nums' }}>
                              {c.lessonsCount} lessons · {c.level || 'Beginner'} · {c.isFree ? 'Free' : `$${c.price}`}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* TESTIMONIALS SECTION */}
            {activeSection === 'testimonials' && (
              <>
                <h3 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 4px 0' }}>What learners say</h3>
                <div>
                  <label className="form-label">
                    Section heading
                  </label>
                  <input
                    type="text"
                    value={portalConfig.testimonials.sectionHeading}
                    onChange={(e) =>
                      setPortalConfig(prev => ({
                        ...prev,
                        testimonials: { ...prev.testimonials, sectionHeading: e.target.value },
                      }))
                    }
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Testimonials
                  </label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '14px' }}>
                    {portalConfig.testimonials.items.map((item, idx) => {
                      const isSelected = selectedTestimonialIdx === idx;
                      const firstName = item.learner.split(' ')[0];
                      return (
                        <button
                          key={item.id}
                          onClick={() => setSelectedTestimonialIdx(idx)}
                          style={{
                            padding: '4px 14px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '12px',
                            lineHeight: '18px',
                            fontWeight: isSelected ? 700 : 500,
                            backgroundColor: isSelected ? 'var(--color-text-primary)' : 'var(--color-canvas)',
                            color: isSelected ? '#ffffff' : 'var(--color-text-primary)',
                            border: isSelected ? '1px solid var(--color-text-primary)' : '1px solid var(--color-border)',
                            cursor: 'pointer',
                          }}
                        >
                          {firstName}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => showToast('Add testimonial clicked')}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px dashed var(--color-border)',
                        backgroundColor: 'var(--color-canvas)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-text-secondary)',
                        cursor: 'pointer',
                      }}
                      title="Add testimonial"
                    >
                      <Plus size={14} strokeWidth={1.75} />
                    </button>
                  </div>

                  {/* Selected Testimonial Card */}
                  {portalConfig.testimonials.items[selectedTestimonialIdx] && (
                    <div
                      style={{
                        padding: '16px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-panel)',
                        border: '1px solid var(--color-border)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                      }}
                    >
                      <div>
                        <label className="form-label">
                          Quote
                        </label>
                        <textarea
                          rows={3}
                          value={portalConfig.testimonials.items[selectedTestimonialIdx].quote}
                          onChange={(e) => {
                            const quote = e.target.value;
                            setPortalConfig(prev => ({
                              ...prev,
                              testimonials: {
                                ...prev.testimonials,
                                items: prev.testimonials.items.map((t, i) =>
                                  i === selectedTestimonialIdx ? { ...t, quote } : t
                                ),
                              },
                            }));
                          }}
                          className="form-input"
                          style={{ resize: 'none', lineHeight: '22px' }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                          <label className="form-label">
                            Learner
                          </label>
                          <input
                            type="text"
                            value={portalConfig.testimonials.items[selectedTestimonialIdx].learner}
                            onChange={(e) => {
                              const learner = e.target.value;
                              setPortalConfig(prev => ({
                                ...prev,
                                testimonials: {
                                  ...prev.testimonials,
                                  items: prev.testimonials.items.map((t, i) =>
                                    i === selectedTestimonialIdx ? { ...t, learner } : t
                                  ),
                                },
                              }));
                            }}
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label className="form-label">
                            Course
                          </label>
                          <input
                            type="text"
                            value={portalConfig.testimonials.items[selectedTestimonialIdx].course}
                            onChange={(e) => {
                              const course = e.target.value;
                              setPortalConfig(prev => ({
                                ...prev,
                                testimonials: {
                                  ...prev.testimonials,
                                  items: prev.testimonials.items.map((t, i) =>
                                    i === selectedTestimonialIdx ? { ...t, course } : t
                                  ),
                                },
                              }));
                            }}
                            className="form-input"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => showToast('Remove testimonial clicked')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: 'var(--color-danger)',
                          fontSize: '12px',
                          fontWeight: 600,
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px 0',
                          marginTop: '4px',
                        }}
                      >
                        <Trash2 size={13} strokeWidth={1.75} />
                        Remove testimonial
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* FOOTER SECTION */}
            {activeSection === 'footer' && (
              <>
                <h3 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 4px 0' }}>Footer</h3>
                <div>
                  <label className="form-label">
                    Organization name
                  </label>
                  <input
                    type="text"
                    value={portalConfig.footer.orgName}
                    onChange={(e) =>
                      setPortalConfig(prev => ({
                        ...prev,
                        footer: { ...prev.footer, orgName: e.target.value },
                      }))
                    }
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={portalConfig.footer.tagline}
                    onChange={(e) =>
                      setPortalConfig(prev => ({
                        ...prev,
                        footer: { ...prev.footer, tagline: e.target.value },
                      }))
                    }
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Contact email
                  </label>
                  <input
                    type="text"
                    value={portalConfig.footer.contactEmail}
                    onChange={(e) =>
                      setPortalConfig(prev => ({
                        ...prev,
                        footer: { ...prev.footer, contactEmail: e.target.value },
                      }))
                    }
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Social handle
                  </label>
                  <input
                    type="text"
                    value={portalConfig.footer.socialHandle}
                    onChange={(e) =>
                      setPortalConfig(prev => ({
                        ...prev,
                        footer: { ...prev.footer, socialHandle: e.target.value },
                      }))
                    }
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Copyright line
                  </label>
                  <input
                    type="text"
                    value={portalConfig.footer.copyrightLine}
                    onChange={(e) =>
                      setPortalConfig(prev => ({
                        ...prev,
                        footer: { ...prev.footer, copyrightLine: e.target.value },
                      }))
                    }
                    className="form-input"
                  />
                </div>
              </>
            )}

            {/* DESIGN STYLING */}
            {activeSection === 'design' && (
              <>
                <h3 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 4px 0' }}>Design</h3>
                <div>
                  <label className="form-label">
                    Accent colour
                  </label>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {accentColors.map((color) => {
                      const isSelected = portalConfig.design.accentColor === color;
                      return (
                        <button
                          key={color}
                          onClick={() =>
                            setPortalConfig(prev => ({
                              ...prev,
                              design: { ...prev.design, accentColor: color },
                            }))
                          }
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: color,
                            border: 'none',
                            outline: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: isSelected
                              ? `0 0 0 2px #ffffff, 0 0 0 4px ${color}`
                              : 'inset 0 0 0 2px rgba(255, 255, 255, 0.45)',
                            transition: 'transform 0.15s ease',
                          }}
                        >
                          {isSelected && <Check size={14} strokeWidth={2.5} color="#ffffff" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="form-label">
                    Heading style
                  </label>
                  <div style={{ display: 'inline-flex', backgroundColor: 'var(--color-panel)', padding: '3px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                    <button
                      onClick={() =>
                        setPortalConfig(prev => ({
                          ...prev,
                          design: { ...prev.design, headingStyle: 'sans' },
                        }))
                      }
                      style={{
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '12px',
                        fontWeight: portalConfig.design.headingStyle === 'sans' ? 700 : 500,
                        backgroundColor: portalConfig.design.headingStyle === 'sans' ? 'var(--color-canvas)' : 'transparent',
                        color: 'var(--color-text-primary)',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: portalConfig.design.headingStyle === 'sans' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                      }}
                    >
                      Modern sans
                    </button>
                    <button
                      onClick={() =>
                        setPortalConfig(prev => ({
                          ...prev,
                          design: { ...prev.design, headingStyle: 'serif' },
                        }))
                      }
                      style={{
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '12px',
                        fontWeight: portalConfig.design.headingStyle === 'serif' ? 700 : 500,
                        backgroundColor: portalConfig.design.headingStyle === 'serif' ? 'var(--color-canvas)' : 'transparent',
                        color: 'var(--color-text-primary)',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: portalConfig.design.headingStyle === 'serif' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                      }}
                    >
                      Classic serif
                    </button>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label className="form-label" style={{ marginBottom: 0 }}>
                      Corner radius · {portalConfig.design.cornerRadius}px
                    </label>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="24"
                    step="2"
                    value={portalConfig.design.cornerRadius}
                    onChange={(e) =>
                      setPortalConfig(prev => ({
                        ...prev,
                        design: { ...prev.design, cornerRadius: parseInt(e.target.value) },
                      }))
                    }
                    style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--color-text-primary)' }}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Live Interactive Portal Website Preview */}
        <div
          className={`portal-preview-panel ${portalMobileView === 'editor' ? 'hidden-mobile' : ''}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--color-bg-muted)',
            padding: '20px 32px 24px',
            overflow: 'hidden',
            minHeight: 0,
            height: '100%',
            flex: '1 1 0%',
          }}
        >
          {/* Header row above browser mockup with device switch */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
              <Eye size={15} strokeWidth={1.75} />
              <span>Live preview</span>
            </div>

            {/* Device Switcher Toggle */}
            <div
              style={{
                display: 'flex',
                backgroundColor: 'var(--color-canvas)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '3px',
                gap: '2px',
              }}
            >
              <button
                onClick={() => setPreviewDevice('desktop')}
                style={{
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: previewDevice === 'desktop' ? 'var(--color-panel)' : 'transparent',
                  color: previewDevice === 'desktop' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
                title="Desktop view"
              >
                <Monitor size={15} strokeWidth={1.75} />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                style={{
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: previewDevice === 'mobile' ? 'var(--color-panel)' : 'transparent',
                  color: previewDevice === 'mobile' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
                title="Mobile view"
              >
                <Smartphone size={15} strokeWidth={1.75} />
              </button>
            </div>
          </div>

          {/* Browser Window Mockup */}
          <div
            style={{
              flex: '1 1 0%',
              minHeight: 0,
              backgroundColor: previewDevice === 'mobile' ? '#e4e7ec' : '#ffffff',
              borderRadius: '14px',
              border: '1px solid #eaecf0',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 1px 3px rgba(16, 24, 40, 0.05)',
            }}
          >
            {/* Top Browser Bar Mockup */}
            <div
              style={{
                width: '100%',
                backgroundColor: 'var(--color-bg-subtle)',
                padding: '9px 16px',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-border)' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-border)' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-border)' }} />
              </div>

              <div
                style={{
                  flexGrow: 1,
                  maxWidth: '380px',
                  margin: '0 auto',
                  backgroundColor: 'var(--color-canvas)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '3px 14px',
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  textAlign: 'center',
                  fontWeight: 500,
                }}
              >
                learn.ziqxskills.example
              </div>
            </div>

            {/* Scrollable Viewport */}
            <div
              className="preview-scroll-viewport"
              style={{
                flex: '1 1 0%',
                minHeight: 0,
                overflowY: 'auto',
                overflowX: 'hidden',
                backgroundColor: previewDevice === 'mobile' ? 'var(--color-bg-muted)' : 'var(--color-canvas)',
                padding: previewDevice === 'mobile' ? '32px 0' : '0',
                display: 'block',
              }}
            >
              <div
                style={{
                  width: previewDevice === 'mobile' ? '375px' : '100%',
                  margin: previewDevice === 'mobile' ? '0 auto' : '0',
                  minHeight: '100%',
                  backgroundColor: 'var(--color-canvas)',
                  boxShadow: previewDevice === 'mobile' ? 'var(--shadow-md)' : 'none',
                  borderRadius: previewDevice === 'mobile' ? '24px' : '0',
                  border: previewDevice === 'mobile' ? '8px solid var(--color-text-primary)' : 'none',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Site Navbar */}
                <div
                  style={{
                    padding: previewDevice === 'mobile' ? '14px 18px' : '16px 36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--color-divider)',
                    backgroundColor: 'var(--color-canvas)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        backgroundColor: portalConfig.design.accentColor,
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <GraduationCap size={14} strokeWidth={1.75} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-text-primary)' }}>
                      Ziqx Skills
                    </span>
                  </div>

                  {previewDevice === 'desktop' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 700 }}>
                      <span style={{ cursor: 'pointer' }}>Courses</span>
                      <span style={{ cursor: 'pointer' }}>Mentor</span>
                      <span style={{ cursor: 'pointer' }}>Stories</span>
                      <button
                        style={{
                          padding: '6px 16px',
                          borderRadius: 'var(--radius-full)',
                          border: '1.5px solid var(--color-text-primary)',
                          backgroundColor: 'transparent',
                          fontSize: '12px',
                          fontWeight: 700,
                          color: 'var(--color-text-primary)',
                          cursor: 'pointer',
                        }}
                      >
                        Log in
                      </button>
                    </div>
                  ) : (
                    <button style={{ background: 'none', border: 'none', color: 'var(--color-text-primary)', cursor: 'pointer', display: 'flex' }}>
                      <Menu size={20} strokeWidth={1.75} />
                    </button>
                  )}
                </div>

                {/* DYNAMIC SECTION RENDERING ACCORDING TO REORDERING & VISIBILITY */}
                {sectionOrder.map((sectionId) => {
                  if (hiddenSections[sectionId]) return null;

                  // 1. HERO SECTION (Pastel sky #DCE7F9)
                  if (sectionId === 'hero') {
                    return (
                      <div
                        key="hero"
                        style={{
                          padding: previewDevice === 'mobile' ? '32px 20px' : '56px 40px',
                          backgroundColor: 'var(--color-surface-sky)',
                          display: 'flex',
                          flexDirection: previewDevice === 'mobile' ? 'column' : 'row',
                          alignItems: 'center',
                          gap: '36px',
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <span
                            style={{
                              fontSize: '12px',
                              lineHeight: '18px',
                              fontWeight: 600,
                              letterSpacing: '0.04em',
                              color: 'var(--color-link)',
                              backgroundColor: 'rgba(59, 64, 184, 0.1)',
                              padding: '4px 10px',
                              borderRadius: 'var(--radius-full)',
                              display: 'inline-block',
                              marginBottom: '16px',
                              textTransform: 'uppercase',
                            }}
                          >
                            {portalConfig.hero.eyebrow}
                          </span>

                          <h1
                            style={{
                              fontFamily: portalConfig.design.headingStyle === 'serif' ? 'Georgia, serif' : 'var(--font-sans)',
                              fontSize: previewDevice === 'mobile' ? '28px' : '36px',
                              fontWeight: 800,
                              color: 'var(--color-text-primary)',
                              lineHeight: 1.15,
                              letterSpacing: '-0.02em',
                              marginBottom: '16px',
                            }}
                          >
                            {portalConfig.hero.headline}
                          </h1>

                          <p style={{ fontSize: '14px', lineHeight: '22px', color: 'var(--color-text-body)', marginBottom: '24px', maxWidth: '440px', fontWeight: 500 }}>
                            {portalConfig.hero.supportingText}
                          </p>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                            <button
                              style={{
                                backgroundColor: portalConfig.design.accentColor,
                                color: '#ffffff',
                                fontWeight: 700,
                                fontSize: '13px',
                                padding: '10px 22px',
                                borderRadius: 'var(--radius-full)',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                            >
                              {portalConfig.hero.primaryButtonText} →
                            </button>

                            <button
                              style={{
                                backgroundColor: 'transparent',
                                border: '1.5px solid var(--color-text-primary)',
                                color: 'var(--color-text-primary)',
                                fontWeight: 700,
                                fontSize: '13px',
                                padding: '10px 22px',
                                borderRadius: 'var(--radius-full)',
                                cursor: 'pointer',
                              }}
                            >
                              {portalConfig.hero.secondaryButtonText}
                            </button>
                          </div>
                        </div>

                        {/* Hero Artwork Graphic Box */}
                        <div
                          style={{
                            width: previewDevice === 'mobile' ? '100%' : '320px',
                            height: previewDevice === 'mobile' ? '180px' : '220px',
                            borderRadius: 'var(--radius-lg)',
                            backgroundColor: 'rgba(59, 64, 184, 0.12)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-text-secondary)',
                            fontSize: '12px',
                            lineHeight: '18px',
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            flexShrink: 0,
                          }}
                        >
                          HERO IMAGE
                        </div>
                      </div>
                    );
                  }

                  // 2. MENTOR SECTION (Canvas with Lavender surface box)
                  if (sectionId === 'mentor') {
                    return (
                      <div
                        key="mentor"
                        style={{
                          padding: previewDevice === 'mobile' ? '36px 20px' : '52px 40px',
                          backgroundColor: 'var(--color-canvas)',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: previewDevice === 'mobile' ? 'column' : 'row',
                            gap: '32px',
                            alignItems: 'center',
                          }}
                        >
                          {/* Mentor Photo Box */}
                          <div
                            style={{
                              width: previewDevice === 'mobile' ? '100%' : '220px',
                              height: '220px',
                              borderRadius: 'var(--radius-lg)',
                              backgroundColor: 'var(--color-surface-lavender)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--color-link)',
                              fontSize: '12px',
                              lineHeight: '18px',
                              fontWeight: 600,
                              letterSpacing: '0.04em',
                              flexShrink: 0,
                            }}
                          >
                            MENTOR PHOTO
                          </div>

                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '12px', lineHeight: '18px', fontWeight: 700, color: 'var(--color-link)', letterSpacing: '0.04em', marginBottom: '6px', textTransform: 'uppercase' }}>
                              YOUR MENTOR
                            </div>
                            <h3 style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                              {portalConfig.mentor.mentorName}
                            </h3>
                            <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', marginBottom: '14px', fontVariantNumeric: 'tabular-nums' }}>
                              {portalConfig.mentor.role} · 10 years in industry
                            </div>
                            <p style={{ fontSize: '14px', lineHeight: '22px', color: 'var(--color-text-body)', marginBottom: '20px', fontWeight: 500 }}>
                              {portalConfig.mentor.bio}
                            </p>
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  backgroundColor: 'var(--color-bg-subtle)',
                                  padding: '5px 12px',
                                  borderRadius: 'var(--radius-full)',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  color: 'var(--color-text-primary)',
                                  fontVariantNumeric: 'tabular-nums',
                                }}
                              >
                                <Award size={14} strokeWidth={1.75} />
                                {portalConfig.mentor.highlight1}
                              </span>
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  backgroundColor: 'var(--color-bg-subtle)',
                                  padding: '5px 12px',
                                  borderRadius: 'var(--radius-full)',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  color: 'var(--color-text-primary)',
                                  fontVariantNumeric: 'tabular-nums',
                                }}
                              >
                                <Users size={14} strokeWidth={1.75} />
                                {portalConfig.mentor.highlight2}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // 3. COURSES SECTION (Popular courses cards matching PDF Page 3)
                  if (sectionId === 'courses') {
                    const featured = courses.filter(c => portalConfig.courses.featuredCourseIds.includes(c.id)).slice(0, 3);
                    return (
                      <div
                        key="courses"
                        style={{
                          padding: previewDevice === 'mobile' ? '36px 20px' : '52px 40px',
                          backgroundColor: 'var(--color-canvas)',
                          borderTop: '1px solid var(--color-divider)',
                        }}
                      >
                        <h3 style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                          {portalConfig.courses.sectionHeading}
                        </h3>
                        <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', marginBottom: '28px', fontWeight: 500 }}>
                          {portalConfig.courses.subheading}
                        </p>

                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: previewDevice === 'mobile' ? '1fr' : 'repeat(3, 1fr)',
                            gap: '20px',
                          }}
                        >
                          {featured.map((course, idx) => {
                            const IconComp = courseIcons[idx % courseIcons.length];
                            const bannerBg = courseBanners[idx % courseBanners.length];
                            return (
                              <div
                                key={course.id}
                                style={{
                                  borderRadius: 'var(--radius-lg)',
                                  backgroundColor: 'var(--color-canvas)',
                                  border: '1px solid var(--color-border)',
                                  overflow: 'hidden',
                                  display: 'flex',
                                  flexDirection: 'column',
                                }}
                              >
                                {/* Top Pastel Banner with floating icon */}
                                <div
                                  style={{
                                    height: '110px',
                                    backgroundColor: bannerBg,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--color-text-primary)',
                                  }}
                                >
                                  <IconComp size={28} strokeWidth={1.75} />
                                </div>

                                {/* Card Content */}
                                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                                  <div>
                                    <div style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                                      {course.title}
                                    </div>
                                    <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', marginBottom: '16px', fontVariantNumeric: 'tabular-nums' }}>
                                      {course.lessonsCount} lessons · {course.level || 'Beginner'}
                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--color-divider)' }}>
                                    <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                                      {course.isFree ? 'Free' : `$${course.price}`}
                                    </span>
                                    <span style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-link)', fontWeight: 700, cursor: 'pointer' }}>
                                      View course →
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  // 4. TESTIMONIALS SECTION (Lime surface #EEF3D8)
                  if (sectionId === 'testimonials') {
                    return (
                      <div
                        key="testimonials"
                        style={{
                          padding: previewDevice === 'mobile' ? '36px 20px' : '52px 40px',
                          backgroundColor: 'var(--color-surface-lime)',
                        }}
                      >
                        <h3 style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '28px' }}>
                          {portalConfig.testimonials.sectionHeading}
                        </h3>

                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: previewDevice === 'mobile' ? '1fr' : 'repeat(3, 1fr)',
                            gap: '20px',
                          }}
                        >
                          {portalConfig.testimonials.items.map((t, idx) => {
                            const avatar = testimonialAvatars[idx % testimonialAvatars.length];
                            return (
                              <div
                                key={t.id}
                                style={{
                                  padding: '24px',
                                  borderRadius: 'var(--radius-lg)',
                                  backgroundColor: 'var(--color-canvas)',
                                  border: '1px solid var(--color-border)',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'space-between',
                                  minHeight: '170px',
                                }}
                              >
                                <div>
                                  <div
                                    style={{
                                      fontSize: '28px',
                                      lineHeight: 1,
                                      fontFamily: 'Georgia, serif',
                                      fontWeight: 800,
                                      color: 'var(--color-text-primary)',
                                      marginBottom: '12px',
                                    }}
                                  >
                                    “
                                  </div>
                                  <p style={{ fontSize: '13px', color: 'var(--color-text-primary)', lineHeight: 1.5, marginBottom: '20px' }}>
                                    {t.quote}
                                  </p>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div
                                    style={{
                                      width: '28px',
                                      height: '28px',
                                      borderRadius: 'var(--radius-full)',
                                      backgroundColor: avatar.bg,
                                      color: avatar.color,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '12px',
                                      fontWeight: 700,
                                    }}
                                  >
                                    {avatar.initials}
                                  </div>
                                  <div>
                                    <div style={{ fontSize: '12px', lineHeight: '18px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{t.learner}</div>
                                    <div style={{ fontSize: '12px', lineHeight: '18px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>{t.course}</div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  // 5. FOOTER SECTION (Rich dark #14151A)
                  if (sectionId === 'footer') {
                    return (
                      <div key="footer" style={{ padding: '48px 40px 32px', backgroundColor: 'var(--color-text-primary)', color: '#ffffff', marginTop: 'auto' }}>
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: previewDevice === 'mobile' ? '1fr' : '2fr 1fr 1.5fr',
                            gap: '32px',
                            paddingBottom: '36px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              <div
                                style={{
                                  width: '22px',
                                  height: '22px',
                                  borderRadius: '6px',
                                  backgroundColor: portalConfig.design.accentColor,
                                  color: '#ffffff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <GraduationCap size={13} strokeWidth={1.75} />
                              </div>
                              <span style={{ fontWeight: 700, fontSize: '15px', color: '#ffffff' }}>
                                {portalConfig.footer.orgName}
                              </span>
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--color-text-disabled)', lineHeight: 1.5 }}>
                              {portalConfig.footer.tagline}
                            </p>
                          </div>

                          <div>
                            <div style={{ fontSize: '12px', lineHeight: '18px', fontWeight: 700, color: 'var(--color-text-disabled)', letterSpacing: '0.04em', marginBottom: '12px', textTransform: 'uppercase' }}>
                              Explore
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', lineHeight: '18px', color: '#ededf0' }}>
                              <span style={{ cursor: 'pointer' }}>Courses</span>
                              <span style={{ cursor: 'pointer' }}>Mentor</span>
                              <span style={{ cursor: 'pointer' }}>Stories</span>
                            </div>
                          </div>

                          <div>
                            <div style={{ fontSize: '12px', lineHeight: '18px', fontWeight: 700, color: 'var(--color-text-disabled)', letterSpacing: '0.04em', marginBottom: '12px', textTransform: 'uppercase' }}>
                              Contact
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#ededf0' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Mail size={13} strokeWidth={1.75} color="#8a8d97" />
                                <span>{portalConfig.footer.contactEmail}</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <AtSign size={13} strokeWidth={1.75} color="#8a8d97" />
                                <span>{portalConfig.footer.socialHandle}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div style={{ paddingTop: '24px', fontSize: '12px', color: 'var(--color-text-muted)', fontVariantNumeric: 'tabular-nums' }}>
                          {portalConfig.footer.copyrightLine}
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
