import { Color } from 'viridis';
import { Label } from './label';
import { Button } from './button';

/**
 * Represents a help message
 */
export class Help extends Button {
    /**
     * Shade color for the background
     */
    private static readonly shade: Color = new Color(0, 0, 0, 50);
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
    constructor(text: string, textOffsetX: number, textOffsetY: number, protected readonly x: number, protected readonly y: number, protected readonly w: number, protected readonly h: number, callback: () => void) {
        super('', new Color(0, 0, 0, 0), true, x, y, w, h, callback);
        this.tip = new Label(text, Help.highlightStroke, 1, false, textOffsetX < 0 ? 'right' : 'left', 'top', x + textOffsetX, y + textOffsetY);
    }
    /**
     * Compute a single timestep for this help message
     */
    public tick(dt: number): void {
        this.time = (this.time + dt) % (Help.highlightBlinkMS * 2);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Shade in the background
        graphics.fillStyle = Help.shade.toString();
        graphics.fillRect(0, 0, graphics.canvas.width, graphics.canvas.height);
        graphics.clearRect(this.x, this.y, this.w, this.h);
        // Render label and highlighted region
        this.tip.draw(graphics);
        graphics.lineWidth = 2;
        graphics.strokeStyle = Help.highlightStroke.toString();
        graphics.strokeRect(this.x, this.y, this.w, this.h);
        if (this.time > Help.highlightBlinkMS) {
            super.color = Help.highlightFill;
        } else {
            super.color = new Color(0, 0, 0, 0);
        }
        super.draw(graphics);
    }
}
