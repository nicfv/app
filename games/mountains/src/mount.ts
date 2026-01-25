import { Drawable } from 'graphico';
import { Color, Gradient } from 'viridis';
import * as SMath from 'smath';
import { game } from '.';

export class Mountain implements Drawable {
    private static readonly gradient: Gradient = new Gradient([
        Color.hex('#444488'),
        Color.hex('#223366'),
        Color.hex('#112255'),
        Color.hex('#001122'),
    ]);
    private readonly color: Color;
    private x_offset = 0;
    private readonly x_spacing: number;
    private readonly y_mean: number;
    private readonly mtnHeight: number;
    private readonly peaksValleys: number[] = [];
    constructor(private readonly distance: number) {
        this.color = Mountain.gradient.getColor(distance);
        this.y_mean = game.height * SMath.expand(distance, 0.75, 0.25);
        this.x_spacing = game.width * SMath.expand(distance, 0.10, 0.05);
        this.mtnHeight = game.height * SMath.expand(distance, 0.02, 0.01);
        this.peaksValleys = SMath.rdist(game.width / this.x_spacing + 2, this.y_mean, this.mtnHeight);
    }
    public step(dx: number, dt: number): void {
        const dx_final: number = dx * dt / 1000 * SMath.expand(this.distance, 3, 1);
        this.x_offset += dx_final;
        if (this.x_offset > this.x_spacing) {
            this.x_offset %= this.x_spacing;
            this.peaksValleys.splice(0, 1);
            this.peaksValleys.push(SMath.rnorm(this.y_mean, this.mtnHeight));
        }
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.fillStyle = this.color.toString();
        graphics.beginPath();
        graphics.moveTo(0, game.height);
        for (let x = 0; x < this.peaksValleys.length; x++) {
            graphics.lineTo(x * this.x_spacing - this.x_offset, this.peaksValleys[x]);
        }
        graphics.lineTo(game.width, game.height);
        graphics.closePath();
        graphics.fill();
    }
}