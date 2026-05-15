import globals from './globals';
import * as lib from './lib';
import svg from '../assets/marin.svg' with { type: 'text' };

// Get DOM elements
const mapContainer: HTMLObjectElement = document.getElementById('marin-map') as HTMLObjectElement;
const buttonContainer: HTMLDivElement = document.getElementById('buttons') as HTMLDivElement;

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
const hint: SVGTextElement = lib.createText('white', 0.75, 290, 10, 'end', 'hanging');
const title: SVGTextElement = lib.createText('white', 0.75, 10, 290, 'start', 'alphabetic');
svgElement.append(title, hint);

// Add buttons and color behavior for each path
filteredPaths.forEach(path => {
  const button = document.createElement('div');
  button.setAttribute('class', 'button')
  buttonContainer.append(button);
  button.innerText = path.id;
  path.style.cursor = 'pointer';
  lib.setEvents(path, button, title);
  lib.handleGuess(path, button);
});
