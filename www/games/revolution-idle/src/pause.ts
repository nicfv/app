import { Drawable } from 'graphico';
import { Label } from './label';
import { Color } from 'viridis';

/**
 * Represents a pause message
 */
export class Pause extends Label implements Drawable {
    /**
     * Create a new help message with optional highlighted region.
     */
    constructor(text: string) {
        super(text, new Color(255, 255, 255), 1, false, 'center', 'top', 0, 0);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Make sure text is centered on page
        super.x = graphics.canvas.width / 2;
        super.y = (graphics.canvas.height - super.getHeight()) / 2;
        super.draw(graphics);
    }
}
