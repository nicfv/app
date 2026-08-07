import { Drawable } from 'graphico';
import { Label } from './label';
import { Color } from 'viridis';

/**
 * Represents an in-game statistics panel
 */
export class Statistics implements Drawable {
    private static readonly shade: Color = new Color(0, 0, 0, 50);
    private readonly title: Label;
    private readonly headers: Label;
    private readonly content: Label;
    /**
     * Create a new statistics window
     */
    constructor() {
        this.title = new Label('Orbit Idle: Statistics', new Color(255, 255, 255), 2, true, 'center', 'bottom', 0, Label.fontSize * 14);
        this.headers = new Label('Test', new Color(255, 255, 255), 1, false, 'right', 'top', 0, Label.fontSize * 15);
        this.content = new Label('Test', new Color(255, 255, 255), 1, true, 'left', 'top', 0, Label.fontSize * 15);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.fillStyle = Statistics.shade.toString();
        graphics.fillRect(0, 0, graphics.canvas.width, graphics.canvas.height);
        this.title.x = graphics.canvas.width / 2;
        this.headers.x = (graphics.canvas.width - Label.fontSize) / 2;
        this.content.x = (graphics.canvas.width + Label.fontSize) / 2;
        this.title.draw(graphics);
        this.headers.draw(graphics);
        this.content.draw(graphics);
    }
}
