import globals from './globals';
import * as lib from './lib';
import svg from '../assets/marin.svg' with { type: 'text' };

// Get DOM elements
const mapContainer: HTMLObjectElement = document.getElementById('marin-map') as HTMLObjectElement;
const buttonContainer: HTMLDivElement = document.getElementById('buttons') as HTMLDivElement;
const introContainer: HTMLDivElement = document.getElementById('intro-bg') as HTMLDivElement;
const helpButton: HTMLDivElement = document.getElementById('show-help') as HTMLDivElement;
const puzzleDate: HTMLDivElement = document.getElementById('date') as HTMLDivElement;

// Set the date in the footer
puzzleDate.textContent = `Puzzle: ${new Date().toDateString()}`;

// Show and hide the intro message
helpButton.addEventListener('click', () => {
  introContainer.style.display = 'flex';
});
introContainer.addEventListener('click', () => {
  introContainer.style.display = 'none';
});

// Parse the SVG and add it to the page
const parser: DOMParser = new DOMParser();
const svgDoc: Document = parser.parseFromString(svg, 'image/svg+xml');
const svgElement: HTMLElement = svgDoc.documentElement;
mapContainer.appendChild(svgElement);

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

// Add buttons and color behavior for each path
filteredPaths.forEach(path => {
  const button = document.createElement('div');
  button.setAttribute('class', 'button')
  buttonContainer.append(button);
  button.innerText = path.id;
  path.style.cursor = 'pointer';
  lib.setEvents(path, button, title);
  lib.handleGuess(path, button, indicators);
});
