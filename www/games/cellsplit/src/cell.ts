import { Drawable } from 'graphico';
import { Vec2 } from './types';
import { cellSize, gridSize, pan } from './globals';

export class Cell implements Drawable {
    private hover: boolean;
    constructor(private readonly gridPos: Vec2) {
        this.hover = false;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.beginPath();
        graphics.arc(pan.x + this.gridPos.x * gridSize.x, pan.y + this.gridPos.y * gridSize.y, cellSize, 0, 2 * Math.PI);
        if (this.hover) {
            graphics.strokeStyle = 'yellow';
            graphics.lineWidth = cellSize * 0.5;
        }
        graphics.fillStyle = 'lime';
        graphics.fill();
        graphics.strokeStyle = 'green';
        graphics.lineWidth = cellSize * 0.2;
        graphics.stroke();
    }
}