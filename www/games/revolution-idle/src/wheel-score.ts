import { Drawable } from 'graphico';
import { Wheel } from './wheel';
import { N } from './lib';
import { Label } from './label';
import { Color } from 'viridis';

/**
 * Renders the wheel score to the user interface.
 */
export class WheelScore implements Drawable {
    private xOffset: number;
    private width: number;
    private readonly xLabel: Label;
    private readonly baseLabel: Label;
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
     * Determine if the wheel has been activated
     */
    private isActive(): boolean {
        return this.wheel.getData().speedLevel > 0;
    }
    /**
     * Determine if this wheel has ascended yet
     */
    private hasAscended(): boolean {
        return this.wheel.getData().ascensions > 0;
    }
    /**
     * Get the base value to calculate score
     */
    private getBase(): number {
        return this.wheel.getData().rotations / 100 + 1;
    }
    /**
     * Get the exponent to calculate score
     */
    private getExp(): number {
        return this.wheel.getData().ascensions / 100 + 1;
    }
    /**
     * Get the actual, calculated score for this wheel
     */
    public getScore(): number {
        return this.getBase() ** this.getExp();
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
        // Don't render if wheel hasn't been "activated"
        if (!this.isActive()) {
            return;
        }
        // Set graphical text properties
        this.width = 0;
        // Render and measure the multiplier symbol
        if (this.wheel.index > 0) {
            this.xLabel.x = this.x + this.xOffset;
            this.xLabel.draw(graphics);
            this.width += this.xLabel.getWidth();
        }
        // Render and measure the base score
        this.baseLabel.value = N(this.getBase());
        this.baseLabel.x = this.x + this.xOffset + this.width;
        this.baseLabel.draw(graphics);
        this.width += this.baseLabel.getWidth();
        // Render and measure the exponent
        if (this.hasAscended()) {
            this.expLabel.value = N(this.getExp());
            this.expLabel.x = this.x + this.xOffset + this.width;
            this.expLabel.draw(graphics);
            this.width += this.expLabel.getWidth();
        }
    }
}