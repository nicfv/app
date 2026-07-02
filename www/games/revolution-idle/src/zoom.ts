import { Drawable } from 'graphico';
import { Button } from './button';
import { Color } from 'viridis';
import { FONT_FAMILY, FONT_SIZE, NUM_WHEELS } from './globals';

/**
 * Represents a zoom control.
 */
export class Zoom implements Drawable {
    /**
     * Button sizing
     */
    private static readonly btnSize: number = FONT_SIZE * 2;
    /**
     * Button padding
     */
    private static readonly btnPad: number = FONT_SIZE / 2;
    /**
     * Zoom in button
     */
    private readonly zoomIn: Button;
    /**
     * Zoom out button
     */
    private readonly zoomOut: Button;
    /**
     * Create a new zoom control.
     */
    constructor(private readonly x: number, private readonly y: number, private zoom: number = NUM_WHEELS) {
        this.zoomIn = new Button('+', new Color(200, 200, 200), x, y, Zoom.btnSize, Zoom.btnSize, () => {
            if (this.zoom < NUM_WHEELS) {
                this.zoom++;
            }
        });
        this.zoomOut = new Button('-', new Color(200, 200, 200), x + Zoom.btnSize + Zoom.btnPad, y, Zoom.btnSize, Zoom.btnSize, () => {
            if (this.zoom > 1) {
                this.zoom--;
            }
        });
    }
    /**
     * Get the zoom factor.
     */
    public getZoom(): number {
        return this.zoom;
    }
    /**
     * Check if the mouse is currently hovering over any of the controls.
     */
    public checkHover(mx: number, my: number): void {
        this.zoomIn.checkHover(mx, my);
        this.zoomOut.checkHover(mx, my);
    }
    /**
     * Check if the mouse has clicked on any of the controls.
     */
    public click(button: number): void {
        this.zoomIn.click(button);
        this.zoomOut.click(button);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        this.zoomIn.draw(graphics);
        this.zoomOut.draw(graphics);
        // Render the zoom text
        graphics.fillStyle = 'white';
        graphics.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
        graphics.textAlign = 'center';
        graphics.textBaseline = 'bottom';
        graphics.fillText(`Zoom x${this.zoom}`, this.x + Zoom.btnSize + Zoom.btnPad / 2, this.y - Zoom.btnPad);
    }
}