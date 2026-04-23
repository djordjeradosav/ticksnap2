/**
 * Ticksnap Design System Colors
 * Dark-themed trading app with yellow (#F5C518) accent
 */

export const COLORS = {
  // Backgrounds
  background: '#000000',
  surface: '#111111',
  card: '#1A1A1A',
  
  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#888888',
  
  // Accent
  accent: '#F5C518',  // Yellow
  
  // Status
  success: '#00C087',  // Green (profit)
  danger: '#FF4444',   // Red (loss)
  warning: '#FBBF24',  // Amber
  
  // Borders & Dividers
  border: '#2A2A2A',
  divider: '#1A1A1A',
  
  // Semantic
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
} as const;

export type ColorKey = keyof typeof COLORS;
