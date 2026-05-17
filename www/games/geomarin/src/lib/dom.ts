import { global } from '../globals';
import { state } from '../state';
import { Canvas } from 'graphico';
import { Bar } from './bar';
import { solved } from './game';

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
    debug: true,
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
}
/**
 * Show the score distribution and stats.
 */
export function showScore() {
  showEl('score-bg');
  updateScore();
}

// Set the date in the footer
el('date').textContent = `Puzzle: ${new Date().toDateString()}`;

// Show and hide the intro message
el('show-help').addEventListener('click', () => showEl('intro-bg'));
el('intro').addEventListener('click', () => hideEl('intro-bg'));

// Show and hide the score message
el('show-score').addEventListener('click', () => showScore());
el('close-score').addEventListener('click', () => hideEl('score-bg'));

// Show the score if the puzzle is already solved
if (solved()) {
  hideEl('intro-bg');
  showScore();
} else if (state.guesses.length > 0) {
  hideEl('intro-bg');
  hideEl('score-bg');
} else {
  showEl('intro-bg');
  hideEl('score-bg');
}
