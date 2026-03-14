import { Drawable } from 'graphico';

export class Rod implements Drawable {
    constructor(private readonly lx: number, private ly: number, private readonly rx: number, private ry: number) { }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.beginPath();
        graphics.moveTo(this.lx, this.ly);
        graphics.lineTo(this.rx, this.ry);
        graphics.strokeStyle = 'gray';
        graphics.lineWidth = 10;
        graphics.stroke();
        graphics.strokeStyle = 'darkgray';
        graphics.lineWidth = 6;
        graphics.stroke();
        graphics.strokeStyle = 'lightgray';
        graphics.lineWidth = 2;
        graphics.stroke();
    }
}