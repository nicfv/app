import { Drawable } from 'graphico';
import { Vec2 } from './lib';

export class Grid implements Drawable {
    private panX: number;
    private panY: number;
    constructor(public readonly size: Vec2, private readonly bounds: Vec2) {
        this.panX = 0;
        this.panY = 0;
    }
    public pan(direction: Direction = 'None'): Vec2 {
        switch (direction) {
            case ('Down'): {
                this.panY--;
                break;
            }
            case ('Left'): {
                this.panX++;
                break;
            }
            case ('Right'): {
                this.panX--;
                break;
            }
            case ('Up'): {
                this.panY++;
                break;
            }
        }
        return { x: this.panX, y: this.panY };
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        if (this.panX > graphics.canvas.width || this.panY > graphics.canvas.height) {
            return; // out of bounds
        }
        graphics.strokeStyle = 'gray';
        graphics.lineWidth = 1;
        // draw horizontal axes
        for (let y = 0; y < this.bounds.y; y++) {
            const y_act: number = y * this.size.y + this.panY;
            if (y_act > 0 && y_act < graphics.canvas.height) {
                graphics.beginPath()
                graphics.moveTo(Math.max(0, this.panX), y_act);
                graphics.lineTo(graphics.canvas.width, y_act);
                graphics.stroke();
            }
        }
        // draw vertical axes
        for (let x = 0; x < this.bounds.x; x++) {
            const x_act: number = x * this.size.x + this.panX;
            if (x_act > 0 && x_act < graphics.canvas.width) {
                graphics.beginPath()
                graphics.moveTo(x_act, 0);
                graphics.lineTo(x_act, Math.min(this.panY, graphics.canvas.height));
                graphics.stroke();
            }
        }
    }
}

export type Direction = 'Left' | 'Right' | 'Up' | 'Down' | 'None';
