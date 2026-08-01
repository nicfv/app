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
     * Navigation title
     */
    private readonly title: Label;
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
        this.title = new Label('', new Color(255, 255, 255), 1, false, 'center', 'bottom', x, y - Tutorial.btnPad);
        this.back = new Button('<', Tutorial.btnColor, true, x - Tutorial.btnSize - Tutorial.btnPad / 2, y, Tutorial.btnSize, Tutorial.btnSize, () => this.backPage());
        this.next = new Button('>', Tutorial.btnColor, true, x + Tutorial.btnPad / 2, y, Tutorial.btnSize, Tutorial.btnSize, () => this.nextPage());
        this.helpPage = 0;
        this.pages = [
            new Help('Your goal is to complete orbits as\noptimally as possible. Orbits earn\nyou cash and are compounded with\nother planets. Click the ">" button\nto advance to the next page.', 0, -75, 325, 375, 150, 75),
            new Help('You can spend your hard-earned\ncash to purchase speed boosts\nfor each orbit. Start by upgrading\nyour red orbit speed!', 140, 0, 5, 100, 130, 400),
            new Help('When you unlock a lot of planets,\nyou can zoom in and out to observe them,\nand this will also update the store buttons and income.\nTry zooming out!', -10, 0, 675, 150, 100, 60),
        ];
        this.setButtonAbility();
    }
    /**
     * Restart the tutorial.
     */
    public reset(): void {
        this.helpPage = 0;
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
        this.title.value = `Help ${this.helpPage + 1}/${this.pages.length}`;
        this.title.draw(graphics);
        this.back.draw(graphics);
        this.next.draw(graphics);
        this.pages[this.helpPage].draw(graphics);
    }
}
