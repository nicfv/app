import { StateColors, TriSwitch } from './TriSwitch';
import { CHAR_INPUT_STATUS } from './types';

/**
 * Represents a control that allows a user to input a single character.
 */
export class CharInput {
    private readonly element: HTMLInputElement;
    private readonly switch: TriSwitch;
    /**
     * Create a new `CharInput` and append it to the parent element.
     */
    constructor(allowedChars = '', parent = document.body) {
        const container = document.createElement('div'),
            switchDiv = document.createElement('div');
        container.setAttribute('class', 'CharInput');
        this.element = document.createElement('input');
        this.element.addEventListener('input', () => this.element.value = (allowedChars.includes(this.element.value.toUpperCase()) ? this.element.value.toUpperCase() : ''));
        this.element.setAttribute('maxLength', '1');
        container.appendChild(this.element);
        container.appendChild(switchDiv);
        parent.appendChild(container);
        this.switch = new TriSwitch(40, 25, [
            new StateColors('#999', '#333', '#999'),
            new StateColors('#999', '#030', '#999'),
            new StateColors('#999', '#330', '#999')
        ], 1.5, 3.5, 0.5, true, switchDiv);
        this.switch.setOnclick(() => this.setColor());
        this.setColor();
    }
    /**
     * Paint the color of this element.
     */
    private setColor(): void {
        switch (this.getStatus()) {
            case (CHAR_INPUT_STATUS.CORRECT): {
                this.element.style.backgroundColor = '#393';
                break;
            }
            case (CHAR_INPUT_STATUS.INCORRECT_PLACEMENT): {
                this.element.style.backgroundColor = '#993';
                break;
            }
            case (CHAR_INPUT_STATUS.INCORRECT): {
                this.element.style.backgroundColor = '#333';
                break;
            }
            default: {
                throw 'Invalid char input status: ' + this.getStatus();
            }
        }
    }
    /**
     * Determine whether this input has a value entered.
     */
    public hasValue(): boolean {
        return !!this.element.value;
    }
    /**
     * Return the value entered into this input.
     */
    public getChar(): string {
        return this.element.value;
    }
    /**
     * Return the status of this input.
     */
    public getStatus(): CHAR_INPUT_STATUS {
        return this.switch.getState();
    }
    /**
     * Clear the data in this input.
     */
    public clear(): void {
        this.element.value = '';
        while (this.switch.getState() !== CHAR_INPUT_STATUS.INCORRECT) {
            this.switch.click();
        }
        this.setColor();
    }
}