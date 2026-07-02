import { Drawable } from 'graphico';
import { Button } from './button';
import { Color } from 'viridis';
import { NUM_WHEELS } from './globals';

export class Zoom implements Drawable {
    private readonly zoomIn: Button;
    private readonly zoomOut: Button;
    constructor(private zoom: number = NUM_WHEELS) {
        this.zoomIn = new Button('+', new Color(200, 200, 200), 700, 150, 25, 25, () => {
            if (this.zoom < NUM_WHEELS) {
                this.zoom++;
            }
        });
        this.zoomOut = new Button('-', new Color(200, 200, 200), 750, 150, 25, 25, () => {
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
    }
}