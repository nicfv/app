import { Drawable } from 'graphico';
import { distance, Vec2 } from './lib';
import { pan } from './globals';
import { Grid } from './grid';

export class Cell implements Drawable {
    /**
     * The cell radius, in pixels
     */
    private static readonly size = 5;
    /**
     * Whether or not the mouse is hovering over this cell
     */
    private hover: boolean;
    constructor(private readonly gridPos: Vec2, private readonly grid: Grid) {
        this.hover = false;
    }
    /**
     * Calculate the center of this cell.
     */
    private getCenter(): Vec2 {
        return {
            x: pan.x + this.gridPos.x * this.grid.size.x,
            y: pan.y + this.gridPos.y * this.grid.size.y,
        };
    }
    /**
     * Check if the mouse is hovering over this cell.
     */
    public checkHover(mousePos: Vec2): void {
        this.hover = (distance(this.getCenter(), mousePos) < Cell.size);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.beginPath();
        graphics.arc(this.getCenter().x, this.getCenter().y, Cell.size, 0, 2 * Math.PI);
        if (this.hover) {
            graphics.strokeStyle = 'red';
            graphics.lineWidth = Cell.size * 0.5;
            graphics.stroke();
        }
        graphics.fillStyle = 'lime';
        graphics.fill();
        graphics.strokeStyle = 'green';
        graphics.lineWidth = Cell.size * 0.2;
        graphics.stroke();
    }
}