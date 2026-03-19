import { Drawable } from 'graphico';

export class Hole implements Drawable {
    private selected = false;
    /**
     * Create a new hole.
     * @param x The x-coordinate of the hole, in pixels
     * @param y The y-coordinate of the hole, in pixels
     * @param r The radius of the hole, in pixels
     * @param padding The distance factor in between holes
     */
    constructor(private readonly x: number, private readonly y: number, private readonly r: number, private readonly padding: number) { }
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
    /**
     * Determine if this hole intersects with another.
     */
    public intersects(other: Hole): boolean {
        return this.distanceFrom(other.x, other.y) < (this.r + other.r) * this.padding;
    }
    /**
     * Calculate the distance from this hole to another point.
     */
    public distanceFrom(x: number, y: number): number {
        return Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2);
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