import * as SMath from 'smath';

/**
 * Represents a structure for numeric bounds.
 */
export interface Bounds {
    /**
     * The initial value.
     */
    readonly val: number;
    /**
     * The minimum bound.
     */
    readonly min: number;
    /**
     * The maximum bound.
     */
    readonly max: number;
    /**
     * The interval between values.
     */
    readonly step: number;
}

/**
 * Represents a numeric input element with a label.
 */
export class Range {
    private static readonly className = 'input';
    private static id: number = 0;
    private readonly element: HTMLInputElement;
    /**
     * Create a new input element and append onto the parent element.
     */
    constructor(parent: HTMLElement, title: string, private readonly bounds: Bounds) {
        Range.id++;
        this.element = document.createElement('input');
        const container = document.createElement('div'),
            label = document.createElement('label'),
            inputId = Range.className + '_' + Range.id;
        container.setAttribute('class', Range.className);
        container.setAttribute('title', title);
        this.element.setAttribute('id', inputId);
        this.element.setAttribute('type', 'range');
        this.element.setAttribute('min', this.bounds.min.toString());
        this.element.setAttribute('max', this.bounds.max.toString());
        this.element.setAttribute('step', this.bounds.step.toString());
        this.element.setAttribute('value', this.bounds.val.toString());
        label.setAttribute('for', inputId);
        label.textContent = title;
        container.appendChild(this.element);
        container.appendChild(label);
        parent.appendChild(container);
    }
    /**
     * Reset the input to its default value.
     */
    public reset(): void {
        this.element.value = this.bounds.val.toString();
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
        return SMath.clamp(SMath.round2(+this.element.value, this.bounds.step), this.bounds.min, this.bounds.max);
    }
}