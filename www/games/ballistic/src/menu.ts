import { Page } from './page';

export class Menu<T extends string> extends Page {
    private selection = 0;
    constructor(title: string, description: string, private readonly options: T[], subtext = '') {
        super(title, description, subtext);
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
        super.draw(graphics);
        graphics.fillStyle = 'white';
        graphics.textAlign = 'center';
        graphics.font = this.font(18);
        for (let i = 0; i < this.options.length; i++) {
            let option: string = this.options[i];
            if (i === this.selection) {
                graphics.fillStyle = 'yellow';
                option = `> ${option} <`;
            } else {
                graphics.fillStyle = 'white';
            }
            graphics.fillText(option, graphics.canvas.width / 2, graphics.canvas.height / 2 + i * 36);
        }
    }
}