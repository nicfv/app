import { global } from '../globals';
import { close, correct } from './solution';
import { daysSinceEpoch, saveData, state } from '../state';
import { showScore } from './dom';

/**
 * Determine if the puzzle has been solved.
 */
export function solved(): boolean {
  return state.guesses.includes(correct);
}
/**
 * Determine if the player can make a guess
 */
function canGuess(id: string): boolean {
  if (state.guesses.includes(id)) {
    // Already guessed!
    return false;
  }
  if (state.guesses.length >= global.allowedGuesses) {
    // No more guesses allowed!
    return false;
  }
  if (solved()) {
    // Already solved the puzzle!
    return false;
  }
  return true;
}
/**
 * If not guessed, set the color of an SVG and corresponding HTML elements.
 */
function setColor(path: SVGElement, button: HTMLDivElement, color: string, indicator?: SVGCircleElement): void {
  if ((!solved() && !state.guesses.includes(path.id)) || indicator) {
    path.setAttribute('fill', color);
    button.style.background = color;
  }
  indicator?.setAttribute('fill', color);
}
/**
 * Set the color of a guess
 */
export function setGuessColor(path: SVGElement, button: HTMLDivElement, indicator: SVGCircleElement): void {
  // Set color based on guess accuracy
  if (path.id === correct) {
    setColor(path, button, global.colors.correct, indicator);
  } else if (close.includes(path.id)) {
    setColor(path, button, global.colors.close, indicator);
  } else {
    setColor(path, button, global.colors.incorrect, indicator);
  }
  // Indicate that this option is no longer interactive
  path.style.cursor = 'default';
  button.style.cursor = 'default';
}
/**
 * Handle a guess for a given path and button.
 */
export function handleGuess(path: SVGElement, button: HTMLDivElement, indicators: SVGCircleElement[]): void {
  path.addEventListener('click', guess);
  button.addEventListener('click', guess);
  function guess() {
    // Determine if the player can make a guess
    if (!canGuess(path.id)) {
      return;
    }
    // Get the indicator for this guess
    const indicator: SVGCircleElement = indicators[state.guesses.length];
    // Set color based on guess accuracy
    setGuessColor(path, button, indicator);
    // Record this guess
    state.guesses.push(path.id);
    // If correct, update solved and streak data
    if (solved()) {
      if (typeof state.solved[state.guesses.length] === 'number') {
        state.solved[state.guesses.length]++;
      } else {
        state.solved[state.guesses.length] = 1;
      }
      state.streak++;
      state.maxStreak = Math.max(state.maxStreak, state.streak);
      state.lastSolved = daysSinceEpoch();
      showScore();
    }
    // Save game data
    saveData(state);
  }
}
/**
 * Set the color-responsive behavior for cursor events and show a tooltip when the mouse hovers over a path.
 */
export function setEvents(path: SVGElement, button: HTMLDivElement, text: SVGTextElement): void {
  // Change button color on mouse events
  button.addEventListener('mouseenter', () => setColor(path, button, global.colors.hover));
  button.addEventListener('mouseleave', () => setColor(path, button, global.colors.default));
  button.addEventListener('mousedown', () => setColor(path, button, global.colors.active));
  button.addEventListener('mouseup', () => setColor(path, button, global.colors.hover));
  // Change path color on mouse events
  path.addEventListener('mouseenter', () => setColor(path, button, global.colors.hover));
  path.addEventListener('mouseleave', () => setColor(path, button, global.colors.default));
  path.addEventListener('mousedown', () => setColor(path, button, global.colors.active));
  path.addEventListener('mouseup', () => setColor(path, button, global.colors.hover));
  // Show tooltip with path name on mouse hover
  path.addEventListener('mouseenter', () => text.textContent = path.id);
  path.addEventListener('mouseleave', () => text.textContent = '');
}
