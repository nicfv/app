import { Drawable } from 'graphico';
import { Wheel } from './wheel';
import { FONT_FAMILY, FONT_SIZE } from './globals';
import { N } from './lib';

/**
 * Renders the wheel score to the user interface.
 */
export class WheelScore implements Drawable {
    private xOffset: number;
    private width: number;
    /**
     * Initialize a new wheel score
     */
    constructor(private readonly wheel: Wheel, private readonly x: number) {
        this.xOffset = 0;
        this.width = 0;
    }
    /**
     * Get the actual, calculated score for this wheel
     */
    public getScore(): number {
        return (this.wheel.getData().rotations / 100 + 1) ** (this.wheel.getData().ascensions / 100 + 1);
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
        if (this.wheel.getData().speedLevel <= 0) {
            return;
        }
        // Set graphical text properties
        graphics.textAlign = 'left';
        graphics.textBaseline = 'top';
        this.width = 0;
        graphics.font = `${FONT_SIZE * 2}px ${FONT_FAMILY}`;
        // Render and measure the multiplier symbol
        if (this.wheel.index > 0) {
            graphics.fillStyle = 'lightgray';
            const multiplier = 'x';
            graphics.fillText(multiplier, this.x + this.xOffset, FONT_SIZE);
            this.width += graphics.measureText(multiplier).width;
        }
        // Render and measure the base score
        graphics.fillStyle = this.wheel.color.toString();
        const baseText: string = N(this.wheel.getData().rotations / 100 + 1);
        graphics.fillText(baseText, this.x + this.xOffset + this.width, FONT_SIZE);
        this.width += graphics.measureText(baseText).width;
        // Render and measure the exponent
        if (this.wheel.getData().ascensions > 0) {
            graphics.font = `${FONT_SIZE * 1.5}px ${FONT_FAMILY}`;
            const expText: string = N(this.wheel.getData().ascensions / 100 + 1);
            graphics.fillText(expText, this.x + this.xOffset + this.width, FONT_SIZE * 0.5);
            this.width += graphics.measureText(expText).width;
        }
    }
}