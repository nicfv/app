import { Button } from './button';
import { Label } from './label';
import { N } from '../data/lib';
import { buyType, player, zoom } from '../data/state';
import { Orbit } from '../game/orbit';

/**
 * Represents a button to increase a orbit's speed.
 */
export class BuyButton extends Button {
    /**
     * The current cost to purchase.
     */
    private cost: number;
    /**
     * Initialize a new buy button.
     */
    constructor(x: number, width: number, private readonly orbit: Orbit) {
        super('', orbit.color, true, x, 0, width, Label.fontSize * 3, null, () => {
            player.spend(this.cost);
            orbit.increaseSpeed(buyType.getQuantity());
        });
        this.cost = 0;
    }
    /**
     * Update the text on this button.
     */
    private setText(): void {
        this.cost = this.orbit.getNextNCost(buyType.getQuantity());
        if (this.orbit.isMaxed()) {
            super.text = `${N(this.orbit.currentSpeedHz())}Hz\n(Maxed)`;
        } else {
            super.text = `${N(this.orbit.currentSpeedHz())} > ${N(this.orbit.getNextNSpeed(buyType.getQuantity()))}Hz\n$${N(this.cost)}`;
        }
        if (player.hasFunds(this.cost)) {
            super.enable();
        } else {
            super.disable();
        }
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        const centerDelta: number = player.getNumOrbits() - this.orbit.index - zoom.getZoom();
        if (Math.abs(centerDelta) < 5) {
            this.y = (graphics.canvas.height - this.h) / 2 - (Label.fontSize * 3.5) * centerDelta;
            this.setText();
            super.draw(graphics);
        } else {
            this.y = -Infinity;
        }
    }
}
