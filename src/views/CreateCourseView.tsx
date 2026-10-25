import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft,
  Upload,
  Image as ImageIcon,
  Info,
  Gift,
  Wallet,
  CheckCircle2,
  CircleDashed,
  Eye,
  ArrowRight,
  AlertTriangle,
  X,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Course } from '../types';

export const CreateCourseView: React.FC = () => {
  const navigate = useNavigate();
  const { createCourse, showToast, setIsCoursePreviewOpen, setTargetCourseForAction } = useApp();

  // Form State
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [pricingType, setPricingType] = useState<'free' | 'paid'>('free');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');

  // Confirmation Modal
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDirty =
    title.trim() !== '' ||
    shortDescription.trim() !== '' ||
    thumbnailUrl !== '' ||
    (pricingType === 'paid' && price.trim() !== '');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!slugEdited) {
      const autoSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(autoSlug);
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugEdited(true);
    setSlug(
      e.target.value
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '')
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Image size exceeds 2 MB limit');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setThumbnailUrl(event.target.result as string);
          showToast('Thumbnail uploaded successfully');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowLeaveModal(true);
    } else {
      navigate('/admin/courses');
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      showToast('Course title is required');
      return;
    }

    const numPrice = pricingType === 'free' ? 0 : parseFloat(price) || 0;
    const numDiscount = discountPrice ? parseFloat(discountPrice) || undefined : undefined;

    const newCourse = createCourse(title.trim(), pricingType === 'free', numPrice, {
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      shortDescription: shortDescription.trim() || undefined,
      thumbnailUrl: thumbnailUrl || undefined,
      level,
      originalPrice: numDiscount,
    });

    navigate(`/admin/course/${newCourse.id}`);
  };

  const handleSaveAndLeave = () => {
    setShowLeaveModal(false);
    if (title.trim()) {
      const numPrice = pricingType === 'free' ? 0 : parseFloat(price) || 0;
      createCourse(title.trim(), pricingType === 'free', numPrice, {
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        shortDescription: shortDescription.trim() || undefined,
        thumbnailUrl: thumbnailUrl || undefined,
        level,
      });
    }
    navigate('/admin/courses');
  };

  const handleOpenPreview = () => {
    const dummyCourse: Course = {
      id: 'preview-draft',
      title: title.trim() || 'Untitled course',
      slug: slug || 'untitled-course',
      shortDescription: shortDescription.trim() || 'Your short description appears here.',
      status: 'Draft',
      modulesCount: 0,
      lessonsCount: 0,
      learnersCount: 0,
      price: pricingType === 'free' ? 0 : parseFloat(price) || 0,
      isFree: pricingType === 'free',
      bannerTheme: 'purple',
      bannerIcon: 'book',
      thumbnailUrl: thumbnailUrl || undefined,
      level,
      modules: [],
      learners: [],
      liveSessions: []
    };
    setTargetCourseForAction(dummyCourse);
    setIsCoursePreviewOpen(true);
  };

  return (
    <div className="fade-in page-container" style={{ maxWidth: '1240px', paddingBottom: '80px' }}>
      {/* Top Breadcrumb & Back Arrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
        <button
          type="button"
          onClick={handleCancel}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-default, #ECECEF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary, #5B5E69)',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease',
          }}
          title="Back to courses"
        >
          <ChevronLeft size={16} strokeWidth={2} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', lineHeight: '18px', fontWeight: 500, color: 'var(--text-muted, #70737E)' }}>
          <Link
            to="/admin/courses"
            onClick={(e) => {
              if (isDirty) {
                e.preventDefault();
                setShowLeaveModal(true);
              }
            }}
            style={{ color: 'var(--text-secondary, #5B5E69)', textDecoration: 'none' }}
          >
            Courses
          </Link>
          <span>›</span>
          <span style={{ color: 'var(--text-primary, #14151A)', fontWeight: 700 }}>
            Create course
          </span>
        </div>
      </div>

      {/* Page Title & Subtitle */}
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: '28px',
            lineHeight: '36px',
            fontWeight: 700,
            color: 'var(--text-primary, #14151A)',
            letterSpacing: '-0.02em',
            margin: '0 0 6px 0',
          }}
        >
          Create course
        </h1>
        <p
          style={{
            fontSize: '14px',
            lineHeight: '22px',
            fontWeight: 500,
            color: 'var(--text-secondary, #5B5E69)',
            margin: 0,
          }}
        >
          Start with the basics. You&apos;ll add modules and lessons next, inside the course.
        </p>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div
        className="course-workspace-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.8fr) 340px',
          gap: '32px',
          alignItems: 'start',
        }}
      >
        {/* LEFT COLUMN: Form Cards */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* CARD 1: Basics */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid var(--border-default, #ECECEF)',
              padding: '28px 32px',
            }}
          >
            <h2 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 700, color: 'var(--text-primary, #14151A)', margin: '0 0 4px 0' }}>
              Basics
            </h2>
            <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--text-secondary, #5B5E69)', fontWeight: 500, margin: '0 0 24px 0' }}>
              What learners see first. Fields marked * are required.
            </p>

            {/* Course Title */}
            <div style={{ marginBottom: '22px' }}>
              <label className="form-label">
                Course title <span style={{ color: 'var(--action-danger, #C23030)' }}>*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. Introduction to Data Analysis"
                className="form-input"
                style={{ height: '46px', borderRadius: '12px' }}
                autoFocus
              />
              <div style={{ fontSize: '12px', lineHeight: '18px', color: 'var(--text-muted, #70737E)', marginTop: '6px', fontWeight: 500 }}>
                Required to save a draft.
              </div>
            </div>

            {/* Short Description */}
            <div style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label className="form-label" style={{ margin: 0 }}>
                  Short description <span style={{ color: 'var(--action-danger, #C23030)' }}>*</span>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted, #70737E)', marginLeft: '6px' }}>
                    · required to publish
                  </span>
                </label>
                <span style={{ fontSize: '12px', color: shortDescription.length >= 160 ? 'var(--action-danger, #C23030)' : 'var(--text-muted, #70737E)', fontWeight: 600 }}>
                  {shortDescription.length}/160
                </span>
              </div>
              <textarea
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value.slice(0, 160))}
                placeholder="What will learners be able to do after this course?"
                rows={3}
                className="form-input"
                style={{ height: '90px', padding: '12px 16px', borderRadius: '12px', resize: 'none', lineHeight: '22px' }}
              />
            </div>

            {/* Thumbnail Box */}
            <div>
              <label className="form-label" style={{ marginBottom: '8px' }}>
                Thumbnail <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted, #70737E)' }}>· optional</span>
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                {/* Thumbnail Preview Box */}
                <div
                  style={{
                    width: '120px',
                    height: '80px',
                    borderRadius: '12px',
                    border: '1.5px dashed var(--border-default, #D9DADF)',
                    backgroundColor: 'var(--bg-muted, #F8F8FA)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                    flexShrink: 0,
                  }}
                >
                  {thumbnailUrl ? (
                    <>
                      <img src={thumbnailUrl} alt="Thumbnail preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button
                        type="button"
                        onClick={() => setThumbnailUrl('')}
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(20, 21, 26, 0.75)',
                          color: '#ffffff',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                        title="Remove thumbnail"
                      >
                        <X size={12} />
                      </button>
                    </>
                  ) : (
                    <ImageIcon size={24} color="#70737E" strokeWidth={1.5} />
                  )}
                </div>

                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/png,image/jpeg,image/webp"
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-secondary btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '38px', borderRadius: '10px' }}
                  >
                    <Upload size={14} strokeWidth={1.75} />
                    Upload image
                  </button>
                  <div style={{ fontSize: '12px', lineHeight: '18px', color: 'var(--text-muted, #70737E)', marginTop: '8px', fontWeight: 500 }}>
                    PNG or JPG, landscape, up to 2 MB.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: Course URL */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid var(--border-default, #ECECEF)',
              padding: '28px 32px',
            }}
          >
            <h2 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 700, color: 'var(--text-primary, #14151A)', margin: '0 0 4px 0' }}>
              Course URL
            </h2>
            <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--text-secondary, #5B5E69)', fontWeight: 500, margin: '0 0 20px 0' }}>
              The address learners use to open this course.
            </p>

            <div>
              <label className="form-label">URL slug</label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'stretch',
                  borderRadius: '12px',
                  border: '1px solid var(--border-default, #ECECEF)',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'var(--bg-muted, #F6F6F8)',
                    padding: '0 14px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '13px',
                    color: 'var(--text-secondary, #5B5E69)',
                    fontWeight: 500,
                    borderRight: '1px solid var(--border-default, #ECECEF)',
                    whiteSpace: 'nowrap',
                    userSelect: 'none',
                  }}
                >
                  learn.ziqxskills.example/courses/
                </div>
                <input
                  type="text"
                  value={slug}
                  onChange={handleSlugChange}
                  placeholder="your-course-title"
                  style={{
                    flex: 1,
                    height: '46px',
                    border: 'none',
                    outline: 'none',
                    padding: '0 14px',
                    fontSize: '14px',
                    color: 'var(--text-primary, #14151A)',
                    fontWeight: 500,
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', lineHeight: '18px', color: 'var(--text-muted, #70737E)', marginTop: '8px', fontWeight: 500 }}>
                <Info size={14} color="#70737E" strokeWidth={1.75} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  Created from your title. Use letters, numbers and hyphens. Changing it after you publish breaks links you have already shared.
                </span>
              </div>
            </div>
          </div>

          {/* CARD 3: Level */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid var(--border-default, #ECECEF)',
              padding: '28px 32px',
            }}
          >
            <h2 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 700, color: 'var(--text-primary, #14151A)', margin: '0 0 4px 0' }}>
              Level
            </h2>
            <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--text-secondary, #5B5E69)', fontWeight: 500, margin: '0 0 20px 0' }}>
              Helps learners choose the right course. Optional.
            </p>

            <div
              style={{
                display: 'inline-flex',
                backgroundColor: 'var(--bg-muted, #F6F6F8)',
                padding: '4px',
                borderRadius: '12px',
                border: '1px solid var(--border-divider, #ECECEF)',
              }}
            >
              {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => {
                const isSelected = level === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setLevel(lvl)}
                    style={{
                      padding: '8px 20px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                      color: isSelected ? 'var(--text-primary, #14151A)' : 'var(--text-secondary, #5B5E69)',
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: '13px',
                      lineHeight: '18px',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CARD 4: Pricing */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid var(--border-default, #ECECEF)',
              padding: '28px 32px',
            }}
          >
            <h2 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 700, color: 'var(--text-primary, #14151A)', margin: '0 0 4px 0' }}>
              Pricing
            </h2>
            <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--text-secondary, #5B5E69)', fontWeight: 500, margin: '0 0 20px 0' }}>
              Set a one-time price, or make it free for anyone with an account.
            </p>

            {/* Free vs Paid Toggle */}
            <div
              style={{
                display: 'inline-flex',
                backgroundColor: 'var(--bg-muted, #F6F6F8)',
                padding: '4px',
                borderRadius: '12px',
                border: '1px solid var(--border-divider, #ECECEF)',
                marginBottom: pricingType === 'paid' ? '22px' : '0',
              }}
            >
              <button
                type="button"
                onClick={() => setPricingType('free')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: pricingType === 'free' ? '#FFFFFF' : 'transparent',
                  color: pricingType === 'free' ? 'var(--text-primary, #14151A)' : 'var(--text-secondary, #5B5E69)',
                  fontWeight: pricingType === 'free' ? 700 : 500,
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: pricingType === 'free' ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none',
                }}
              >
                <Gift size={15} strokeWidth={1.75} />
                <span>Free</span>
              </button>

              <button
                type="button"
                onClick={() => setPricingType('paid')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: pricingType === 'paid' ? '#FFFFFF' : 'transparent',
                  color: pricingType === 'paid' ? 'var(--text-primary, #14151A)' : 'var(--text-secondary, #5B5E69)',
                  fontWeight: pricingType === 'paid' ? 700 : 500,
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: pricingType === 'paid' ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none',
                }}
              >
                <Wallet size={15} strokeWidth={1.75} />
                <span>Paid</span>
              </button>
            </div>

            {/* Paid Inputs */}
            {pricingType === 'paid' && (
              <div
                className="settings-two-col"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                }}
              >
                <div>
                  <label className="form-label">
                    Price (USD) <span style={{ color: 'var(--action-danger, #C23030)' }}>*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="form-input"
                    style={{ height: '46px', borderRadius: '12px' }}
                  />
                </div>

                <div>
                  <label className="form-label">
                    Discount price <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted, #70737E)' }}>· optional</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    placeholder="Leave blank for no discount"
                    className="form-input"
                    style={{ height: '46px', borderRadius: '12px' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* BOTTOM ACTIONS BAR */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '16px',
              paddingTop: '8px',
            }}
          >
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: '10px 18px',
                border: 'none',
                background: 'transparent',
                color: 'var(--text-secondary, #5B5E69)',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                borderRadius: '10px',
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!title.trim()}
              style={{
                height: '44px',
                padding: '0 22px',
                borderRadius: '12px',
                backgroundColor: title.trim() ? '#14151A' : 'var(--bg-disabled, #EDEDF0)',
                color: title.trim() ? '#FFFFFF' : 'var(--text-disabled, #A2A4AE)',
                fontWeight: 700,
                fontSize: '14px',
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: title.trim() ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.15s ease',
              }}
            >
              <ArrowRight size={16} strokeWidth={2} />
              <span>Create course</span>
            </button>
          </div>
        </form>

        {/* RIGHT COLUMN: Sticky Sidebar Cards */}
        <div style={{ position: 'sticky', top: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Card 1: What happens next */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid var(--border-default, #ECECEF)',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--text-primary, #14151A)', margin: '0 0 16px 0' }}>
              What happens next
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Step 1 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <CheckCircle2 size={18} strokeWidth={2.2} color="#14151A" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: '#14151A' }}>
                    Create the course
                  </div>
                  <div style={{ fontSize: '13px', lineHeight: '18px', color: '#5B5E69', fontWeight: 500, marginTop: '2px' }}>
                    Saved as a draft. Nothing is public yet.
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <CircleDashed size={18} strokeWidth={1.75} color="#70737E" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: '#14151A' }}>
                    Add modules and lessons
                  </div>
                  <div style={{ fontSize: '13px', lineHeight: '18px', color: '#5B5E69', fontWeight: 500, marginTop: '2px' }}>
                    Open the course and build the content there.
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <CircleDashed size={18} strokeWidth={1.75} color="#70737E" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: '#14151A' }}>
                    Publish when ready
                  </div>
                  <div style={{ fontSize: '13px', lineHeight: '18px', color: '#5B5E69', fontWeight: 500, marginTop: '2px' }}>
                    Check the list, then go live in the catalogue.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Learner preview */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid var(--border-default, #ECECEF)',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--text-primary, #14151A)', margin: '0 0 16px 0' }}>
              Learner preview
            </h3>

            {/* Mini Course Card Mockup */}
            <div
              style={{
                borderRadius: '16px',
                border: '1px solid var(--border-default, #ECECEF)',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
              }}
            >
              {/* Banner Top */}
              <div
                style={{
                  height: '130px',
                  backgroundColor: '#E8E8FA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {thumbnailUrl ? (
                  <img src={thumbnailUrl} alt="Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <BookOpen size={28} color="#14151A" strokeWidth={1.5} />
                )}
              </div>

              {/* Body */}
              <div style={{ padding: '16px' }}>
                <div
                  style={{
                    fontSize: '15px',
                    lineHeight: '22px',
                    fontWeight: 700,
                    color: '#14151A',
                    marginBottom: '4px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {title.trim() || 'Untitled course'}
                </div>

                <div
                  style={{
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#5B5E69',
                    fontWeight: 500,
                    marginBottom: '14px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    minHeight: '36px',
                  }}
                >
                  {shortDescription.trim() || 'Your short description appears here.'}
                </div>

                <div
                  style={{
                    paddingTop: '12px',
                    borderTop: '1px solid var(--border-divider, #ECECEF)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#5B5E69' }}>
                    Daniel Mensah
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#14151A' }}>
                    {pricingType === 'free' ? 'Free' : (price ? `$${price}` : '$0.00')}
                  </span>
                </div>
              </div>
            </div>

            {/* Open Full Preview Button */}
            <button
              type="button"
              onClick={handleOpenPreview}
              className="btn-secondary"
              style={{
                width: '100%',
                height: '42px',
                borderRadius: '12px',
                marginTop: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: 700,
              }}
            >
              <Eye size={15} strokeWidth={1.75} />
              <span>Open full preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal: "Leave without saving?" */}
      {showLeaveModal && (
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
        >
          <div
            className="pop-in modal-dialog"
            style={{
              maxWidth: '440px',
              padding: '28px',
              borderRadius: '20px',
              backgroundColor: '#FFFFFF',
              boxShadow: 'var(--shadow-modal, 0 16px 40px rgba(0,0,0,0.12))',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#FEF3C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <AlertTriangle size={22} color="#D97706" strokeWidth={2} />
            </div>

            <h3 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 700, color: '#14151A', margin: '0 0 8px 0' }}>
              Leave without saving?
            </h3>
            <p style={{ fontSize: '14px', lineHeight: '20px', color: '#5B5E69', fontWeight: 500, margin: '0 0 24px 0' }}>
              You have unsaved changes to this course. If you leave now, they will be lost.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setShowLeaveModal(false)}
                className="btn-secondary btn-sm"
              >
                Keep editing
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLeaveModal(false);
                  navigate('/admin/courses');
                }}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#C23030',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Leave without saving
              </button>
              <button
                type="button"
                onClick={handleSaveAndLeave}
                className="btn-primary btn-sm"
              >
                Save & leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
