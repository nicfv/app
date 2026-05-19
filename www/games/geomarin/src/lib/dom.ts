import { global } from '../globals';
import { state } from '../state';
import { Canvas } from 'graphico';
import { Bar } from './bar';
import { solved } from './game';
import { close, correct } from './solution';

/**
 * Shorthand for document.getElementById.
 */
export function el(id: string): HTMLElement {
  return document.getElementById(id) as HTMLElement;
}
/**
 * Remove all children of an element.
 */
function removeChildren(parent: HTMLElement): void {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
/**
 * Hide an element by ID.
 */
function hideEl(id: string): void {
  el(id).style.display = 'none';
}
/**
 * Show an element by ID.
 */
function showEl(id: string): void {
  el(id).style.display = 'flex';
}
/**
 * Update the score display based on the current game state.
 */
function updateScore() {
  // Show statistics
  el('attempts').textContent = state.attempts.toString();
  el('win-rate').textContent = `${Math.round(state.solved.reduce((a, b) => a + b, 0) / state.attempts * 100)}%`;
  el('streak').textContent = state.streak.toString();
  el('max-streak').textContent = state.maxStreak.toString();
  // Create the bar graph for the score distribution
  removeChildren(el('distribution'));
  const distribution = new Canvas({
    parent: el('distribution'),
    width: 200,
    height: 100,
    background: 'black',
  });
  // Calculate bar heights and draw bar graph
  const maxBarHeight: number = state.solved.reduce((a, b) => Math.max(a, b), 1);
  for (let i = 1; i <= global.allowedGuesses; i++) {
    const color: string = (solved() && state.guesses.length === i) ? global.colors.correct : global.colors.incorrect;
    distribution.draw(new Bar(i.toString(), state.solved[i] ?? 0, maxBarHeight, i, 12, color));
  }
  // Reset share button text
  el('share').textContent = 'Share';
}
/**
 * Show the score distribution and stats.
 */
export function showScore() {
  showEl('score-bg');
  updateScore();
}

// Set the version and date in the footer
el('version').textContent = `v${global.version}`;
el('date').textContent = `Puzzle: ${new Date().toDateString()}`;

// Show and hide the intro message
el('show-help').addEventListener('click', () => showEl('intro-bg'));
el('intro').addEventListener('click', () => hideEl('intro-bg'));

// Show and hide the score message
el('show-score').addEventListener('click', () => showScore());
el('close-score').addEventListener('click', () => hideEl('score-bg'));

// Set share button behavior
el('share').addEventListener('click', () => {
  const url = 'https://app.nicfv.com/games/geomarin/';
  let shareText: string;
  let guesses = '';
  for (let i = 0; i < global.allowedGuesses; i++) {
    if (i < state.guesses.length) {
      const guess = state.guesses[i];
      if (guess === correct) {
        guesses += '🟩';
      } else if (close.includes(guess)) {
        guesses += '🟨';
      } else {
        guesses += '⬛';
      }
    } else {
      guesses += '⬜';
    }
  }
  if (solved()) {
    shareText = `${guesses}\n\nI solved today's GeoMarin puzzle in ${state.guesses.length} guesses!\nCan you beat my score?\n\n${url}`;
  } else if (state.guesses.length >= global.allowedGuesses) {
    shareText = `${guesses}\n\nI couldn't solve today's GeoMarin puzzle.\nCan you solve it?\n\n${url}`;
  } else {
    shareText = `${guesses}\n\nI'm playing today's GeoMarin puzzle and have made ${state.guesses.length} guesses so far.\nCan you solve it?\n\n${url}`;
  }
  navigator.clipboard.writeText(shareText);
  el('share').textContent = 'Copied!';
});

// Determine what to show on start up
if (solved()) {
  // Puzzle is already solved
  hideEl('intro-bg');
  showScore();
} else if (state.guesses.length >= global.allowedGuesses) {
  // Player has used all guesses
  hideEl('intro-bg');
  showScore();
} else if (state.guesses.length > 0) {
  // Player has made some guesses but hasn't solved yet
  hideEl('intro-bg');
  hideEl('score-bg');
} else {
  // Player hasn't made any guesses yet
  showEl('intro-bg');
  hideEl('score-bg');
}
