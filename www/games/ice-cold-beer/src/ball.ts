import { Drawable } from 'graphico';
import { Rod } from './rod';
import { Hole } from './hole';

export class Ball implements Drawable {
    private vx = 0;
    private near = false; // near to a hole?
    private readonly maxvx = 100; // max vx to fall into hole
    private readonly maxdf = 0.5; // max distance factor
    /**
     * Create a new ball.
     * @param x The initial x-position of the ball
     * @param y The initial y-position of the ball
     * @param r The radius of the ball
     * @param gameWidth The width of the game window
     * @param g The gravitation constant
     */
    constructor(private x: number, private y: number, private readonly r: number, private readonly gameWidth: number, private readonly g = 9.81 * 600) { }
    /**
     * Move the ball.
     */
    public move(dt: number, rod: Rod, holes: Hole[]): void {
        // Calculate the acceleration and position of the marble
        this.vx += Math.sin(rod.getAngle()) * this.g * dt / 1e3;
        this.x += this.vx * dt / 1e3;
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
        let latch = false;
        for (const hole of holes) {
            if (hole.distanceFrom(this.x, this.y) < this.r * this.maxdf) {
                latch = true;
                if (!this.near) {
                    if (Math.abs(this.vx) < this.maxvx) {
                        console.log('you win!');
                        this.near = true;
                    } else {
                        console.log('not yet buster');
                        this.near = true;
                        this.vx /= 2;
                    }
                }
            }
        }
        if (!latch) {
            this.near = false;
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