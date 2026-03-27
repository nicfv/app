import { Drawable } from 'graphico';

export class Menu<T extends string> implements Drawable {
    private selection = 0;
    constructor(private readonly title: string, private readonly description: string, private readonly options: T[]) { }
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
        graphics.font = this.font(48);
        graphics.fillText(this.title, graphics.canvas.width / 2, graphics.canvas.height / 2 - 50);
        graphics.font = this.font(24);
        graphics.fillText(this.description, graphics.canvas.width / 2, graphics.canvas.height / 2 + 20);
    }
}