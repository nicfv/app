import { Drawable } from 'graphico';
import { Rod } from './rod';

export class Ball implements Drawable {
    private x = 0;
    private y = 0;
    private vx = 0;
    private readonly g: number = 9.81;
    constructor(private r: number, private gameWidth: number) { }
    public move(dt: number, rod: Rod): void {
        // Calculate the acceleration and position of the marble
        this.vx += Math.sin(rod.getAngle()) * this.g * dt / 1e3;
        this.x += this.vx * dt;
        if (this.x <= this.r) {
            // Hit left side
            this.x = this.r;
            this.vx = 0;
        } else if (this.x >= this.gameWidth - this.r) {
            // Hit right side
            this.x = this.gameWidth - this.r;
            this.vx = 0;
        }
        // Assume ball is "stuck" to the rod
        this.y = rod.getY(this.x) - (this.r / Math.cos(rod.getAngle())) - rod.width / 2;
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