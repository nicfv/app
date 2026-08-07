import { Color } from 'viridis';
import { Button } from './button';

/**
 * Represents a button with a finite number of states.
 */
export class ToggleButton extends Button {
    /**
     * The current state of this button (index of states)
     */
    private stateId: number;
    /**
     * Initialize a new toggle button, where the first state is the default state.
     */
    constructor(private readonly states: [string, Color, () => void][], x: number, y: number, width: number, height: number, hotkey: string | null) {
        super(states[0][0], states[0][1], true, x, y, width, height, hotkey, () => {
            // Execute the current state's callback function
            states[0][2]();
            // Change the current state of the toggle button
            this.setState();
        });
        this.stateId = 0;
    }
    /**
     * Set the current state of the button without calling any callbacks
     */
    private setState(id: number = (this.stateId + 1) % this.states.length): void {
        this.stateId = id;
        super.text = this.states[this.stateId][0];
        super.color = this.states[this.stateId][1];
        super.callback = () => {
            this.states[this.stateId][2]();
            this.setState();
        };
    }
    /**
     * Reset the current state of the button without calling any callbacks
     */
    public reset(): void {
        this.setState(0);
    }
}
