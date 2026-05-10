/**
 * ShapR — constants/theme.ts
 * Colors, spacing, radius, and shadows matched 1-to-1 from the web CSS.
 */

import '@/global.css';
import { Platform } from 'react-native';

// ─────────────────────────────────────────────
//  COLORS  (used by useTheme() hook — OS scheme)
// ─────────────────────────────────────────────
export const Colors = {
  light: {
    // Surfaces
    text:                '#111827',   // .text primary
    background:          '#f0edf8',   // .app-shell bg
    backgroundElement:   '#ffffff',   // cards, panels, sidebar
    backgroundSelected:  '#f5f3ff',   // nav item hover bg
    textSecondary:       '#6b7280',   // muted text

    // Primary
    primary:             '#7C5BD6',   // nav active, buttons, toggles
    primaryLight:        '#ede9fe',   // icon backgrounds, badge bg
    primaryMid:          '#c4b5fd',   // avatar border, hover accents
    primaryDark:         '#5b3db0',   // button hover

    // Auth brand (login/signup only)
    brand:               '#6a0dad',
    brandHover:          '#560a91',

    // Borders
    border:              '#f3f0fb',   // sidebar, topbar bottom
    borderCard:          'rgba(0,0,0,0.08)',
    borderInput:         '#e5e7eb',
    borderProfile:       '#e8e2f5',
    borderHistory:       '#ece2f9',

    // Status
    pillOkBg:            '#d8ffe3',
    pillOkText:          '#0b7a33',
    pillWarnBg:          '#ffe7d4',
    pillWarnText:        '#b94b10',
    productive:          '#2FA84F',
    productiveBg:        '#e6f4ea',
    unproductive:        '#F07A1A',
    unproductiveBg:      '#fce8d5',

    // Danger
    danger:              '#EF4444',
    dangerBg:            '#fff1f1',

    // Tips
    tipsGoodBg:          '#e8fff0',
    tipsBadBg:           '#fff1e6',
  },
  dark: {
    // Surfaces
    text:                '#e0e0f0',
    background:          '#0f0f1a',
    backgroundElement:   '#1e1e35',
    backgroundSelected:  '#1e1e38',
    textSecondary:       '#8b8fb8',

    // Primary (unchanged in dark)
    primary:             '#7C5BD6',
    primaryLight:        'rgba(124,91,214,0.20)',
    primaryMid:          '#c4b5fd',
    primaryDark:         '#5b3db0',

    // Auth brand night
    brand:               '#a78bfa',
    brandHover:          '#6B4BC0',

    // Borders
    border:              '#2a2a45',
    borderCard:          '#2a2a45',
    borderInput:         '#3a3a5c',
    borderProfile:       '#2e2b45',
    borderHistory:       '#2a2a45',

    // Status (unchanged)
    pillOkBg:            '#d8ffe3',
    pillOkText:          '#0b7a33',
    pillWarnBg:          '#ffe7d4',
    pillWarnText:        '#b94b10',
    productive:          '#2FA84F',
    productiveBg:        '#e6f4ea',
    unproductive:        '#F07A1A',
    unproductiveBg:      '#fce8d5',

    // Danger
    danger:              '#f87171',
    dangerBg:            '#2a1f1f',

    // Tips (unchanged)
    tipsGoodBg:          '#e8fff0',
    tipsBadBg:           '#fff1e6',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

// ─────────────────────────────────────────────
//  FONTS
// ─────────────────────────────────────────────
export const Fonts = Platform.select({
  ios: {
    sans:    'system-ui',   // maps to Inter on iOS
    serif:   'ui-serif',
    rounded: 'ui-rounded',
    mono:    'ui-monospace',
  },
  default: {
    sans:    'normal',
    serif:   'serif',
    rounded: 'normal',
    mono:    'monospace',
  },
  web: {
    sans:    'Inter, var(--font-display)',
    serif:   'var(--font-serif)',
    rounded: 'ui-rounded',
    mono:    'var(--font-mono)',
  },
});

// ─────────────────────────────────────────────
//  SPACING  (mirrors CSS padding/margin values)
// ─────────────────────────────────────────────
export const Spacing = {
  half:  2,
  one:   4,
  two:   8,    // xs gaps
  three: 12,   // md padding (nav items)
  four:  16,   // lg — card padding, row gaps
  five:  20,   // topbar left/right padding starts
  six:   24,   // xxl — page sections
  seven: 28,   // xxxl — page horizontal padding
  eight: 32,   // page padding (profile)
  nine:  40,   // large section padding
  ten:   48,   // auth topbar
  page:  28,   // standard page horizontal (matches web 28px)
} as const;

// ─────────────────────────────────────────────
//  BORDER RADIUS  (from web CSS values)
// ─────────────────────────────────────────────
export const Radius = {
  xs:     6,    // dashboard panels (.panel border-radius: 6px)
  sm:     8,    // buttons, inputs (login border-radius: 12px → use lg)
  md:     10,   // nav items, search inputs
  lg:     12,   // pomodoro modal, finish btn
  xl:     16,   // history card, profile cards
  xxl:    18,   // pomodoro card
  card:   20,   // login card, history modal
  pill:   999,  // badge, pill status
} as const;

// ─────────────────────────────────────────────
//  FONT SIZES  (px values from web)
// ─────────────────────────────────────────────
export const FontSize = {
  xs:    10,
  sm:    11,
  base:  13,
  md:    14,
  lg:    16,
  xl:    18,
  xxl:   20,
  h3:    22,
  h2:    24,
  h1:    28,
  hero:  34,
  giant: 38,
  stat:  40,
  timer: 72,   // pomodoro timer display
} as const;

// ─────────────────────────────────────────────
//  FONT WEIGHTS
// ─────────────────────────────────────────────
export const FontWeight = {
  regular:   '400' as const,
  medium:    '500' as const,
  semibold:  '600' as const,
  bold:      '700' as const,
  extrabold: '800' as const,
  black:     '900' as const,
} as const;

// ─────────────────────────────────────────────
//  SHADOWS  (web box-shadow → RN shadow props)
// ─────────────────────────────────────────────
export const Shadows = {
  // Dashboard cards: box-shadow: 0 6px 12px rgba(0,0,0,0.18)
  card: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius:  12,
    elevation:     6,
  },
  // History card / profile: 0 1px 12px rgba(103,80,164,0.08)
  panel: {
    shadowColor:   '#6750A4',
    shadowOffset:  { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius:  12,
    elevation:     3,
  },
  // Login card: 0 10px 30px rgba(0,0,0,0.04)
  loginCard: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius:  30,
    elevation:     2,
  },
  // Pomodoro card: 0 10px 28px rgba(15,23,42,0.06)
  pomCard: {
    shadowColor:   '#0f172a',
    shadowOffset:  { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius:  28,
    elevation:     4,
  },
  // Primary button glow: 0 8px 20px rgba(124,91,214,0.35)
  primaryBtn: {
    shadowColor:   '#7C5BD6',
    shadowOffset:  { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius:  20,
    elevation:     8,
  },
  // Small button: 0 4px 14px rgba(124,91,214,0.30)
  btnSm: {
    shadowColor:   '#7C5BD6',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius:  14,
    elevation:     4,
  },
  // Dropdown / modal: 0 4px 16px rgba(0,0,0,0.10)
  dropdown: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius:  16,
    elevation:     5,
  },
  // Night mode cards: 0 4px 12px rgba(0,0,0,0.40)
  nightCard: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.40,
    shadowRadius:  12,
    elevation:     6,
  },
  // Session form inputs: 0 8px 18px rgba(30,20,60,0.10)
  input: {
    shadowColor:   '#1e143c',
    shadowOffset:  { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius:  18,
    elevation:     3,
  },
} as const;

// ─────────────────────────────────────────────
//  COMPONENT TOKENS  (quick-access per-component)
// ─────────────────────────────────────────────

/** Bottom tab bar (replaces web sidebar on mobile) */
export const NavTokens = {
  height:          60,
  activeBg:        '#7C5BD6',      // .nav-item.active background
  activeColor:     '#ffffff',
  inactiveColor:   '#6b7280',      // .nav-item color
  hoverBg:         '#f5f3ff',      // .nav-item:hover background
  hoverColor:      '#7C5BD6',
  borderTop:       '#f3f0fb',      // sidebar border-right (→ tab border-top)
  bg:              '#ffffff',
  nightBg:         '#16162a',
  nightBorderTop:  '#2a2a45',
  nightInactive:   '#9ca3b8',
  nightActiveBg:   '#7C5BD6',
} as const;

/** Topbar */
export const TopbarTokens = {
  height:        56,
  bg:            '#ffffff',
  borderBottom:  '#f3f0fb',
  brandColor:    '#7C5BD6',        // .nav-brand
  brandSize:     20,
  btnColor:      '#6b7280',
  avatarBorder:  '#e0d9f7',
  nightBg:       '#16162a',
  nightBorder:   '#2a2a45',
  nightBrand:    '#a78bfa',
} as const;

/** Dashboard prediction panel */
export const PredictTokens = {
  bg:          '#7c5bd6',
  headBg:      'rgba(0,0,0,0.12)',
  rowBg:       'rgba(255,255,255,0.14)',
  rowBorder:   'rgba(255,255,255,0.20)',
  tableHeaderColor:  '#4c1d95',
  tableHeaderBorder: '#6f3ee8',
  toggleBtnBg: '#4c1d95',
} as const;

/** Pomodoro timer */
export const PomodoroTokens = {
  tabsBg:        '#eef1f5',
  tabActive:     '#ffffff',
  tabActiveColor:'#7C5BD6',
  tabColor:      '#7e8ca4',
  trackColor:    '#edf0f5',
  progressColor: '#7C5BD6',
  labelColor:    '#98a2b6',
  statBoxBg:     '#f6f7fa',
  statLabelColor:'#8893a8',
  nightTabsBg:   '#16162a',
  nightTabActive:'#2a2a45',
  nightStatBox:  '#16162a',
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;