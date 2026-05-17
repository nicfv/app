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
 * Generate an SVG circle element.
 */
export function circlePath(cx: number, cy: number, r: number, color: string): SVGCircleElement {
  const circle: SVGCircleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', cx.toString());
  circle.setAttribute('cy', cy.toString());
  circle.setAttribute('r', r.toString());
  circle.setAttribute('fill', color);
  return circle;
}
