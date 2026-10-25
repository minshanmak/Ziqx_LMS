/**
 * Centralized Design System Tokens extracted strictly from Trainly LMS – Design System.pdf
 * Font: Manrope | Icons: Lucide (1.75 stroke) | 4px base spacing
 */

export const colors = {
  bg: {
    canvas: '#FFFFFF',
    muted: '#F6F6F8',
    subtle: '#F4F4F7',
    panel: '#F8F8FA',
    disabled: '#EDEDF0',
  },
  text: {
    primary: '#14151A',
    body: '#3A3D47',
    secondary: '#5B5E69',
    muted: '#70737E',
    disabled: '#8A8D97',
    inverse: '#FFFFFF',
    link: '#3B40B8',
  },
  border: {
    default: '#D9DADF',
    divider: '#ECECEF',
    focus: '#6A63D8',
    danger: '#C23030',
    success: '#2E8B4A',
  },
  action: {
    primary: '#14151A',
    primaryText: '#FFFFFF',
    tonal: '#E8E8FA',
    danger: '#C23030',
  },
  icon: {
    default: '#14151A',
    secondary: '#5B5E69',
  },
  surface: {
    lavender: '#E8E8FA',
    sky: '#DCE7F9',
    lime: '#EEF3D8',
    corner: '#DADAF4',
  },
  status: {
    successBg: '#E1F3E3',
    successFg: '#25703A',
    warningBg: '#FCEFD2',
    warningFg: '#8A5A0B',
    dangerBg: '#FBE4E4',
    dangerFg: '#B42E2E',
    infoBg: '#E3E7FB',
    infoFg: '#3B40B8',
    neutralBg: '#EDEDF0',
    neutralFg: '#4A4D57',
  },
  avatar: {
    peach: '#F4C7A8',
    blue: '#BFD4F2',
    green: '#CBE2B0',
    purple: '#D9C7F0',
  },
} as const;

export const typography = {
  fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  display: {
    fontSize: '40px',
    lineHeight: '48px',
    fontWeight: 800,
  },
  pageTitle: {
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: 700,
  },
  stat: {
    fontSize: '28px',
    lineHeight: '32px',
    fontWeight: 700,
  },
  sectionTitle: {
    fontSize: '18px',
    lineHeight: '26px',
    fontWeight: 700,
  },
  cardTitle: {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 700,
  },
  heading3: {
    fontSize: '17px',
    lineHeight: '24px',
    fontWeight: 700,
  },
  body: {
    fontSize: '14px',
    lineHeight: '22px',
    fontWeight: 500,
  },
  label: {
    fontSize: '13px',
    lineHeight: '18px',
    fontWeight: 700,
  },
  caption: {
    fontSize: '12px',
    lineHeight: '18px',
    fontWeight: 600,
  },
  buttonLarge: {
    fontSize: '15px',
    lineHeight: '20px',
    fontWeight: 700,
  },
  buttonMedium: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 700,
  },
  buttonSmall: {
    fontSize: '13px',
    lineHeight: '18px',
    fontWeight: 700,
  },
} as const;

export const spacing = {
  space1: '4px',
  space2: '8px',
  space3: '12px',
  space4: '16px',
  space5: '20px',
  space6: '24px',
  space7: '32px',
  space8: '40px',
  space9: '48px',
  space10: '64px',
} as const;

export const radii = {
  sm: '8px',
  md: '12px',
  lg: '20px',
  xl: '32px',
  full: '9999px',
} as const;

export const elevation = {
  raised: '0 1px 3px rgba(20, 21, 26, 0.05), 0 1px 2px rgba(20, 21, 26, 0.03)',
  overlay: '0 4px 16px -2px rgba(20, 21, 26, 0.08), 0 2px 6px -1px rgba(20, 21, 26, 0.04)',
  modal: '0 20px 25px -5px rgba(20, 21, 26, 0.12), 0 10px 10px -5px rgba(20, 21, 26, 0.04)',
} as const;
