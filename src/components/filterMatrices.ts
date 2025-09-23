/**
 * Default identity matrix that doesn't modify colors
 */
export const DEFAULT_MATRIX = [
  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
];

/**
 * Redirects part of the red component to green and blue so that red
 * differences are translated into more perceptible channels.
 * Red is slightly attenuated, while red information migrates to green
 * and blue.
 */
export const PROTANOMALY_MATRIX = [
  0.9, 0.0, 0.0, 0, 0, 0.35, 1.0, 0.0, 0, 0, 0.1, 0.0, 1.0, 0, 0, 0.0, 0.0, 0.0,
  1, 0,
];

/**
 * Green information is shifted more towards red and blue.
 * This maintains the brightness balance and makes differences
 * between red and green clearer for those affected.
 */
export const DEUTERANOMALY_MATRIX = [
  1.0, 0.2, 0.0, 0, 0, 0.0, 0.75, 0.0, 0, 0, 0.0, 0.05, 1.0, 0, 0, 0.0, 0.0,
  0.0, 1, 0,
];

/**
 * Blue must be intensified and mixed with red/green so that differences
 * become clearer. Blue loses weight but is
 * supplemented with green. Red and green each contain an addition of
 * blue to make color differences more visible.
 */
export const TRITANOMALY_MATRIX = [
  1.0, 0.0, 0.1, 0, 0, 0.0, 1.0, 0.1, 0, 0, 0.0, 0.1, 0.8, 0, 0, 0.0, 0.0, 0.0,
  1, 0,
];

/**
 * Contrast between colors is increased while color saturation is
 * reduced.
 */
export const GRAYSCALE_MATRIX = [
  0.3, 0.59, 0.11, 0, 0, 0.3, 0.59, 0.11, 0, 0, 0.3, 0.59, 0.11, 0, 0, 0.0, 0.0,
  0.0, 1, 0,
];
