import { global } from './globals';
import { state } from './state';
import * as lib from './lib/';
import svg from '../assets/marin.svg' with { type: 'text' };
import { Canvas } from 'graphico';
import { Bar } from './bar';

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

// Set the date in the footer
lib.dom.el('date').textContent = `Puzzle: ${new Date().toDateString()}`;

// Show and hide the intro message
lib.dom.el('show-help').addEventListener('click', () => {
  lib.dom.el('intro-bg').style.display = 'flex';
});
lib.dom.el('intro').addEventListener('click', () => {
  lib.dom.el('intro-bg').style.display = 'none';
});

// Show, hide, and update the score message
const distribution = new Canvas({
  parent: lib.dom.el('distribution'),
  width: 200,
  height: 100,
  background: 'black',
});
function updateScore() {
  lib.dom.el('attempts').textContent = state.attempts.toString();
  lib.dom.el('win-rate').textContent = `${Math.round(state.solved.reduce((a, b) => a + b, 0) / state.attempts * 100)}%`;
  lib.dom.el('streak').textContent = state.streak.toString();
  lib.dom.el('max-streak').textContent = state.maxStreak.toString();
  const maxBarHeight: number = state.solved.reduce((a, b) => Math.max(a, b), 1);
  distribution.clear();
  for (let i = 1; i <= global.allowedGuesses; i++) {
    const color: string = (lib.game.solved() && state.guesses.length === i) ? global.colors.correct : global.colors.incorrect;
    distribution.draw(new Bar(i.toString(), state.solved[i] ?? 0, maxBarHeight, i, 12, color));
  }
}
updateScore();
lib.dom.el('show-score').addEventListener('click', () => {
  updateScore();
  lib.dom.el('score-bg').style.display = 'flex';
});
lib.dom.el('close-score').addEventListener('click', () => {
  lib.dom.el('score-bg').style.display = 'none';
});
