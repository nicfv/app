import { Drawable } from 'graphico';
import { translate } from 'smath';

export class Rod implements Drawable {
    public readonly width = 10;
    constructor(private readonly lx: number, private ly: number, private readonly rx: number, private ry: number) { }
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