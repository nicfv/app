import { Drawable } from 'graphico';

export class Menu implements Drawable {
    constructor(private readonly width: number, private readonly height: number) { }
    /**
     * Get the font string for a given size.
     */
    private font(size: number): string {
        return `bold ${size}px monospace`;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.fillStyle = 'white';
        graphics.font = this.font(48);
        graphics.textAlign = 'center';
        graphics.fillText('Ice Cold Beer', this.width / 2, this.height / 2 - 50);
        graphics.font = this.font(24);
        graphics.fillText('Press any key to start', this.width / 2, this.height / 2 + 20);
    }
}