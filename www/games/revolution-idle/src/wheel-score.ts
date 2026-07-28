import { Drawable } from 'graphico';
import { Wheel } from './wheel';
import { N } from './lib';
import { Label } from './label';
import { Color } from 'viridis';

/**
 * Renders the wheel score to the user interface.
 */
export class WheelScore implements Drawable {
    /**
     * The x-offset, in pixels
     */
    private xOffset: number;
    /**
     * The calculated width of the score
     */
    private width: number;
    /**
     * The multiplier symbol
     */
    private readonly xLabel: Label;
    /**
     * The base label
     */
    private readonly baseLabel: Label;
    /**
     * The exponent label
     */
    private readonly expLabel: Label;
    /**
     * Initialize a new wheel score
     */
    constructor(private readonly wheel: Wheel, private readonly x: number) {
        this.xOffset = 0;
        this.width = 0;
        this.xLabel = new Label('x', new Color(200, 200, 200), 2, false, 'left', 'top', 0, Label.fontSize);
        this.baseLabel = new Label('', wheel.color, 2, false, 'left', 'top', 0, Label.fontSize);
        this.expLabel = new Label('', wheel.color, 1.5, false, 'left', 'top', 0, Label.fontSize * 0.5);
    }
    /**
     * Get the actual, calculated score for this wheel
     */
    public getScore(): number {
        return this.wheel.getBase() ** this.wheel.getExp();
    }
    /**
     * Set the X-offset in pixels for this score
     */
    public setXOffset(offset: number): void {
        this.xOffset = offset;
    }
    /**
     * Determine the full text width
     */
    public getWidth(): number {
        return this.width;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Set graphical text properties
        this.width = 0;
        // Don't render if wheel hasn't been "activated"
        if (!this.wheel.isActive()) {
            return;
        }
        // Render and measure the multiplier symbol
        if (this.wheel.index > 0) {
            this.xLabel.x = this.x + this.xOffset;
            this.xLabel.draw(graphics);
            this.width += this.xLabel.getWidth();
        }
        // Render and measure the base score
        this.baseLabel.value = N(this.wheel.getBase());
        this.baseLabel.x = this.x + this.xOffset + this.width;
        this.baseLabel.draw(graphics);
        this.width += this.baseLabel.getWidth();
        // Render and measure the exponent
        if (this.wheel.hasAscended()) {
            this.expLabel.value = N(this.wheel.getExp());
            this.expLabel.x = this.x + this.xOffset + this.width;
            this.expLabel.draw(graphics);
            this.width += this.expLabel.getWidth();
        }
    }
}