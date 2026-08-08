import { Drawable } from 'graphico';
import { Button } from '../form-controls/button';
import { Color } from 'viridis';
import { Label } from '../form-controls/label';
import { player } from '../data/state';

/**
 * Represents a zoom control.
 */
export class Zoom implements Drawable {
    /**
     * Button sizing
     */
    private static readonly btnSize: number = Label.fontSize * 2;
    /**
     * Button padding
     */
    private static readonly btnPad: number = Label.fontSize / 2;
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
     * Zoom factor text
     */
    private readonly label: Label;
    /**
     * Create a new zoom control.
     */
    constructor(x: number, y: number, private zoom: number = player.getNumOrbits()) {
        this.zoomOutBtn = new Button('-', Zoom.btnColor, true, x - Zoom.btnSize - Zoom.btnPad / 2, y, Zoom.btnSize, Zoom.btnSize, ['-', '_'], () => this.zoomOut());
        this.zoomInBtn = new Button('+', Zoom.btnColor, true, x + Zoom.btnPad / 2, y, Zoom.btnSize, Zoom.btnSize, ['=', '+'], () => this.zoomIn());
        this.label = new Label('', new Color(255, 255, 255), 1, false, 'center', 'bottom', x, y - Zoom.btnPad);
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
        if (this.zoom < player.getNumOrbits()) {
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
     * Reset the zoom factor
     */
    public reset(): void {
        this.zoom = player.getNumOrbits();
        this.setButtonAbility();
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
        if (this.zoom < player.getNumOrbits()) {
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
    /**
     * Check to see if the user inputted any hotkeys.
     */
    public checkHotkeys(key: string): void {
        this.zoomInBtn.hotkey(key);
        this.zoomOutBtn.hotkey(key);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        this.zoomInBtn.draw(graphics);
        this.zoomOutBtn.draw(graphics);
        // Render the zoom text
        this.label.value = `Zoom x${this.zoom}`;
        this.label.draw(graphics);
    }
}
