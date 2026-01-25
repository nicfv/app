import { Drawable } from 'graphico';
import { Color, Gradient } from 'viridis';
import * as SMath from 'smath';
import { game } from '.';

export class Star implements Drawable {
    private static readonly temp_gradient: Gradient = new Gradient([
        Color.rgb(255, 100, 100), //  2,500 [K]
        Color.rgb(255, 255, 150), //  5,000 [K]
        Color.rgb(255, 255, 255), //  7,500 [K]
        Color.rgb(150, 150, 255), // 10,000 [K]
    ]);
    private readonly color: Color;
    constructor(private x: number, private y: number, private readonly r: number, private readonly distance: number, temp: number) {
        this.color = Star.temp_gradient.getColor(temp, 2500, 10000);
    }
    public static rand(): Star {
        return new Star(SMath.runif(0, game.width), SMath.runif(0, game.height), SMath.runif(1, 3), SMath.rint(10, 100), SMath.rnorm(6000, 2000));
    }
    public move(dx: number, dy: number, dt: number): void {
        this.x -= dx * dt / this.distance;
        this.y -= dy * dt / this.distance;
        this.x = (game.width + this.x) % game.width;
        this.y = (game.height + this.y) % game.height;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        const grad = graphics.createRadialGradient(this.x, this.y, 0, this.x, this.y, 4 * this.r);
        grad.addColorStop(0, this.color.toString());
        grad.addColorStop(1, Color.rgb(0, 0, 0, 0).toString());
        graphics.fillStyle = grad;
        graphics.beginPath();
        graphics.arc(this.x, this.y, 20 * this.r, 0, 2 * Math.PI);
        graphics.fill();
        graphics.fillStyle = this.color.toString();
        graphics.beginPath();
        graphics.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        graphics.fill();
    }
}