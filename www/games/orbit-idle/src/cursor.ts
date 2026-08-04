import { Drawable } from 'graphico';
import { Vec3 } from 'smath';

/**
 * Represents the user's cursor
 */
export class Cursor implements Drawable {
    /**
     * Star radius
     */
    private static readonly lgR = 4;
    /**
     * Planet radius
     */
    private static readonly smR = 2;
    /**
     * Mouse coordinates
     */
    private pos: Vec3;
    /**
     * The angle of the orbiting planet
     */
    private planetAngle: number;
    /**
     * Create a new instance of a cursor
     */
    constructor() {
        this.pos = new Vec3(0, 0);
        this.planetAngle = 0;
    }
    /**
     * Move the cursor when the user moves the mouse
     */
    public move(x: number, y: number): void {
        this.pos = new Vec3(x, y);
    }
    /**
     * Rotate the small planet
     */
    public tick(dt: number): void {
        this.planetAngle = (this.planetAngle + dt) % (2 * Math.PI);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.fillStyle = 'white';
        graphics.beginPath();
        graphics.arc(this.pos.x, this.pos.y, Cursor.lgR, 0, 2 * Math.PI);
        graphics.fill();
        const planetPos: Vec3 = this.pos.plus(Vec3.fromPolar(Cursor.lgR + Cursor.smR, this.planetAngle));
        graphics.fillStyle = 'red';
        graphics.beginPath();
        graphics.arc(planetPos.x, planetPos.y, Cursor.smR, 0, 2 * Math.PI);
        graphics.fill();
    }
}
