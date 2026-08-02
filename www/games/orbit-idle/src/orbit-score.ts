import { Drawable } from 'graphico';
import { Color } from 'viridis';
import { Orbit } from './orbit';
import { N } from './lib';
import { Label } from './label';

/**
 * Renders the orbit score to the user interface.
 */
export class OrbitScore implements Drawable {
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
     * Initialize a new orbit score
     */
    constructor(private readonly orbit: Orbit, private readonly x: number) {
        this.xOffset = 0;
        this.width = 0;
        this.xLabel = new Label('x', new Color(200, 200, 200), 2, false, 'left', 'top', 0, Label.fontSize);
        this.baseLabel = new Label('', orbit.color, 2, false, 'left', 'top', 0, Label.fontSize);
        this.expLabel = new Label('', orbit.color, 1.5, false, 'left', 'top', 0, Label.fontSize * 0.5);
    }
    /**
     * Get the actual, calculated score for this orbit
     */
    public getScore(): number {
        return this.orbit.getBase() ** this.orbit.getExp();
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
        // Don't render if orbit hasn't been "activated"
        if (!this.orbit.isActive()) {
            return;
        }
        // Render and measure the multiplier symbol
        if (this.orbit.index > 0) {
            this.xLabel.x = this.x + this.xOffset;
            this.xLabel.draw(graphics);
            this.width += this.xLabel.getWidth();
        }
        // Render and measure the base score
        this.baseLabel.value = N(this.orbit.getBase());
        this.baseLabel.x = this.x + this.xOffset + this.width;
        this.baseLabel.draw(graphics);
        this.width += this.baseLabel.getWidth();
        // Render and measure the exponent
        if (this.orbit.hasAscended()) {
            this.expLabel.value = N(this.orbit.getExp());
            this.expLabel.x = this.x + this.xOffset + this.width;
            this.expLabel.draw(graphics);
            this.width += this.expLabel.getWidth();
        }
    }
}