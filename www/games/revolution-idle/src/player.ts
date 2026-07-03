import { Drawable } from 'graphico';
import { FONT_FAMILY, FONT_SIZE } from './globals';
import { N } from './lib';

export class Player implements Drawable {
    constructor(public money: number) { }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Render black background
        graphics.fillStyle = 'black';
        graphics.fillRect(0, graphics.canvas.height - FONT_SIZE * 4, graphics.canvas.width, FONT_SIZE * 4);
        // Render white text (money)
        graphics.fillStyle = 'white';
        graphics.font = `bold ${FONT_SIZE * 3}px ${FONT_FAMILY}`;
        graphics.textAlign = 'center';
        graphics.textBaseline = 'bottom';
        graphics.fillText(`$${N(this.money)}`, graphics.canvas.width / 2, graphics.canvas.height - FONT_SIZE / 2);
    }
}
