import { Drawable } from 'graphico';

export class Page implements Drawable {
    constructor(public title: string, public description: string, public drawables: Drawable[] = []) { }
    /**
     * Get the font string for a given size.
     */
    protected font(size: number): string {
        return `bold ${size}px monospace`;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.fillStyle = 'white';
        graphics.textAlign = 'center';
        graphics.font = this.font(36);
        graphics.fillText(this.title, graphics.canvas.width / 2, 50);
        graphics.font = this.font(18);
        this.description.split('\n').forEach((line, index) => {
            graphics.fillText(line, graphics.canvas.width / 2, 100 + index * 24);
        });
        for (const drawable of this.drawables) {
            drawable.draw(graphics);
        }
    }
}