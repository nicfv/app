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
     * Create a new zoom control.
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
            new Help('Orbit Idle is all about building a strong solar system.\nEach orbit spins to generate cash, and more planets\ncompound your income for faster growth.', 0, -75, 325, 375, 150, 75),
            new Help('Use the Buy buttons on the left to spend cash\nand speed up individual orbits.\nChoose Buy x1, x10, or x100 before clicking the orbit button.', 0, -75, 10, 120, 260, 400),
            new Help('When an orbit reaches its max speed, you can Ascend it.\nAscensions reset progression for that orbit\nbut increase your long-term score and income.', 0, -75, 150, 120, 260, 400),
            new Help('Use the Zoom controls on the top right to focus\non different planets. Zooming changes the store\nbuttons and income labels to match the focused orbit.', -10, 0, 675, 150, 100, 60),
            new Help('Open Menu > Tutorial anytime to review these slides.\nYour progress saves automatically, and the game\ncontinues earning even when the tab is not active.', 0, -70, 675, 385, 150, 100),
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
