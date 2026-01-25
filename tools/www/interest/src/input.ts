import * as SMath from 'smath';

/**
 * Represents a structure for numeric bounds.
 */
export interface Bounds {
    /**
     * The minimum bound, defaults to -Infinity.
     */
    readonly min?: number;
    /**
     * The maximum bound, defaults to Infinity.
     */
    readonly max?: number;
    /**
     * The step, defaults to 1.
     */
    readonly step?: number;
}

/**
 * Represents a numeric input element with a label.
 */
export class Input {
    private static readonly className = 'input';
    private static id: number = 0;
    private readonly element: HTMLInputElement;
    /**
     * Create a new input element and append onto the parent element.
     */
    constructor(parent: Element, title: string, enabled: boolean, private readonly bounds?: Bounds) {
        Input.id++;
        this.element = document.createElement('input');
        const container = document.createElement('div'),
            label = document.createElement('label'),
            inputId = Input.className + '_' + Input.id;
        container.setAttribute('class', Input.className);
        this.element.setAttribute('id', inputId);
        this.element.setAttribute('type', 'number');
        this.element.setAttribute('title', title);
        this.element.setAttribute('placeholder', title);
        this.element.setAttribute('min', (bounds?.min ?? -Infinity).toString());
        this.element.setAttribute('max', (bounds?.max ?? Infinity).toString());
        this.element.setAttribute('step', (bounds?.step ?? 1).toString());
        if (!enabled) {
            this.element.setAttribute('readonly', '');
        }
        label.setAttribute('for', inputId);
        label.innerText = title;
        container.appendChild(this.element);
        container.appendChild(label);
        parent.appendChild(container);
    }
    /**
     * Clear the input.
     */
    public clear(): void {
        this.element.value = '';
    }
    /**
     * Set the onChange event callback. Does not clear existing event listeners.
     */
    public onChange(callback: (value: number) => void): void {
        this.element.addEventListener('input', () => callback(this.getValue()));
    }
    /**
     * Get the current value of the input element.
     */
    public getValue(): number {
        return SMath.clamp(SMath.round2(+this.element.value, this.bounds?.step ?? 1), this.bounds?.min ?? -Infinity, this.bounds?.max ?? Infinity);
    }
    /**
     * Set the current value of the input element.
     */
    public setValue(value: number): void {
        this.element.value = SMath.clamp(SMath.round2(value, this.bounds?.step ?? 1), this.bounds?.min ?? -Infinity, this.bounds?.max ?? Infinity).toString();
    }
}