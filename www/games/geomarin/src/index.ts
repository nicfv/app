import { global } from './globals';
import { state } from './state';
import * as lib from './lib/';
import svg from '../assets/marin.svg' with { type: 'text' };

// Parse the SVG and add it to the page
const parser: DOMParser = new DOMParser();
const svgDoc: Document = parser.parseFromString(svg, 'image/svg+xml');
const svgElement: HTMLElement = svgDoc.documentElement;
lib.dom.el('marin-map').appendChild(svgElement);

// Filter and sort path from the SVG
const paths: SVGElement[] = Array.from(svgElement.getElementsByTagNameNS('http://www.w3.org/2000/svg', 'path'));
const filteredPaths: SVGElement[] = paths
  .filter(path => !global.staticPathNames.includes(path.id))
  .sort((a, b) => a.id.localeCompare(b.id));

// Add text elements for hints and tooltips
const title: SVGTextElement = lib.svg.createText('white', 0.75, 290, 10, 'end', 'hanging');
const hint: SVGTextElement = lib.svg.createText('white', 0.75, 10, 270, 'start', 'alphabetic');
svgElement.append(title, hint);

// Generate guess indicators
const indicators: SVGCircleElement[] = [];
for (let i = 0; i < global.allowedGuesses; i++) {
  indicators.push(lib.svg.circlePath(15 + i * 20, 285, 5, global.colors.default));
  svgElement.appendChild(indicators[i]);
}

// Define interactive elements for each region
const elements: Record<string, [SVGElement, HTMLDivElement]> = {};

// Add buttons and color behavior for each path
filteredPaths.forEach(path => {
  const button = document.createElement('div');
  button.setAttribute('class', 'button')
  lib.dom.el('buttons').appendChild(button);
  button.textContent = path.id;
  path.style.cursor = 'pointer';
  lib.game.setEvents(path, button, title);
  lib.game.handleGuess(path, button, indicators);
  elements[path.id] = [path, button];
});

// If the player has already made guesses, set path and button colors accordingly
for (const i in state.guesses) {
  const guess: string = state.guesses[i];
  lib.game.setGuessColor(elements[guess][0], elements[guess][1], indicators[i]);
}
