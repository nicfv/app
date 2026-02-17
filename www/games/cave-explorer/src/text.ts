import { Drawable } from 'graphico';
import { Vec2 } from './types';

export class DrawText implements Drawable {
    constructor(private readonly content: string, private readonly location: Vec2, private readonly font: string, private readonly color: string, private readonly lineHeight: number) { }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.font = this.font;
        graphics.fillStyle = this.color;
        this.content.split('\n').forEach((line, i) => {
            graphics.fillText(line, this.location.x, this.location.y + i * this.lineHeight);
        });
    }
}
