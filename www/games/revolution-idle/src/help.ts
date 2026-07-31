import { Color } from 'viridis';
import { Button } from './button';
import { Label } from './label';

/**
 * Represents a help message
 */
export class Help extends Button {
    /**
     * Highlight outline color
     */
    private static readonly highlightStroke: Color = new Color(255, 255, 25);
    /**
     * Highlight fill color
     */
    private static readonly highlightFill: Color = new Color(255, 255, 0, 25);
    /**
     * Full transparency
     */
    private static readonly transparent: Color = new Color(0, 0, 0, 0);
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
    constructor(text: string, textOffsetX: number, textOffsetY: number, x: number, y: number, w: number, h: number, callback: () => void) {
        super('', Help.highlightFill, true, x, y, w, h, () => callback());
        this.tip = new Label(text, Help.highlightStroke, 1, false, 'left', 'top', x + textOffsetX, y + textOffsetY);
    }
    /**
     * Compute a single timestep for this help message
     */
    public tick(dt: number): void {
        this.time = (this.time + dt) % (Help.highlightBlinkMS * 2);
        if (this.time > Help.highlightBlinkMS) {
            super.color = Help.transparent;
        } else {
            super.color = Help.highlightFill;
        }
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Render label and button as highlighted region
        super.draw(graphics);
        this.tip.draw(graphics);
    }
}
