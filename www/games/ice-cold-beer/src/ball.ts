import { Drawable } from 'graphico';
import { Rod } from './rod';

export class Ball implements Drawable {
    private freeFall = true;
    private vx = 0;
    private vy = 0;
    private readonly g: number = 9.81 * 100;
    constructor(private x: number, private y: number, private r: number) { }
    public move(dt: number, rod: Rod): void {
        const maxY: number = rod.getY(this.x) - (this.r / Math.cos(rod.getAngle())) - rod.width / 2;
        if (this.freeFall) {
            this.vy += this.g * dt / 1e3;
            this.y += this.vy * dt / 1e3;
            if (this.y > maxY) {
                this.y = maxY;
                this.freeFall = false;
            }
        } else {
            this.y = maxY;
        }
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Marble
        graphics.beginPath();
        graphics.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        graphics.fillStyle = 'darkgray';
        graphics.fill();
        // Outline
        graphics.strokeStyle = 'gray';
        graphics.lineWidth = 2;
        graphics.stroke();
        // Large reflection
        graphics.beginPath();
        graphics.arc(this.x + this.r / 2, this.y + this.r / 2, this.r / 6, 0, 2 * Math.PI);
        graphics.fillStyle = 'lightgray';
        graphics.fill();
        // Small reflection
        graphics.beginPath();
        graphics.arc(this.x - this.r / 3, this.y - this.r / 3, this.r / 3, 0, 2 * Math.PI);
        graphics.fillStyle = 'lightgray';
        graphics.fill();
    }
}