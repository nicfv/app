import { Drawable } from 'graphico';

export class Hole implements Drawable {
    private selected = false;
    /**
     * Create a new hole.
     * @param x The x-coordinate of the hole, in pixels
     * @param y The y-coordinate of the hole, in pixels
     * @param r The radius of the hole, in pixels
     */
    constructor(public readonly x: number, public readonly y: number, public readonly r: number) { }
    /**
     * Set this hole as the goal.
     */
    public select(): void {
        this.selected = true;
    }
    /**
     * Remove this hole from being the goal.
     */
    public deselect(): void {
        this.selected = false;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        if (this.selected) {
            graphics.beginPath();
            graphics.arc(this.x, this.y, this.r * 1.2, 0, 2 * Math.PI);
            graphics.fillStyle = 'white';
            graphics.fill();
        }
        graphics.beginPath();
        graphics.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        graphics.fillStyle = 'brown';
        graphics.fill();
        graphics.beginPath();
        graphics.arc(this.x, this.y + this.r * 0.2, this.r * 0.8, 0, 2 * Math.PI);
        graphics.fillStyle = 'black';
        graphics.fill();
    }
}