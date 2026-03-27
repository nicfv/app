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
     * Whether or not this has been marked as failed
     */
    private failed = false;
    /**
     * Create a new progress indicator
     */
    constructor(private readonly x: number, private readonly y: number, private readonly r: number) { }
    /**
     * Mark this progress indicator as completed
     */
    public complete(): void {
        this.completed = true;
    }
    /**
     * Mark this progress indicator as failed
     */
    public fail(): void {
        this.failed = true;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.fillStyle = 'gray';
        graphics.beginPath();
        graphics.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        graphics.fill();
        if (this.completed) {
            // Draw checkmark
            graphics.strokeStyle = 'lime';
            graphics.lineWidth = 2;
            graphics.lineCap = 'round';
            graphics.beginPath();
            graphics.moveTo(this.x - this.r / 2, this.y - this.r / 2);
            graphics.lineTo(this.x, this.y);
            graphics.lineTo(this.x + this.r, this.y - this.r);
            graphics.stroke();
        }
        if (this.failed) {
            // Draw x
            graphics.strokeStyle = 'red';
            graphics.lineWidth = 2;
            graphics.lineCap = 'round';
            graphics.beginPath();
            graphics.moveTo(this.x - this.r / 2, this.y);
            graphics.lineTo(this.x + this.r / 2, this.y + this.r);
            graphics.stroke();
            graphics.beginPath();
            graphics.moveTo(this.x + this.r / 2, this.y);
            graphics.lineTo(this.x - this.r / 2, this.y + this.r);
            graphics.stroke();
        }
    }
}