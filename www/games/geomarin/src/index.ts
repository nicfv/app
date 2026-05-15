import globals from './globals';
import { Lib } from './lib';

window.addEventListener('load', main);

function main(): void {
  console.log('Loaded!', Lib.getDate());
  const map: HTMLObjectElement = document.getElementById('marin-map') as HTMLObjectElement,
    buttonContainer: HTMLDivElement = document.getElementById('buttons') as HTMLDivElement,
    doc: Document = map.contentDocument!,
    paths: Array<SVGElement> = Array.from(doc.getElementsByTagNameNS('http://www.w3.org/2000/svg', 'path')),
    filteredPaths: Array<SVGElement> = paths
      .filter(path => !globals.staticPathNames.includes(path.id))
      .sort((a, b) => a.id.localeCompare(b.id)),
    title: SVGTextElement = Lib.createText('white', 0.75, 10, 290, 'start', 'alphabetic');
  doc.firstChild?.appendChild(title);
  filteredPaths.forEach(path => {
    const button = document.createElement('div');
    button.setAttribute('class', 'button')
    buttonContainer.append(button);
    button.innerText = path.id;
    path.style.cursor = 'pointer';
    Lib.handlePathTitle(path, title);
    Lib.setColorBehavior(path, button);
  });
}