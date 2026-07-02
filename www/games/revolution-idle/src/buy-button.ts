import { Button } from './button';
import { Wheel } from './wheel';

export class BuyButton extends Button {
    constructor(private readonly wheel: Wheel) {
        super(`${wheel.currentSpeedHz().toFixed(2)} \u2192 ${wheel.getNextNSpeed().toFixed(2)}Hz\n$${wheel.getNextNCost().toFixed(2)}`, wheel.color, 10, 55 * wheel.index, 120, 35, () => console.log(`clicked ${wheel.index}`));
    }
}
