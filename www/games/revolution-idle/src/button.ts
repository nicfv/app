import { Drawable } from 'graphico';
import { Color } from 'viridis';
import { Text } from './text';

/**
 * The base class for a UI button.
 */
export class Button implements Drawable {
    /**
     * Determines whether the mouse is hovering over the button.
     */
    private isHover: boolean;
    /**
     * Text rendered on the button
     */
    private readonly buttonText: Text;
    /**
     * Initialize a new button.
     */
    constructor(protected text: string, protected color: Color, protected enabled: boolean, protected x: number, protected y: number, protected w: number, protected h: number, protected callback: () => void) {
        this.isHover = false;
        this.buttonText = new Text(text, color.getContrastingColor(), 1, false, 'center', 'top', this.x + this.w / 2, this.y + Text.fontSize / 2);
    }
    /**
     * Update the value, color, and positioning of the button text.
     */
    private syncText(): void {
        this.buttonText.value = this.text;
        this.buttonText.fill = this.color.getContrastingColor();
        this.buttonText.x = this.x + this.w / 2;
        this.buttonText.y = this.y + Text.fontSize / 2;
    }
    /**
     * Enable this button.
     */
    public enable(): void {
        this.enabled = true;
    }
    /**
     * Disable this button.
     */
    public disable(): void {
        this.enabled = false;
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
        if (button === 0 && this.isHover && this.enabled) {
            this.callback();
        }
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Render the button and outline, if needed
        graphics.fillStyle = this.color.toString();
        graphics.strokeStyle = this.enabled ? 'white' : 'hotpink';
        graphics.lineWidth = 2;
        graphics.fillRect(this.x | 0, this.y | 0, this.w | 0, this.h | 0);
        if (this.isHover) {
            graphics.strokeRect(this.x | 0, this.y | 0, this.w | 0, this.h | 0);
        }
        // Render text (line-by-line) on the button
        this.syncText();
        this.buttonText.draw(graphics);
    }
}
