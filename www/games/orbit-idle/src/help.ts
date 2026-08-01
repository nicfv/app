import { Drawable } from 'graphico';
import { Color } from 'viridis';
import { Label } from './label';

/**
 * Represents a help message
 */
export class Help implements Drawable {
    /**
     * Highlight outline color
     */
    private static readonly highlightStroke: Color = new Color(255, 255, 25);
    /**
     * Highlight fill color
     */
    private static readonly highlightFill: Color = new Color(255, 255, 0, 25);
    /**
     * Highlight blink time in milliseconds
     */
    private static readonly highlightBlinkMS = 500;
    /**
     * Tooltip shown for help
     */
    private readonly tip: Label;
    /**
     * The current time for this help message
     */
    private time = 0;
    /**
     * Create a new help message with optional highlighted region.
     */
    constructor(text: string, textOffsetX: number, textOffsetY: number, private readonly x: number, private readonly y: number, private readonly w: number, private readonly h: number) {
        this.tip = new Label(text, Help.highlightStroke, 1, false, textOffsetX < 0 ? 'right' : 'left', 'top', x + textOffsetX, y + textOffsetY);
    }
    /**
     * Compute a single timestep for this help message
     */
    public tick(dt: number): void {
        this.time = (this.time + dt) % (Help.highlightBlinkMS * 2);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Render label and highlighted region
        this.tip.draw(graphics);
        if (this.time > Help.highlightBlinkMS) {
            graphics.lineWidth = 2;
            graphics.fillStyle = Help.highlightFill.toString();
            graphics.strokeStyle = Help.highlightStroke.toString();
            graphics.fillRect(this.x, this.y, this.w, this.h);
            graphics.strokeRect(this.x, this.y, this.w, this.h);
        }
    }
}
