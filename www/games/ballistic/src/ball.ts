import { Drawable } from 'graphico';
import { Rod } from './rod';
import { Hole } from './hole';
import { SMath } from 'smath';

export class Ball implements Drawable {
    private rolling = false;
    private x = 0;
    private y = 0;
    private vx = 0;
    private vy = 0;
    private angle = 0;
    private near = false;
    private fallInto?: Hole;
    private fallDuration = 0;
    /**
     * Create a new ball.
     * @param x The initial x-position of the ball
     * @param y The initial y-position of the ball
     * @param r The radius of the ball
     * @param gameWidth The width of the game window
     * @param g The gravitation constant
     * @param airResistance The decaying factor of horizontal speed due to air resistance
     * @param maxSpeed The maximum speed at which a ball can fall into a hole
     * @param maxDistanceFactor The maximum distance factor (of radius) away at which a ball can fall into a hole
     * @param showSpeed Show the speedometer
     */
    constructor(private readonly startX: number, private readonly startY: number, private readonly r: number, private readonly gameWidth: number, private readonly g = 5000, private readonly airResistance = 0.99, private readonly maxSpeed = 100, private readonly maxDistanceFactor = 0.25, private readonly fallAnimDurationSec = 0.5, private readonly showSpeed = false) {
        this.x = startX;
        this.y = startY;
    }
    /**
     * Check if the ball is moving too fast to fall in a hole.
     */
    private tooFast(): boolean {
        return Math.abs(this.vx) > this.maxSpeed;
    }
    /**
     * Determine if the fall animation has completed.
     */
    private fallAnimComplete(): boolean {
        return this.fallDuration > this.fallAnimDurationSec;
    }
    /**
     * Reposition of the ball.
     */
    public reset(x: number = this.startX, y: number = this.startY): void {
        this.rolling = false;
        this.vx = 0;
        this.vy = 0;
        this.angle = 0;
        this.near = false;
        this.fallInto = undefined;
        this.fallDuration = 0;
        this.x = x;
        this.y = y;
    }
    /**
     * Determine if the game is won.
     */
    public won(): boolean {
        if (this.fallInto && this.fallAnimComplete()) {
            return this.fallInto.isGoal();
        }
        return false;
    }
    /**
     * Determine if the game is lost.
     */
    public lost(): boolean {
        if (this.fallInto && this.fallAnimComplete()) {
            return !this.fallInto.isGoal();
        }
        return false;
    }
    /**
     * Move the ball.
     */
    public move(dt: number, rod: Rod, holes: Hole[]): void {
        if (this.fallInto) {
            this.fallDuration += dt / 1e3;
            return;
        }
        // Calculate acceleration
        if (this.rolling) {
            // Calculate the acceleration and position of the marble
            this.vx += Math.sin(rod.getAngle()) * this.g * dt / 1e3;
        } else {
            // Ball is in the air
            this.vx *= this.airResistance;
            this.vy += this.g * dt / 1e3;
            this.y += this.vy * dt / 1e3;
        }
        // Laws of motion
        this.x += this.vx * dt / 1e3;
        this.y += this.vy * dt / 1e3;
        this.angle += this.vx / this.r * dt / 1e3;
        // Game boundary
        if (this.x <= this.r) {
            // Hit left side
            this.x = this.r;
            this.vx = 0;
        } else if (this.x >= this.gameWidth - this.r) {
            // Hit right side
            this.x = this.gameWidth - this.r;
            this.vx = 0;
        }
        // Calculate the height of the rod at the ball's x-coordinate
        const rodY: number = rod.getY(this.x) - (this.r / Math.cos(rod.getAngle())) - rod.width / 2;
        if (this.rolling) {
            // Assume ball is "stuck" to the rod
            this.y = rodY;
        } else if (this.y > rodY) {
            // Make sure that ball hasn't "phased-through" the rod
            this.y = rodY;
            this.vy = 0;
            this.rolling = true;
        }
        // Check to see if this ball would fall into any holes
        let latch = false;
        for (const hole of holes) {
            if (hole.distanceFrom(this.x, this.y) < this.r * this.maxDistanceFactor) {
                latch = true;
                if (!this.near && this.rolling) {
                    if (!this.tooFast()) {
                        this.fallInto = hole;
                    } else {
                        this.near = true;
                        this.vx /= 2;
                        this.vy = -Math.abs(this.vx);
                        this.rolling = false;
                    }
                }
            }
        }
        // Unlatch proximity to hole
        if (!latch) {
            this.near = false;
        }
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Save and manipulate
        graphics.save();
        const yTranslate: number = SMath.translate(SMath.clamp(this.fallDuration, 0, this.fallAnimDurationSec), 0, this.fallAnimDurationSec, 0, this.r / 2);
        const scaleFactor: number = SMath.translate(SMath.clamp(this.fallDuration, 0, this.fallAnimDurationSec), 0, this.fallAnimDurationSec, 1, 0);
        graphics.translate(this.x, this.y + yTranslate);
        graphics.scale(scaleFactor, scaleFactor);
        graphics.rotate(this.angle);
        // Marble
        graphics.beginPath();
        graphics.arc(0, 0, this.r, 0, 2 * Math.PI);
        graphics.fillStyle = 'darkgray';
        graphics.fill();
        // Outline
        graphics.strokeStyle = 'gray';
        graphics.lineWidth = 2;
        graphics.stroke();
        // Large reflection
        graphics.beginPath();
        graphics.arc(this.r / 2, this.r / 2, this.r / 6, 0, 2 * Math.PI);
        graphics.fillStyle = 'lightgray';
        graphics.fill();
        // Small reflection
        graphics.beginPath();
        graphics.arc(-this.r / 3, -this.r / 3, this.r / 3, 0, 2 * Math.PI);
        graphics.fillStyle = 'lightgray';
        graphics.fill();
        // Restore
        graphics.restore();
        if (this.showSpeed) {
            if (this.tooFast()) {
                graphics.fillStyle = 'red';
            } else {
                graphics.fillStyle = 'green';
            }
            graphics.fillRect(0, 0, 10, 10);
        }
    }
}