/**
 * Global properties
 */
export const global = {
  /**
   * Colors for SVG paths (regions)
   */
  colors: {
    default: '#f2f2f2',
    hover: '#bcbcbc',
    active: '#cdefab',
    incorrect: '#808080',
    close: '#dede10',
    correct: '#10d010',
  },
  /**
   * SVG paths that should not be activated
   */
  staticPathNames: [
    'Water',
    'Coastal Marin',
    'Outer Territory',
  ],
  /**
   * Number of allowed guesses
   */
  allowedGuesses: 5,
};