import { Drawable } from 'graphico';

export class Page implements Drawable {
    constructor(public title = '', public description = '', public subtext = '', public drawables: Drawable[] = []) { }
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
        graphics.font = this.font(14);
        graphics.fillStyle = 'lightgray';
        graphics.fillText(this.subtext, graphics.canvas.width / 2, graphics.canvas.height - 30);
    }
}