import { Drawable } from 'graphico';

export class Menu<T extends string> implements Drawable {
    private selection = 0;
    constructor(private readonly title: string, private readonly description: string, private readonly options: T[], private readonly subtext = '') { }
    /**
     * Get the font string for a given size.
     */
    private font(size: number): string {
        return `bold ${size}px monospace`;
    }
    /**
     * Scroll the menu up, changing the selection.
     */
    public scrollUp(): void {
        this.selection = (this.selection - 1 + this.options.length) % this.options.length;
    }
    /**
     * Scroll the menu down, changing the selection.
     */
    public scrollDown(): void {
        this.selection = (this.selection + 1) % this.options.length;
    }
    /**
     * Get the currently selected option.
     */
    public select(): T {
        return this.options[this.selection];
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
        for (let i = 0; i < this.options.length; i++) {
            if (i === this.selection) {
                graphics.fillStyle = 'yellow';
            } else {
                graphics.fillStyle = 'white';
            }
            graphics.fillText(this.options[i], graphics.canvas.width / 2, graphics.canvas.height / 2 + i * 36);
        }
        graphics.font = this.font(14);
        graphics.fillStyle = 'lightgray';
        graphics.fillText(this.subtext, graphics.canvas.width / 2, graphics.canvas.height - 30);
    }
}