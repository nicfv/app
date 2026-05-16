import global from './globals';
import { close, correct } from './solution';
import { saveData, state } from './state';

/**
 * Get a unique, sequential number per day.
 */
export function daysSinceEpoch(): number {
  const msPerDay: number = 1000 * 60 * 60 * 24;
  return Math.floor(Date.now() / msPerDay);
}
/**
 * If not guessed, set the color of an SVG and corresponding HTML elements.
 */
function setColor(path: SVGElement, button: HTMLDivElement, color: string): void {
  if (!state.guesses.includes(path.id)) {
    path.setAttribute('fill', color);
    button.style.background = color;
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
/**
 * Create an SVG text element.
 */
export function createText(fill: string, fontSizeRem: number, x: number, y: number, textAnchor: 'start' | 'middle' | 'end', dominantBaseline: 'alphabetic' | 'middle' | 'hanging'): SVGTextElement {
  const text: SVGTextElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('font-family', 'sans-serif');
  text.setAttribute('font-size', fontSizeRem.toString() + 'rem');
  text.setAttribute('fill', fill);
  text.setAttribute('x', x.toString() + 'px');
  text.setAttribute('y', y.toString() + 'px');
  text.setAttribute('text-anchor', textAnchor);
  text.setAttribute('dominant-baseline', dominantBaseline);
  return text;
}
/**
 * Handle a guess for a given path and button.
 */
export function handleGuess(path: SVGElement, button: HTMLDivElement, indicators: SVGCircleElement[]): void {
  path.addEventListener('click', guess);
  button.addEventListener('click', guess);
  function guess() {
    if (state.guesses.includes(path.id)) {
      // Already guessed!
      return;
    }
    if (state.guesses.length >= global.allowedGuesses) {
      // No more guesses allowed!
      return;
    }
    if (state.guesses.length > 0 && state.guesses[state.guesses.length - 1] === correct) {
      // Already guessed correctly!
      return;
    }
    // Get the indicator for this guess
    const indicator: SVGCircleElement = indicators[state.guesses.length];
    // Set color based on guess accuracy
    if (path.id === correct) {
      setColor(path, button, global.colors.correct);
      indicator.setAttribute('fill', global.colors.correct);
      state.solved += 1;
      state.streak += 1;
      state.lastSolved = daysSinceEpoch();
    } else if (close.includes(path.id)) {
      setColor(path, button, global.colors.close);
      indicator.setAttribute('fill', global.colors.close);
    } else {
      setColor(path, button, global.colors.incorrect);
      indicator.setAttribute('fill', global.colors.incorrect);
    }
    // Record this guess
    state.guesses.push(path.id);
    // Indicate that this option is no longer interactive
    path.style.cursor = 'default';
    button.style.cursor = 'default';
    // Save game data
    saveData(state);
  }
}
/**
 * Generate an SVG circle element.
 */
export function circlePath(cx: number, cy: number, r: number): SVGCircleElement {
  const circle: SVGCircleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', cx.toString());
  circle.setAttribute('cy', cy.toString());
  circle.setAttribute('r', r.toString());
  circle.setAttribute('fill', global.colors.default);
  return circle;
}
