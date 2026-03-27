import { Drawable } from 'graphico';

export class Menu implements Drawable {
    constructor(private readonly width: number, private readonly height: number) { }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.fillStyle = 'black';
        graphics.font = '48px sans-serif';
        graphics.textAlign = 'center';
        graphics.fillText('Ice Cold Beer', this.width / 2, this.height / 2 - 50);
        graphics.font = '24px sans-serif';
        graphics.fillText('Press any key to start', this.width / 2, this.height / 2 + 20);
    }
}