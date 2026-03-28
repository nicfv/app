import { Drawable } from 'graphico';
import { Vec2 } from './types';
import { cellSize, gridSize, pan } from './globals';

export class Cell implements Drawable {
    private hover: boolean;
    constructor(private readonly gridPos: Vec2) {
        this.hover = false;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.fillStyle = 'lime';
        graphics.strokeStyle = 'green';
        graphics.lineWidth = 2;
        graphics.beginPath();
        graphics.arc(pan.x + this.gridPos.x * gridSize.x, pan.y + this.gridPos.y + gridSize.y, cellSize, 0, 2 * Math.PI);
        graphics.fill();
        graphics.stroke();
    }
}