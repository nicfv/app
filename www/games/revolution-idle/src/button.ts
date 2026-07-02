import { Drawable } from 'graphico';
import { Color } from 'viridis';
import { FONT_FAMILY, FONT_SIZE } from './globals';

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
    constructor(protected text: string, protected color: Color, protected enabled: boolean, protected x: number, protected y: number, protected w: number, protected h: number, protected callback: () => void) {
        this.isHover = false;
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
        graphics.strokeStyle = this.enabled ? 'white' : 'pink';
        graphics.lineWidth = 2;
        graphics.fillRect(this.x | 0, this.y | 0, this.w | 0, this.h | 0);
        if (this.isHover) {
            graphics.strokeRect(this.x | 0, this.y | 0, this.w | 0, this.h | 0);
        }
        // Render text (line-by-line) on the button
        graphics.fillStyle = this.color.getContrastingColor().toString();
        graphics.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
        const lines: string[] = this.text.split('\n');
        for (const linenum in lines) {
            const line: string = lines[linenum];
            graphics.textAlign = 'center';
            graphics.textBaseline = 'top';
            graphics.fillText(line, (this.x + this.w / 2) | 0, (this.y + FONT_SIZE * (+linenum + 0.5)) | 0);
        }
    }
}
