/**
 * Represents a key-value pair for a dropdown item.
 */
export interface DropdownItem {
    /**
     * The key, or visible title of the dropdown item.
     */
    readonly key: string;
    /**
     * The internal value of the dropdown item.
     */
    readonly value: string;
}

/**
 * Represents an HTML dropdown element.
 */
export class Dropdown {
    private static readonly className = 'dropdown';
    private static id: number = 0;
    private readonly element: HTMLSelectElement;
    /**
     * Create a new dropdown.
     */
    constructor(parent: Element, title: string, items: Array<DropdownItem>) {
        Dropdown.id++;
        this.element = document.createElement('select');
        const container = document.createElement('div'),
            label = document.createElement('label'),
            dropdownId = Dropdown.className + '_' + Dropdown.id;
        container.setAttribute('class', Dropdown.className);
        this.element.setAttribute('id', dropdownId);
        this.element.setAttribute('title', title);
        label.setAttribute('for', dropdownId);
        label.innerText = title;
        items.forEach(item => {
            const option: HTMLOptionElement = document.createElement('option');
            option.textContent = item.key;
            option.value = item.value;
            this.element.appendChild(option);
        });
        container.appendChild(this.element);
        container.appendChild(label);
        parent.appendChild(container);
    }
    /**
     * Set the callback function when this input changes. Does not clear existing event listeners.
     */
    public onChange(callback: (value: string) => void): void {
        this.element.addEventListener('input', () => callback(this.getValue()));
    }
    /**
     * Get the current value of this dropdown.
     */
    public getValue(): string {
        return this.element.value;
    }
}