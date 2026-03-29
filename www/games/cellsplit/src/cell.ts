import { Drawable } from 'graphico';
import { distance, Vec2 } from './lib';
import { cellSize, gridSize, pan } from './globals';

export class Cell implements Drawable {
    private hover: boolean;
    constructor(private readonly gridPos: Vec2) {
        this.hover = false;
    }
    /**
     * Calculate the center of this cell.
     */
    private getCenter(): Vec2 {
        return {
            x: pan.x + this.gridPos.x * gridSize.x,
            y: pan.y + this.gridPos.y * gridSize.y,
        };
    }
    /**
     * Check if the mouse is hovering over this cell.
     */
    public checkHover(mousePos: Vec2): void {
        this.hover = (distance(this.getCenter(), mousePos) < cellSize);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.beginPath();
        graphics.arc(this.getCenter().x, this.getCenter().y, cellSize, 0, 2 * Math.PI);
        if (this.hover) {
            graphics.strokeStyle = 'red';
            graphics.lineWidth = cellSize * 0.5;
            graphics.stroke();
        }
        graphics.fillStyle = 'lime';
        graphics.fill();
        graphics.strokeStyle = 'green';
        graphics.lineWidth = cellSize * 0.2;
        graphics.stroke();
    }
}