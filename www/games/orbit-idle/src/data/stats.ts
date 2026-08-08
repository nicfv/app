import { Drawable } from 'graphico';
import { Label } from '../form-controls/label';
import { Color } from 'viridis';
import { Button } from '../form-controls/button';

/**
 * Represents an in-game statistics panel
 */
export class Statistics implements Drawable {
    private static readonly shade: Color = new Color(0, 0, 0, 50);
    private visible: boolean;
    private readonly title: Label;
    private readonly headers: Label;
    private readonly content: Label;
    private readonly close: Button;
    /**
     * Create a new statistics window
     */
    constructor(public stats: Stats = defaultStats) {
        this.visible = false;
        this.title = new Label('Orbit Idle: Statistics', new Color(255, 255, 255), 2, true, 'center', 'bottom', 0, Label.fontSize * 14);
        this.headers = new Label('Test', new Color(255, 255, 255), 1, false, 'right', 'top', 0, Label.fontSize * 15);
        this.content = new Label('Test', new Color(255, 255, 255), 1, true, 'left', 'top', 0, Label.fontSize * 15);
        this.close = new Button('x', new Color(255, 100, 100), true, Label.fontSize / 2, Label.fontSize / 2, Label.fontSize * 2, Label.fontSize * 2, null, () => this.hide());
    }
    /**
     * Show the statistics panel
     */
    public show(): void {
        this.visible = true;
    }
    /**
     * Hide the statistics panel
     */
    private hide(): void {
        this.visible = false;
    }
    /**
     * Check to see if the mouse is hovering over the close button
     */
    public checkHover(x: number, y: number): void {
        if (this.visible) {
            this.close.checkHover(x, y);
        }
    }
    /**
     * Check to see if the user clicked the close button
     */
    public click(button: number): void {
        if (this.visible) {
            this.close.click(button);
        }
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        if (!this.visible) {
            return;
        }
        graphics.fillStyle = Statistics.shade.toString();
        graphics.fillRect(0, 0, graphics.canvas.width, graphics.canvas.height);
        this.title.x = graphics.canvas.width / 2;
        this.headers.x = (graphics.canvas.width - Label.fontSize) / 2;
        this.content.x = (graphics.canvas.width + Label.fontSize) / 2;
        this.title.draw(graphics);
        this.headers.draw(graphics);
        this.content.draw(graphics);
        this.close.draw(graphics);
    }
}

/**
 * Interface containing various in-game statistics
 */
export interface Stats {
    moneyEarned: number;
    moneySpent: number;
    orbitsCompleted: number;
    speedLevelsPurchased: number;
    ascensionsPurchased: number;
}

const defaultStats: Stats = {
    moneyEarned: 0,
    moneySpent: 0,
    orbitsCompleted: 0,
    speedLevelsPurchased: 0,
    ascensionsPurchased: 0,
};
