import { Drawable } from 'graphico';
import { Label } from './label';
import { Color } from 'viridis';

/**
 * Represents a help message
 */
export class Help extends Label implements Drawable {
    /**
     * Highlight outline color
     */
    private static readonly highlightColor: Color = new Color(255, 255, 0);
    /**
     * Highlight blink time in milliseconds
     */
    private static readonly highlightBlinkMS = 500;
    /**
     * The current time for this help message
     */
    private time = 0;
    /**
     * Create a new help message with optional highlighted region.
     */
    constructor(text: string, private readonly hx: number, private readonly hy: number, private readonly hw: number, private readonly hh: number) {
        super(text, new Color(255, 255, 255), 1, false, 'center', 'top', 0, 0);
    }
    /**
     * Compute a single timestep for this help message
     */
    public tick(dt: number): void {
        this.time = (this.time + dt) % (Help.highlightBlinkMS * 2);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Make sure text is centered on page
        super.x = graphics.canvas.width / 2;
        super.y = (graphics.canvas.height - super.getHeight()) / 2;
        super.draw(graphics);
        // Blink a rectangular outline
        if (this.time > Help.highlightBlinkMS) {
            graphics.lineWidth = 2;
            graphics.strokeStyle = Help.highlightColor.toString();
            graphics.strokeRect(this.hx, this.hy, this.hw, this.hh);
        }
    }
}
