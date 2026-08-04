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
     * Determines whether or not the tutorial is visible
     */
    private visible: boolean;
    /**
     * The current help page
     */
    private helpPage: number;
    /**
     * Represents the array of help pages
     */
    private readonly pages: Help[];
    /**
     * Time [ms] left to show the player's first time message opening the game
     */
    private firstDuration: number;
    /**
     * The message the player sees when opening the game for the first time
     */
    private readonly first: Label;
    /**
     * Create a new tutorial instance.
     */
    constructor(x: number, y: number) {
        this.title = new Label('', new Color(255, 255, 255), 1, false, 'center', 'bottom', x, y - Tutorial.btnPad);
        this.back = new Button('<', Tutorial.btnColor, true, x - Tutorial.btnSize - Tutorial.btnPad / 2, y, Tutorial.btnSize, Tutorial.btnSize, () => this.backPage());
        this.next = new Button('>', Tutorial.btnColor, true, x + Tutorial.btnPad / 2, y, Tutorial.btnSize, Tutorial.btnSize, () => this.nextPage());
        this.first = new Label('Welcome to Orbit Idle!\n\nNeed help?\n\nOpen Menu and click Tutorial\nfor a quick guided tour.', new Color(255, 255, 255), 1.5, true, 'center', 'top', 0, Label.fontSize * 5);
        this.visible = false;
        this.firstDuration = 0;
        this.helpPage = 0;
        this.pages = [
            new Help('Welcome!\nOrbit Idle is all about building a strong\nsolar system. Each orbit spins to generate\ncash, and more planets compound your income\nfor faster growth. Click ">" to continue.', 0, -75, 325, 375, 150, 75),
            new Help('This is your personal bank.\nThis indicates your spending power.', 0, -30, 5, 550, 790, 45),
            new Help('Click the buy buttons to spend cash\nto speed up individual orbits.\nTry upgrading your red planet now!', 140, 0, 5, 100, 130, 400),
            new Help('When an orbit reaches its max speed, you\ncan Ascend it. Ascensions are expensive\nand reset speed for that orbit, but\nincrease your long-term income.', 140, 0, 135, 100, 130, 400),
            new Help('The breakdown of your income is shown here.\nEach planet gains +0.01 bonus each planetary year\nby completing a full revolution around the sun.\nBonuses from individual orbits are multiplied\ntogether and raised to their ascension level.', 0, 50, 5, 5, 790, 45),
            new Help('This is your total income and\ntotal revolutions per second.\nEach time any planet completes\none full revolution, you earn\nthe income under $/rev.', -10, 0, 600, 50, 200, 80),
            new Help('Use the Zoom controls on the top right to focus\non different planets. Zooming changes the store\nbuttons and income labels to match the focused orbit.', -10, 0, 675, 150, 100, 60),
            new Help('For convenience, you can buy\nspeed upgrades in bulk. It\ndoes not affect ascending.', -10, 0, 660, 220, 130, 60),
            new Help('When you have make the required income\nper second, you will be given the option\nto perform a full ascension. This resets\nthe entire solar system, but adds\nan additional planet.', -10, 0, 660, 290, 130, 70),
            new Help('Open Menu > Tutorial anytime to review these slides.\nYour progress saves automatically, and the game\ncontinues earning even when the tab is not active.\nClick "End Tutorial" to close this message.\nGood luck!', -10, 75, 660, 375, 130, 175),
        ];
        this.setButtonAbility();
    }
    /**
     * Show the tutorial
     */
    public show(): void {
        this.visible = true;
        this.helpPage = 0;
        this.setButtonAbility();
    }
    /**
     * Close the tutorial
     */
    public hide(): void {
        this.visible = false;
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
        if (this.visible) {
            this.back.checkHover(mx, my);
            this.next.checkHover(mx, my);
        }
    }
    /**
     * Check if the mouse has clicked on any of the controls.
     */
    public click(button: number): void {
        if (this.visible) {
            this.back.click(button);
            this.next.click(button);
        }
    }
    /**
     * Run the tick cycle for the active help page
     */
    public tick(dt: number): void {
        if (this.visible) {
            this.pages[this.helpPage].tick(dt);
        }
        if (this.firstDuration > 0) {
            this.firstDuration -= dt;
        }
    }
    /**
     * Pop up with a message the first time the player opens the game
     */
    public showFirstTimeMessage(duration: number): void {
        this.firstDuration = duration;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        if (this.visible) {
            this.firstDuration = 0;
            this.title.value = `Help ${this.helpPage + 1}/${this.pages.length}`;
            this.title.draw(graphics);
            this.back.draw(graphics);
            this.next.draw(graphics);
            this.pages[this.helpPage].draw(graphics);
        }
        if (this.firstDuration > 0) {
            this.first.x = graphics.canvas.width / 2;
            this.first.draw(graphics);
        }
    }
}
