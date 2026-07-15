import { Button } from './button';
import { NUM_WHEELS } from './globals';
import { Label } from './label';
import { N } from './lib';
import { buyType, player, zoom } from './state';
import { Wheel } from './wheel';

/**
 * Represents a button to increase a wheel's speed.
 */
export class BuyButton extends Button {
    /**
     * The current cost to purchase.
     */
    private cost: number;
    /**
     * Initialize a new buy button.
     */
    constructor(x: number, width: number, private readonly wheel: Wheel) {
        super('', wheel.color, true, x, 0, width, Label.fontSize * 3, () => {
            player.money -= this.cost;
            wheel.increaseSpeed(buyType.getQuantity());
        });
        this.cost = 0;
    }
    /**
     * Update the text on this button.
     */
    private setText(): void {
        this.cost = this.wheel.getNextNCost(buyType.getQuantity());
        if (this.wheel.isMaxed()) {
            super.text = `${N(this.wheel.currentSpeedHz())}Hz\n(Maxed)`;
        } else {
            super.text = `${N(this.wheel.currentSpeedHz())} > ${N(this.wheel.getNextNSpeed(buyType.getQuantity()))}Hz\n$${N(this.cost)}`;
        }
        if (player.money >= this.cost) {
            super.enable();
        } else {
            super.disable();
        }
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        const centerDelta: number = NUM_WHEELS - this.wheel.index - zoom.getZoom();
        if (Math.abs(centerDelta) < 5) {
            this.y = (graphics.canvas.height - this.h) / 2 - (Label.fontSize * 3.5) * centerDelta;
            this.setText();
            super.draw(graphics);
        } else {
            this.y = -Infinity;
        }
    }
}
