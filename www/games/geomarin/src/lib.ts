import global from './globals';
import { close, correct, guesses } from './guesses';

/**
 * Get the current date as a string.
 */
export function getDate(): string {
  const date: Date = new Date();
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}
/**
 * Set the color of an SVG and corresponding HTML elements.
 */
function setColor(path: SVGElement, button: HTMLDivElement, color: string): void {
  if (!guesses.includes(path.id)) {
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
export function handleGuess(path: SVGElement, button: HTMLDivElement): void {
  path.addEventListener('click', guess);
  button.addEventListener('click', guess);
  function guess() {
    if (guesses.includes(path.id)) {
      return; // Already guessed!
    }
    if (path.id === correct) {
      setColor(path, button, global.colors.correct);
    } else if (close.includes(path.id)) {
      setColor(path, button, global.colors.close);
    } else {
      setColor(path, button, global.colors.incorrect);
    }
    guesses.push(path.id);
    path.style.cursor = 'default';
    button.style.cursor = 'default';
  }
}

