import { Color } from 'viridis';
import { Button } from './button';
import { Wheel } from './wheel';

export class BuyButton extends Button {
    constructor(private readonly wheel: Wheel) {
        super('', wheel.color, new Color(255, 255, 255), 10, 400 - 40 * wheel.index, 120, 35, () => {
            this.setText();
        });
        this.setText();
    }
    private setText(): void {
        super.text = `${this.wheel.currentSpeedHz().toFixed(2)} \u2192 ${this.wheel.getNextNSpeed().toFixed(2)}Hz\n$${this.wheel.getNextNCost().toFixed(2)}`;
    }
}
