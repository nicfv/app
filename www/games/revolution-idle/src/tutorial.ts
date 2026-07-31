import { Drawable } from 'graphico';
import { Color } from 'viridis';
import { Button } from './button';
import { Label } from './label';
import { Help } from './help';

/**
 * Represents the in-game tutorial.
 */
export class Tutorial implements Drawable {
    /**
     * Button sizing
     */
    private static readonly btnSize: number = Label.fontSize * 2;
    /**
     * Button padding
     */
    private static readonly btnPad: number = Label.fontSize / 2;
    /**
     * Button color
     */
    private static readonly btnColor: Color = new Color(200, 200, 200);
    /**
     * Next button
     */
    private readonly next: Button;
    /**
     * Back button
     */
    private readonly back: Button;
    /**
     * The current help page
     */
    private helpPage: number;
    /**
     * Represents the array of help pages
     */
    private readonly pages: Help[];
    /**
     * Create a new zoom control.
     */
    constructor(x: number, y: number) {
        this.back = new Button('<', Tutorial.btnColor, true, x, y, Tutorial.btnSize, Tutorial.btnSize, () => this.backPage());
        this.next = new Button('>', Tutorial.btnColor, true, x + Tutorial.btnSize + Tutorial.btnPad, y, Tutorial.btnSize, Tutorial.btnSize, () => this.nextPage());
        this.helpPage = 0;
        this.pages = [
            new Help('Just a test', 10, 20, 30, 40, 50, 60),
            new Help('Another test', 70, 60, 50, 40, 30, 20),
        ];
        this.setButtonAbility();
    }
    /**
     * Go forward one page
     */
    private nextPage(): void {
        if (this.helpPage < this.pages.length - 1) {
            this.helpPage++;
            this.setButtonAbility();
        }
    }
    /**
     * Go back one page
     */
    private backPage(): void {
        if (this.helpPage > 0) {
            this.helpPage--;
            this.setButtonAbility();
        }
    }
    /**
     * Set the enabled/disabled property for the pagination buttons.
     */
    private setButtonAbility(): void {
        if (this.helpPage > 0) {
            this.back.enable();
        } else {
            this.back.disable();
        }
        if (this.helpPage < this.pages.length - 1) {
            this.next.enable();
        } else {
            this.next.disable();
        }
    }
    /**
     * Check if the mouse is currently hovering over any of the controls.
     */
    public checkHover(mx: number, my: number): void {
        this.back.checkHover(mx, my);
        this.next.checkHover(mx, my);
    }
    /**
     * Check if the mouse has clicked on any of the controls.
     */
    public click(button: number): void {
        this.back.click(button);
        this.next.click(button);
    }
    /**
     * Run the tick cycle for the active help page
     */
    public tick(dt: number): void {
        this.pages[this.helpPage].tick(dt);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        this.back.draw(graphics);
        this.next.draw(graphics);
        this.pages[this.helpPage].draw(graphics);
    }
}
