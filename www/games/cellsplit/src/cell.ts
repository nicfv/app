import { Drawable } from 'graphico';

export class Cell implements Drawable {
    public draw(graphics: CanvasRenderingContext2D): void {
        throw new Error('Method not implemented.');
    }
}