import { Drawable } from 'graphico';

/**
 * Represents the user's cursor
 */
export class Cursor implements Drawable {
    /**
     * Star radius
     */
    private static readonly lgR = 4;
    /**
     * Planet radius
     */
    private static readonly smR = 2;
    /**
     * X-coordinate [px]
     */
    private x: number;
    /**
     * Y-coordinate [px]
     */
    private y: number;
    private planetAngle: number;
    /**
     * Create a new instance of a cursor
     */
    constructor() {
        this.x = 0;
        this.y = 0;
        this.planetAngle = 0;
    }
    /**
     * Move the cursor when the user moves the mouse
     */
    public move(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
    public tick(dt: number): void {
        this.planetAngle = (this.planetAngle + dt) % (2 * Math.PI);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.fillStyle = 'white';
        graphics.beginPath();
        graphics.arc(this.x, this.y, Cursor.lgR, 0, 2 * Math.PI);
        graphics.fill();
        graphics.fillStyle = 'red';
        graphics.beginPath();
        graphics.arc(this.x + (Cursor.lgR + Cursor.smR), this.y, Cursor.smR, 0, 2 * Math.PI);
        graphics.fill();
    }
}
