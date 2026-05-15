import global from './globals';

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
  path.setAttribute('fill', color);
  button.style.background = color;
}
/**
 * Set the color-responsive behavior for cursor events.
 */
export function setColorBehavior(path: SVGElement, button: HTMLDivElement): void {
  button.addEventListener('mouseenter', () => setColor(path, button, global.colors.hover));
  button.addEventListener('mouseleave', () => setColor(path, button, global.colors.default));
  button.addEventListener('mousedown', () => setColor(path, button, global.colors.active));
  button.addEventListener('mouseup', () => setColor(path, button, global.colors.hover));
  path.addEventListener('mouseenter', () => setColor(path, button, global.colors.hover));
  path.addEventListener('mouseleave', () => setColor(path, button, global.colors.default));
  path.addEventListener('mousedown', () => setColor(path, button, global.colors.active));
  path.addEventListener('mouseup', () => setColor(path, button, global.colors.hover));
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
 * Show a tooltip when the mouse hovers over a path.
 */
export function handlePathTitle(path: SVGElement, text: SVGTextElement): void {
  path.addEventListener('mouseenter', () => text.textContent = path.id);
  path.addEventListener('mouseleave', () => text.textContent = '');
}
