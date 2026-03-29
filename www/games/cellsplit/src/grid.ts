import { Drawable } from 'graphico';
import { Vec2 } from './lib';

export class Grid implements Drawable {
    constructor(public readonly size: Vec2) { }
    public draw(graphics: CanvasRenderingContext2D): void {
        throw new Error('Method not implemented.' + graphics);
    }
}