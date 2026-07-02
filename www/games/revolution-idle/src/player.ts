import { Drawable } from 'graphico';
import { FONT_FAMILY, FONT_SIZE } from './globals';

export class Player implements Drawable {
    constructor(public money: number) { }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.fillStyle = 'white';
        graphics.font = `bold ${FONT_SIZE * 2}px ${FONT_FAMILY}`;
        graphics.textAlign = 'center';
        graphics.textBaseline = 'bottom';
        graphics.fillText(`$${this.money.toFixed(2)}`, graphics.canvas.width / 2, graphics.canvas.height - FONT_SIZE / 2);
    }
}