/**
 * Shared color language for the map pins, legend, and café detail screen —
 * matches the "Proposed direction" mockup from the first design exploration
 * (docs/design/first-exploration.md). Amber is a 3-step scale by surcharge
 * amount, not a single flat color, so a pin/price communicates roughly *how
 * much* extra, not just *that* there's a surcharge.
 */
export const MapColors = {
  green: '#1f8a53',
  greenBg: '#e7f5ec',
  amberLow: '#eab308',
  amberLowBg: '#fef3c7',
  amberMid: '#d97706',
  amberMidBg: '#fde7cc',
  amberHigh: '#92400e',
  amberHighBg: '#f3d9c9',
  gray: '#64748b',
  grayBg: '#eef1f5',
  outline: '#94a3b8',
} as const;
