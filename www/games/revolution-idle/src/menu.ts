import { Drawable } from 'graphico';
import { Color } from 'viridis';
import { Label } from './label';
import { ToggleButton } from './button-toggle';
import { tutorial } from './state';

/**
 * Represents the in-game menu
 */
export class Menu implements Drawable {
    /**
     * Base button color
     */
    private static readonly btnColor: Color = new Color(200, 200, 200);
    /**
     * Button height
     */
    private static readonly btnHeight: number = Label.fontSize * 2;
    /**
     * Padding in between buttons
     */
    private static readonly btnPadding: number = Label.fontSize / 2;
    /**
     * Menu title
     */
    private readonly title: Label;
    /**
     * Save data button
     */
    private readonly save: ToggleButton;
    /**
     * Help button
     */
    private readonly help: ToggleButton;
    /**
     * Mute button
     */
    private readonly mute: ToggleButton;
    /**
     * Clear data button
     */
    private readonly clear: ToggleButton;
    /**
     * Open menu or back button
     */
    private readonly back: ToggleButton;
    /**
     * Tracks whether the menu is opened or closed
     */
    private isOpen: boolean;
    /**
     * Determines whether the tutorial should be shown
     */
    private isShowHelp = false;
    /**
     * The callback for saving data
     */
    private saveCallback = () => { return };
    /**
     * The callback for muting sound
     */
    private muteCallback = () => { return };
    /**
     * The callback for playing sound
     */
    private unmuteCallback = () => { return };
    /**
     * The callback for clearing all data
     */
    private clearCallback = () => { return };
    /**
     * Create a new in-game menu
     */
    constructor(x: number, y: number, width: number) {
        this.isOpen = false;
        this.title = new Label('Menu', new Color(255, 255, 255), 1, false, 'center', 'bottom', x, y - Menu.btnPadding);
        this.save = new ToggleButton([
            ['Save', Menu.btnColor, () => { this.saveCallback(); }],
            ['Saved!', new Color(150, 250, 150), () => { return }],
        ], x - (width / 2), y, width, Menu.btnHeight);
        this.help = new ToggleButton([
            ['Tutorial', Menu.btnColor, () => { this.isShowHelp = true; }],
            ['End Tutorial', Menu.btnColor, () => { tutorial.reset(); this.isShowHelp = false; }],
        ], x - (width / 2), y + Menu.btnHeight + Menu.btnPadding, width, Menu.btnHeight);
        this.mute = new ToggleButton([
            ['Mute', Menu.btnColor, () => { this.muteCallback(); }],
            ['Unmute', Menu.btnColor, () => { this.unmuteCallback(); }],
        ], x - (width / 2), y + (Menu.btnHeight + Menu.btnPadding) * 2, width, Menu.btnHeight);
        this.clear = new ToggleButton([
            ['Wipe Data', Menu.btnColor, () => { return }],
            ['Confirm', new Color(255, 0, 0), () => { this.clearCallback(); }],
            ['Reload Page', Menu.btnColor, () => { return }],
        ], x - (width / 2), y + (Menu.btnHeight + Menu.btnPadding) * 3, width, Menu.btnHeight);
        this.back = new ToggleButton([
            ['Menu', Menu.btnColor, () => this.toggle()],
            ['Back', Menu.btnColor, () => this.toggle()],
        ], x - (width / 2), y + (Menu.btnHeight + Menu.btnPadding) * 4, width, Menu.btnHeight);
    }
    /**
     * Set all callbacks, needed from the main canvas
     */
    public setCallbacks(save: () => void, mute: () => void, unmute: () => void, clear: () => void): void {
        this.saveCallback = save;
        this.muteCallback = mute;
        this.unmuteCallback = unmute;
        this.clearCallback = clear;
    }
    /**
     * Open or close the menu depending on its current state
     */
    public toggle(): void {
        this.isOpen = !this.isOpen;
        this.save.reset();
        this.clear.reset();
    }
    /**
     * Return whether the tutorial should be displayed
     */
    public showHelp(): boolean {
        return this.isShowHelp;
    }
    /**
     * Check if the mouse is currently hovering over any of the menu buttons
     */
    public checkHover(x: number, y: number): void {
        if (this.isOpen) {
            this.save.checkHover(x, y);
            this.help.checkHover(x, y);
            this.mute.checkHover(x, y);
            this.clear.checkHover(x, y);
        }
        this.back.checkHover(x, y);
    }
    /**
     * Check if the mouse clicked on any of the menu buttons
     */
    public click(button: number): void {
        if (this.isOpen) {
            this.save.click(button);
            this.help.click(button);
            this.mute.click(button);
            this.clear.click(button);
        }
        this.back.click(button);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        if (this.isOpen) {
            this.title.draw(graphics);
            this.save.draw(graphics);
            this.help.draw(graphics);
            this.mute.draw(graphics);
            this.clear.draw(graphics);
        }
        this.back.draw(graphics);
    }
}
