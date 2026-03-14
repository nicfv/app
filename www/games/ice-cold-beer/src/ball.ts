import { Drawable } from 'graphico';

export class Ball implements Drawable {
    constructor(private x: number, private y: number, private r: number) { }
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