import { Drawable } from 'graphico';

export class Grid implements Drawable {
    public draw(graphics: CanvasRenderingContext2D): void {
        throw new Error('Method not implemented.' + graphics);
    }
}