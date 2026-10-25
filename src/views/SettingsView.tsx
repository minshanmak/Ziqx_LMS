import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Globe,
  Clock,
  CheckCircle2,
  Image as ImageIcon,
  ImagePlus,
  ChevronDown,
  Bell,
  Plug,
  Video,
  CreditCard,
} from 'lucide-react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  'aria-label'?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, 'aria-label': ariaLabel }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      style={{
        width: '44px',
        height: '24px',
        borderRadius: '9999px',
        backgroundColor: checked ? 'var(--action-primary, #14151A)' : '#D9DADF',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        border: 'none',
        padding: 0,
        outline: 'none',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '2px',
          left: checked ? '22px' : '2px',
          width: '20px',
          height: '20px',
          borderRadius: '9999px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          transition: 'left 0.2s ease',
        }}
      />
    </button>
  );
};

export const SettingsView: React.FC = () => {
  const { settings, setSettings, showToast } = useApp();

  const [name, setName] = useState(settings.name);
  const [org, setOrg] = useState(settings.organization);
  const [email, setEmail] = useState(settings.supportEmail);
  const [timeZone, setTimeZone] = useState(settings.timeZone);
  const [customDomain, setCustomDomain] = useState(settings.customDomain);
  const [siteTitle, setSiteTitle] = useState(settings.siteTitle);
  const [metaDesc, setMetaDesc] = useState(settings.metaDescription);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(settings.isDomainVerified);
  const [indexSearchEngines, setIndexSearchEngines] = useState(settings.indexSearchEngines ?? true);
  const [emailEnrollmentConfirmation, setEmailEnrollmentConfirmation] = useState(settings.emailEnrollmentConfirmation ?? true);
  const [emailSessionReminders, setEmailSessionReminders] = useState(settings.emailSessionReminders ?? true);
  const [emailSessionChanges, setEmailSessionChanges] = useState(settings.emailSessionChanges ?? true);
  const [emailWeeklySummary, setEmailWeeklySummary] = useState(settings.emailWeeklySummary ?? false);

  const handleVerifyDomain = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      showToast(`Domain ${customDomain} verified successfully!`);
    }, 1000);
  };

  const handleSave = () => {
    setSettings({
      name,
      organization: org,
      supportEmail: email,
      timeZone,
      customDomain,
      isDomainVerified: isVerified,
      siteTitle,
      metaDescription: metaDesc,
      indexSearchEngines,
      emailEnrollmentConfirmation,
      emailSessionReminders,
      emailSessionChanges,
      emailWeeklySummary,
      googleMeetConnected: settings.googleMeetConnected ?? true,
      zoomConnected: settings.zoomConnected ?? false,
      paymentGatewayConnected: settings.paymentGatewayConnected ?? true,
    });
    showToast('Settings saved successfully');
  };

  return (
    <div
      className="fade-in page-container"
      style={{ paddingBottom: '64px' }}
    >
      {/* Top Header - spans the full width, Save changes button aligned on the far right */}
      <div
        className="page-header-row"
      >
        <h1
          style={{
            fontSize: '24px',
            lineHeight: '32px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          Settings
        </h1>

        <button
          onClick={handleSave}
          className="btn-primary"
        >
          Save changes
        </button>
      </div>

      {/* Settings Cards Container - strictly 780px wide matching crop_settings_1.png */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '780px' }}>
        {/* CARD 1: Profile & Organization */}
        <div
          style={{
            backgroundColor: 'var(--color-canvas)',
            borderRadius: '20px',
            border: '1px solid var(--border-divider, #ECECEF)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Lavender icon box matching Figma */}
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: 'var(--surface-lavender, #E8E8FA)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-primary, #14151A)',
                flexShrink: 0,
              }}
            >
              <User size={20} strokeWidth={1.75} />
            </div>
            <div>
              <h2 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '2px' }}>
                Profile and organization
              </h2>
              <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                Who learners see and how they reach you.
              </p>
            </div>
          </div>

          <div className="settings-two-col">
            <div>
              <label className="form-label">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">
                Organization
              </label>
              <input
                type="text"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">
                Support email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">
                Time zone
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="form-input"
                  style={{
                    appearance: 'none',
                    paddingRight: '36px',
                    cursor: 'pointer',
                  }}
                >
                  <option>GMT+1 · West Africa</option>
                  <option>UTC · London, Lisbon</option>
                  <option>EST · New York, Toronto</option>
                  <option>PST · San Francisco, Vancouver</option>
                  <option>IST · New Delhi, Mumbai</option>
                </select>
                <div
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: 'var(--text-secondary, #5B5E69)',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ChevronDown size={16} strokeWidth={1.75} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: Website & SEO */}
        <div
          style={{
            backgroundColor: 'var(--color-canvas)',
            borderRadius: '20px',
            border: '1px solid var(--border-divider, #ECECEF)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Sky blue icon box matching Figma */}
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: 'var(--surface-sky, #DCE7F9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-primary, #14151A)',
                flexShrink: 0,
              }}
            >
              <Globe size={20} strokeWidth={1.75} />
            </div>
            <div>
              <h2 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '2px' }}>
                Website and SEO
              </h2>
              <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                How your learner portal appears on the web and in search.
              </p>
            </div>
          </div>

          {/* Custom Domain Section */}
          <div>
            <label className="form-label">
              Custom domain
            </label>
            <input
              type="text"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="learn.yourdomain.com"
              className="form-input"
              style={{ marginBottom: '12px' }}
            />

            {/* Verification Instruction Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '2px',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', lineHeight: '18px' }}>
                {isVerified ? (
                  <CheckCircle2 size={16} color="var(--color-status-success-fg, #25703A)" strokeWidth={1.75} />
                ) : (
                  <Clock size={16} color="#8A5A0B" strokeWidth={1.75} />
                )}
                <span style={{ color: isVerified ? 'var(--color-status-success-fg, #25703A)' : '#8A5A0B', fontWeight: 500 }}>
                  {isVerified
                    ? 'CNAME verified and SSL certificate active.'
                    : 'Point a CNAME record to portal.ziqxskills.example, then verify.'}
                </span>
              </div>

              {!isVerified && (
                <button
                  onClick={handleVerifyDomain}
                  disabled={isVerifying}
                  className="btn-secondary btn-sm"
                  style={{
                    height: '36px',
                    padding: '0 16px',
                    borderRadius: '12px',
                    fontWeight: 700,
                  }}
                >
                  {isVerifying ? 'Checking DNS...' : 'Verify domain'}
                </button>
              )}
            </div>
          </div>

          {/* Site Title */}
          <div>
            <label className="form-label">
              Site title
            </label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="form-input"
            />
          </div>

          {/* Meta Description */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>
                Meta description
              </label>
              <span style={{ fontSize: '12px', lineHeight: '18px', color: 'var(--color-text-muted, #70737E)', fontWeight: 600 }}>
                {metaDesc.length} / 160
              </span>
            </div>
            <textarea
              rows={3}
              maxLength={160}
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              className="form-input"
              style={{
                height: '84px',
                resize: 'none',
                overflow: 'hidden',
                lineHeight: '22px',
                padding: '12px 14px',
              }}
            />
          </div>

          {/* Uploaders: Favicon & Social Share Image with icons */}
          <div className="settings-two-col">
            {/* Favicon */}
            <div
              style={{
                border: '1.5px dashed var(--color-border, #D9DADF)',
                borderRadius: '12px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--color-bg-muted, #F6F6F8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-secondary, #5B5E69)',
                    flexShrink: 0,
                  }}
                >
                  <ImagePlus size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Favicon
                  </div>
                  <div style={{ fontSize: '12px', lineHeight: '18px', color: 'var(--color-text-muted, #70737E)', fontWeight: 600 }}>
                    Square PNG or ICO, 32×32 or<br />larger
                  </div>
                </div>
              </div>

              <button
                onClick={() => showToast('Favicon file selector opened')}
                className="btn-secondary btn-sm"
                style={{
                  height: '36px',
                  padding: '0 14px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                Upload
              </button>
            </div>

            {/* Social Share Image */}
            <div
              style={{
                border: '1.5px dashed var(--color-border, #D9DADF)',
                borderRadius: '12px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--color-bg-muted, #F6F6F8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-secondary, #5B5E69)',
                    flexShrink: 0,
                  }}
                >
                  <ImageIcon size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Social share image
                  </div>
                  <div style={{ fontSize: '12px', lineHeight: '18px', color: 'var(--color-text-muted, #70737E)', fontWeight: 600 }}>
                    1200×630 for link previews
                  </div>
                </div>
              </div>

              <button
                onClick={() => showToast('Social banner file selector opened')}
                className="btn-secondary btn-sm"
                style={{
                  height: '36px',
                  padding: '0 14px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                Upload
              </button>
            </div>
          </div>

          {/* Let search engines index the portal */}
          <div
            style={{
              paddingTop: '20px',
              borderTop: '1px solid var(--border-divider, #ECECEF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Let search engines index the portal
              </div>
              <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500, marginTop: '2px' }}>
                Turn off to hide the site from Google and others.
              </div>
            </div>

            <ToggleSwitch
              checked={indexSearchEngines}
              onChange={setIndexSearchEngines}
              aria-label="Let search engines index the portal"
            />
          </div>
        </div>

        {/* CARD 3: Notifications */}
        <div
          style={{
            backgroundColor: 'var(--color-canvas)',
            borderRadius: '20px',
            border: '1px solid var(--border-divider, #ECECEF)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            {/* Lime icon box matching Figma */}
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: 'var(--surface-lime, #EEF3D8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-primary, #14151A)',
                flexShrink: 0,
              }}
            >
              <Bell size={20} strokeWidth={1.75} />
            </div>
            <div>
              <h2 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '2px' }}>
                Notifications
              </h2>
              <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                Emails Ziqx Skills sends for you.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Enrollment confirmation */}
            <div
              style={{
                padding: '16px 0',
                borderTop: '1px solid var(--border-divider, #ECECEF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Enrollment confirmation
                </div>
                <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500, marginTop: '2px' }}>
                  Email learners when they enroll.
                </div>
              </div>
              <ToggleSwitch
                checked={emailEnrollmentConfirmation}
                onChange={setEmailEnrollmentConfirmation}
                aria-label="Enrollment confirmation"
              />
            </div>

            {/* Session reminders */}
            <div
              style={{
                padding: '16px 0',
                borderTop: '1px solid var(--border-divider, #ECECEF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Session reminders
                </div>
                <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500, marginTop: '2px' }}>
                  Remind learners before a live session.
                </div>
              </div>
              <ToggleSwitch
                checked={emailSessionReminders}
                onChange={setEmailSessionReminders}
                aria-label="Session reminders"
              />
            </div>

            {/* Session changes */}
            <div
              style={{
                padding: '16px 0',
                borderTop: '1px solid var(--border-divider, #ECECEF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Session changes
                </div>
                <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500, marginTop: '2px' }}>
                  Notify learners if a session moves or is cancelled.
                </div>
              </div>
              <ToggleSwitch
                checked={emailSessionChanges}
                onChange={setEmailSessionChanges}
                aria-label="Session changes"
              />
            </div>

            {/* Weekly summary */}
            <div
              style={{
                padding: '16px 0 0 0',
                borderTop: '1px solid var(--border-divider, #ECECEF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Weekly summary
                </div>
                <div style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500, marginTop: '2px' }}>
                  Send yourself a weekly overview of enrollments
                </div>
              </div>
              <ToggleSwitch
                checked={emailWeeklySummary}
                onChange={setEmailWeeklySummary}
                aria-label="Weekly summary"
              />
            </div>
          </div>
        </div>

        {/* CARD 4: Integrations */}
        <div
          style={{
            backgroundColor: 'var(--color-canvas)',
            borderRadius: '20px',
            border: '1px solid var(--border-divider, #ECECEF)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            {/* Rose icon box matching Figma */}
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: 'var(--surface-rose, #F6DDE6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-primary, #14151A)',
                flexShrink: 0,
              }}
            >
              <Plug size={20} strokeWidth={1.75} />
            </div>
            <div>
              <h2 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '2px' }}>
                Integrations
              </h2>
              <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                Meeting providers and payments.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Google Meet */}
            <div
              style={{
                padding: '16px 0',
                borderTop: '1px solid var(--border-divider, #ECECEF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Video size={18} strokeWidth={1.75} color="var(--color-text-primary, #14151A)" />
                <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Google Meet
                </span>
              </div>
              <span
                style={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  fontWeight: 700,
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--status-success-bg, #E1F3E3)',
                  color: 'var(--status-success-fg, #25703A)',
                  letterSpacing: '-0.01em',
                }}
              >
                Connected via Google API
              </span>
            </div>

            {/* Zoom */}
            <div
              style={{
                padding: '16px 0',
                borderTop: '1px solid var(--border-divider, #ECECEF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Video size={18} strokeWidth={1.75} color="var(--color-text-primary, #14151A)" />
                <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Zoom
                </span>
              </div>
              <span
                style={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  fontWeight: 700,
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--status-neutral-bg, #EDEDF0)',
                  color: 'var(--status-neutral-fg, #4A4D57)',
                  letterSpacing: '-0.01em',
                }}
              >
                Not connected
              </span>
            </div>

            {/* Payment gateway */}
            <div
              style={{
                padding: '16px 0 0 0',
                borderTop: '1px solid var(--border-divider, #ECECEF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CreditCard size={18} strokeWidth={1.75} color="var(--color-text-primary, #14151A)" />
                <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Payment gateway
                </span>
              </div>
              <span
                style={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  fontWeight: 700,
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--status-success-bg, #E1F3E3)',
                  color: 'var(--status-success-fg, #25703A)',
                  letterSpacing: '-0.01em',
                }}
              >
                Connected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
