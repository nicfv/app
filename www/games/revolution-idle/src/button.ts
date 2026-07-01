import { Drawable } from 'graphico';
import { Color } from 'viridis';

/**
 * The base class for a UI button.
 */
export class Button implements Drawable {
    /**
     * Determines whether the mouse is hovering over the button.
     */
    private isHover: boolean;
    /**
     * Initialize a new button.
     */
    constructor(public text: string, public color: Color, public x: number, public y: number, public w: number, public h: number, private callback: () => void) {
        this.isHover = false;
    }
    /**
     * Check if the mouse is currently hovering over this button.
     */
    public checkHover(mx: number, my: number): void {
        this.isHover = (mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h);
    }
    /**
     * Attempt to click this button.
     */
    public click(button: number): void {
        if (button === 0 && this.isHover) {
            this.callback();
        }
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        throw new Error('Method not implemented.');
    }
}
