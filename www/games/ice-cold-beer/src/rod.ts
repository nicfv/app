import { Drawable } from 'graphico';
import { translate, clamp } from 'smath';

type Control = 'Up' | 'Down' | 'None';

export class Rod implements Drawable {
    private readonly lx: number;
    private readonly rx: number;
    /**
     * Create a new rod.
     * @param ly The elevation of the left side of the rod
     * @param ry The elevation of the right side of the rod
     * @param gameWidth The width of the game window
     * @param gameHeight The height of the game window
     * @param px_per_sec The speed at which the rod can be moved
     * @param width The thickness of the rod
     */
    constructor(private ly: number, private ry: number, gameWidth: number, private readonly gameHeight: number, private readonly px_per_sec = 100, public readonly width = 10) {
        this.lx = 0;
        this.rx = gameWidth;
    }
    /**
     * Get the angle in radians of the rod.
     */
    public getAngle(): number {
        return Math.atan2(this.ry - this.ly, this.rx - this.lx);
    }
    /**
     * Get the height of the rod at a certain X-position.
     */
    public getY(x: number): number {
        return translate(x, this.lx, this.rx, this.ly, this.ry);
    }
    /**
     * Move the rod based on user input.
     */
    public move(dt: number, left: Control, right: Control): void {
        const speed: number = this.px_per_sec * dt / 1000;
        if (left === 'Up') {
            this.ly -= speed;
        } else if (left === 'Down') {
            this.ly += speed;
        }
        this.ly = clamp(this.ly, this.width, this.gameHeight - this.width);
        if (right === 'Up') {
            this.ry -= speed;
        } else if (right === 'Down') {
            this.ry += speed;
        }
        this.ry = clamp(this.ry, this.width, this.gameHeight - this.width);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.lineCap = 'round';
        graphics.beginPath();
        graphics.moveTo(this.lx, this.ly);
        graphics.lineTo(this.rx, this.ry);
        graphics.strokeStyle = 'gray';
        graphics.lineWidth = this.width;
        graphics.stroke();
        graphics.strokeStyle = 'darkgray';
        graphics.lineWidth = 0.6 * this.width;
        graphics.stroke();
        graphics.strokeStyle = 'lightgray';
        graphics.lineWidth = 0.2 * this.width;
        graphics.stroke();
    }
}