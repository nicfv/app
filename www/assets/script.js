console.log('Loaded!');

const allTools = document.getElementById('tools');
console.log(allTools);

function addGroup(heading = '') {
    const head = document.createElement('h3');
    head.setAttribute('title', `Below is a group of tools relating to: ${heading}`)
    head.textContent = heading;
    allTools.appendChild(head);
}

function addTool(path = '', name = '', desc = '') {
    const hues = 36;
    const hue = ((name.charCodeAt(0) + name.length) % hues) * (360 / hues);
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
addTool('data-url', 'Data URL', 'Convert any file into its corresponding data URL');
