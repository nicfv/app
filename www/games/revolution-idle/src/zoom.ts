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
     * Button color
     */
    private static readonly btnColor: Color = new Color(200, 200, 200);
    /**
     * Zoom in button
     */
    private readonly zoomInBtn: Button;
    /**
     * Zoom out button
     */
    private readonly zoomOutBtn: Button;
    /**
     * Create a new zoom control.
     */
    constructor(private readonly x: number, private readonly y: number, private zoom: number = NUM_WHEELS) {
        this.zoomOutBtn = new Button('-', Zoom.btnColor, true, x, y, Zoom.btnSize, Zoom.btnSize, () => this.zoomOut());
        this.zoomInBtn = new Button('+', Zoom.btnColor, true, x + Zoom.btnSize + Zoom.btnPad, y, Zoom.btnSize, Zoom.btnSize, () => this.zoomIn());
        this.setButtonAbility();
    }
    /**
     * Get the zoom factor.
     */
    public getZoom(): number {
        return this.zoom;
    }
    /**
     * Zoom in
     */
    private zoomIn(): void {
        if (this.zoom < NUM_WHEELS) {
            this.zoom++;
            this.setButtonAbility();
        }
    }
    /**
     * Zoom out
     */
    private zoomOut(): void {
        if (this.zoom > 1) {
            this.zoom--;
            this.setButtonAbility();
        }
    }
    /**
     * Set the enabled/disabled property for the zoom in/out buttons.
     */
    private setButtonAbility(): void {
        if (this.zoom > 1) {
            this.zoomOutBtn.enable();
        } else {
            this.zoomOutBtn.disable();
        }
        if (this.zoom < NUM_WHEELS) {
            this.zoomInBtn.enable();
        } else {
            this.zoomInBtn.disable();
        }
    }
    /**
     * Check if the mouse is currently hovering over any of the controls.
     */
    public checkHover(mx: number, my: number): void {
        this.zoomInBtn.checkHover(mx, my);
        this.zoomOutBtn.checkHover(mx, my);
    }
    /**
     * Check if the mouse has clicked on any of the controls.
     */
    public click(button: number): void {
        this.zoomInBtn.click(button);
        this.zoomOutBtn.click(button);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        this.zoomInBtn.draw(graphics);
        this.zoomOutBtn.draw(graphics);
        // Render the zoom text
        graphics.fillStyle = 'white';
        graphics.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
        graphics.textAlign = 'center';
        graphics.textBaseline = 'bottom';
        graphics.fillText(`Zoom x${this.zoom}`, this.x + Zoom.btnSize + Zoom.btnPad / 2, this.y - Zoom.btnPad);
    }
}