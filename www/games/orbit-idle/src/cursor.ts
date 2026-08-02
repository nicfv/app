import { Drawable } from 'graphico';

/**
 * Represents the user's cursor
 */
export class Cursor implements Drawable {
    /**
     * X-coordinate [px]
     */
    private x: number;
    /**
     * Y-coordinate [px]
     */
    private y: number;
    /**
     * Create a new instance of a cursor
     */
    constructor() {
        this.x = 0;
        this.y = 0;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
}
