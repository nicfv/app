console.log('Loaded!');

class Tool {
    #path;
    #name;
    #desc;
    #color;
    constructor(path = '', name = '', desc = '', color = '') {
        this.#path = path;
        this.#name = name;
        this.#desc = desc;
        this.#color = color;
    }
    getElement() {
        const anchor = document.createElement('a');
        anchor.setAttribute('href', this.#path);
        const container = document.createElement('div');
        container.style.background = this.#color;
        anchor.appendChild(container);
        const title = document.createElement('strong');
        title.textContent = this.#name;
        const descr = document.createElement('i');
        descr.textContent = ` - ${this.#desc}`;
    }
}