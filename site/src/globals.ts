/**
 * Global properties
 */
export default {
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
    'Marin County',
  ],
  /**
   * The guesses made by the player for this game
   */
  guesses: [],
};