import globals from './globals';
import { state } from './state';
import * as lib from './lib';
import svg from '../assets/marin.svg' with { type: 'text' };
import { Canvas } from 'graphico';
import { Bar } from './bar';

// Parse the SVG and add it to the page
const parser: DOMParser = new DOMParser();
const svgDoc: Document = parser.parseFromString(svg, 'image/svg+xml');
const svgElement: HTMLElement = svgDoc.documentElement;
lib.el('marin-map').appendChild(svgElement);

// Filter and sort path from the SVG
const paths: SVGElement[] = Array.from(svgElement.getElementsByTagNameNS('http://www.w3.org/2000/svg', 'path'));
const filteredPaths: SVGElement[] = paths
  .filter(path => !globals.staticPathNames.includes(path.id))
  .sort((a, b) => a.id.localeCompare(b.id));

// Add text elements for hints and tooltips
const title: SVGTextElement = lib.createText('white', 0.75, 290, 10, 'end', 'hanging');
const hint: SVGTextElement = lib.createText('white', 0.75, 10, 270, 'start', 'alphabetic');
svgElement.append(title, hint);

// Generate guess indicators
const indicators: SVGCircleElement[] = [];
for (let i = 0; i < globals.allowedGuesses; i++) {
  indicators.push(lib.circlePath(15 + i * 20, 285, 5));
  svgElement.appendChild(indicators[i]);
}

// Define interactive elements for each region
const elements: Record<string, [SVGElement, HTMLDivElement]> = {};

// Add buttons and color behavior for each path
filteredPaths.forEach(path => {
  const button = document.createElement('div');
  button.setAttribute('class', 'button')
  lib.el('buttons').appendChild(button);
  button.textContent = path.id;
  path.style.cursor = 'pointer';
  lib.setEvents(path, button, title);
  lib.handleGuess(path, button, indicators);
  elements[path.id] = [path, button];
});

// If the player has already made guesses, simulate clicks on those paths to show feedback
let i = 0;
for (const guess of state.guesses) {
  lib.setGuessColor(elements[guess][0], elements[guess][1], indicators[i]);
  i++;
}

// Set the date in the footer
lib.el('date').textContent = `Puzzle: ${new Date().toDateString()}`;

// Show and hide the intro message
lib.el('show-help').addEventListener('click', () => {
  lib.el('intro-bg').style.display = 'flex';
});
lib.el('intro').addEventListener('click', () => {
  lib.el('intro-bg').style.display = 'none';
});

// Show, hide, and update the score message
const distribution = new Canvas({
  parent: lib.el('distribution'),
  width: 200,
  height: 100,
  background: 'black',
});
function updateScore() {
  lib.el('attempts').textContent = state.attempts.toString();
  lib.el('win-rate').textContent = `${Math.round(state.solved.reduce((a, b) => a + b, 0) / state.attempts * 100)}%`;
  lib.el('streak').textContent = state.streak.toString();
  lib.el('max-streak').textContent = state.maxStreak.toString();
  const maxBarHeight: number = state.solved.reduce((a, b) => Math.max(a, b), 1);
  distribution.clear();
  for (let i = 1; i <= globals.allowedGuesses; i++) {
    distribution.draw(new Bar(i.toString(), state.solved[i] ?? 0, maxBarHeight, i, 12, globals.colors.correct));
  }
}
updateScore();
lib.el('show-score').addEventListener('click', () => {
  updateScore();
  lib.el('score-bg').style.display = 'flex';
});
lib.el('close-score').addEventListener('click', () => {
  lib.el('score-bg').style.display = 'none';
});
