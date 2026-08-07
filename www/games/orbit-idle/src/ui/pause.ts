import { Drawable } from 'graphico';
import { Label } from '../form-controls/label';
import { Color } from 'viridis';

/**
 * Represents a pause message
 */
export class Pause extends Label implements Drawable {
    /**
     * Semi-transparent background to shade canvas
     */
    private static readonly background: Color = new Color(0, 0, 0, 50);
    /**
     * Create a new help message with optional highlighted region.
     */
    constructor(text: string) {
        super(text, new Color(255, 255, 255), 1.5, true, 'center', 'top', 0, 0);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Shade canvas with background
        graphics.fillStyle = Pause.background.toString();
        graphics.fillRect(0, 0, graphics.canvas.width, graphics.canvas.height);
        // Make sure text is centered on page
        super.x = graphics.canvas.width / 2;
        super.y = (graphics.canvas.height - super.getHeight()) / 2;
        super.draw(graphics);
    }
}
