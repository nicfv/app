import { Drawable } from 'graphico';
import { distance, Vec2 } from './lib';
import { Grid } from './grid';

export class Cell implements Drawable {
    /**
     * Whether or not the mouse is hovering over this cell
     */
    private hover: boolean;
    constructor(private readonly gridPos: Vec2, private readonly grid: Grid, private readonly size: number) {
        this.hover = false;
    }
    /**
     * Calculate the center of this cell.
     */
    private getCenter(): Vec2 {
        return {
            x: this.grid.pan().x + this.gridPos.x * this.grid.size.x,
            y: this.grid.pan().y + this.gridPos.y * this.grid.size.y,
        };
    }
    /**
     * Determine if this cell is on a specific grid position.
     */
    private isOn(gridPos: Vec2): boolean {
        return this.gridPos.x === gridPos.x && this.gridPos.y === gridPos.y;
    }
    /**
     * Check if the mouse is hovering over this cell.
     */
    public checkHover(mousePos: Vec2): void {
        this.hover = (distance(this.getCenter(), mousePos) < this.size);
    }
    /**
     * Multiply a cell if the 2 adjacent positions are available.
     */
    public split(cells: Cell[]): void {
        if (!this.hover) {
            return;
        }
        const left: Vec2 = { x: this.gridPos.x + 1, y: this.gridPos.y };
        const down: Vec2 = { x: this.gridPos.x, y: this.gridPos.y + 1 };
        const leftFree: boolean = typeof cells.find(cell => cell.isOn(left)) === 'undefined';
        const downFree: boolean = typeof cells.find(cell => cell.isOn(down)) === 'undefined';
        if (leftFree && downFree) {
            cells.splice(cells.findIndex(cell => cell.isOn(this.gridPos)), 1);
            cells.push(new Cell(left, this.grid, this.size));
            cells.push(new Cell(down, this.grid, this.size));
        }
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.beginPath();
        graphics.arc(this.getCenter().x, this.getCenter().y, this.size, 0, 2 * Math.PI);
        if (this.hover) {
            graphics.strokeStyle = 'red';
            graphics.lineWidth = this.size * 0.5;
            graphics.stroke();
        }
        graphics.fillStyle = 'lime';
        graphics.fill();
        graphics.strokeStyle = 'green';
        graphics.lineWidth = this.size * 0.2;
        graphics.stroke();
    }
}
