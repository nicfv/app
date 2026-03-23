import { Drawable } from 'graphico';

/**
 * A progress indicator to show how far you've gone through the game
 */
export class Progress implements Drawable {
    /**
     * Whether or not this has been marked as completed
     */
    private completed = false;
    /**
     * Create a new progress indicator
     */
    constructor(private readonly x: number, private readonly y: number, private readonly r: number) { }
    /**
     * Mark this progress indicator as completed
     */
    public markComplete(): void {
        this.completed = true;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
}