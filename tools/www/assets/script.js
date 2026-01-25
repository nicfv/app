console.log('Loaded!');

const allTools = document.getElementById('tools');
let hue = 0;

function addGroup(heading = '') {
    const head = document.createElement('h3');
    head.setAttribute('title', `Below is a group of tools relating to: ${heading}`)
    head.textContent = heading;
    allTools.appendChild(head);
}

function addTool(path = '', name = '', desc = '') {
    hue += 10;
    const anchor = document.createElement('a');
    anchor.setAttribute('href', path);
    anchor.setAttribute('title', `${name}: ${desc}`);
    anchor.className = 'tool';
    allTools.appendChild(anchor);
    const container = document.createElement('div');
    container.style.background = `hsl(${hue},100%,75%)`;
    container.className = 'tool';
    anchor.appendChild(container);
    const title = document.createElement('strong');
    title.textContent = name;
    const descr = document.createElement('i');
    descr.textContent = ` - ${desc}`;
    container.append(title, descr);
}

addGroup('Finance');
addTool('tvm', 'Time Value of Money', 'Calculate the time value of money using various equations.');
addTool('interest', 'Interest Calculator', 'A collection of formulas that calculate parameters for an environment with an interest rate.');

addGroup('Science');
addTool('https://psychart.nicfv.com/', 'Psychart', 'Plot thermodynamic conditions of air on a psychrometric chart, optionally displaying comfort zones.');
addTool('dimensional', 'Unit Converter', 'Convert anything to anything! Build complex units and analyze dimensions.');
addTool('dimensional-playground', 'Dimensional Playground', 'Presents a live editor with the `dimensional` package ready to use.');
addTool('data-url', 'File To Data URL', 'Encode any file as a data URL that can be directly embedded into a source code file.');

addGroup('Gaming');
addTool('wordle', 'Wordle Helper', 'Filters the wordle dictionary based on your previous guesses to help you make an informed next guess.');
addTool('hearts', 'Hearts Helper', 'Help counts cards specifically for the game, Hearts.');
addTool('pokemon-go', 'Pokemon Go Catch Rate', 'A catch rate calculator for the mobile game, Pokemon Go.');
