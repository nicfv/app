import { Drawable } from 'graphico';
import { Wheel } from './wheel';
import { N } from './lib';
import { Text } from './text';
import { Color } from 'viridis';

/**
 * Renders the wheel score to the user interface.
 */
export class WheelScore implements Drawable {
    private xOffset: number;
    private width: number;
    private readonly xText: Text;
    private readonly baseText: Text;
    private readonly expText: Text;
    /**
     * Initialize a new wheel score
     */
    constructor(private readonly wheel: Wheel, private readonly x: number) {
        this.xOffset = 0;
        this.width = 0;
        this.xText = new Text('x', new Color(200, 200, 200), 2, false, 'left', 'top', 0, Text.fontSize);
        this.baseText = new Text('', wheel.color, 2, false, 'left', 'top', 0, Text.fontSize);
        this.expText = new Text('', wheel.color, 1.5, false, 'left', 'top', 0, Text.fontSize * 0.5);
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
            this.xText.x = this.x + this.xOffset;
            this.xText.draw(graphics);
            this.width += this.xText.getWidth();
        }
        // Render and measure the base score
        this.baseText.value = N(this.getBase());
        this.baseText.x = this.x + this.xOffset + this.width;
        this.baseText.draw(graphics);
        this.width += this.baseText.getWidth();
        // Render and measure the exponent
        if (this.hasAscended()) {
            this.expText.value = N(this.getExp());
            this.expText.x = this.x + this.xOffset + this.width;
            this.expText.draw(graphics);
            this.width += this.expText.getWidth();
        }
    }
}