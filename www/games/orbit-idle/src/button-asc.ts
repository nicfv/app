import { Button } from './button';
import { Label } from './label';
import { N } from './lib';
import { player, zoom } from './state';
import { Wheel } from './wheel';

/**
 * Represents a button to ascend a specific wheel
 */
export class AscendButton extends Button {
    /**
     * The cost for ascending
     */
    private ascAmount: number;
    /**
     * The amount of ascensions
     */
    private ascensions: number;
    /**
     * Initialize a new ascension button
     */
    constructor(x: number, width: number, private readonly wheel: Wheel) {
        super('', wheel.color, false, x, 0, width, Label.fontSize * 3, () => {
            player.spend(this.ascAmount);
            this.wheel.ascend(this.ascensions);
        });
        this.ascAmount = 0;
        this.ascensions = 0;
    }
    /**
     * Update text and cost
     */
    private update(): void {
        // Determine the ascension level
        this.ascensions = 1;
        while (player.hasFunds(this.wheel.getNextNAscensionCost(this.ascensions + 1))) {
            this.ascensions++;
        }
        // Calculate and display cost
        this.ascAmount = this.wheel.getNextNAscensionCost(this.ascensions);
        super.text = `Ascend +${this.ascensions}\n$${N(this.ascAmount)}`;
        // Check if player has sufficient funds to ascend
        if (player.hasFunds(this.ascAmount)) {
            super.enable();
        } else {
            super.disable();
        }
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        const centerDelta: number = player.getNumWheels() - this.wheel.index - zoom.getZoom();
        if (this.wheel.isMaxed() && Math.abs(centerDelta) < 5) {
            this.y = (graphics.canvas.height - this.h) / 2 - (Label.fontSize * 3.5) * centerDelta;
            this.update();
            super.draw(graphics);
        } else {
            this.y = -Infinity;
        }
    }
}