import { Drawable } from 'graphico';
import { Color } from 'viridis';
import { Label } from './label';
import { ToggleButton } from './button-toggle';
import { tutorial, version } from './state';

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
     * Autosave interval in milliseconds
     */
    private static readonly autosaveInterval: number = 30e3;
    /**
     * Autosave label duration shown in milliseconds
     */
    private static readonly autosaveLabelDuration: number = 2e3;
    /**
     * Button reset duration in milliseconds
     */
    private static readonly buttonResetDuration: number = 5e3;
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
     * Label showing when the game has been autosaved
     */
    private readonly autosaveLabel: Label;
    /**
     * Tracks whether the menu is opened or closed
     */
    private isOpen: boolean;
    /**
     * Autosave timer in milliseconds
     */
    private autosaveTick: number;
    /**
     * The number of milliseconds until resetting the save button
     */
    private saveReset: number;
    /**
     * The number of milliseconds until resetting the clear button
     */
    private clearReset: number;
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
        this.autosaveTick = 0;
        this.saveReset = 0;
        this.clearReset = 0;
        this.title = new Label('Menu', new Color(255, 255, 255), 1, false, 'center', 'bottom', x, y - Menu.btnPadding);
        this.autosaveLabel = new Label(`Created by Nicolas Ventura [${version}]`, new Color(255, 255, 255), 1, false, 'right', 'bottom', 0, 0);
        this.save = new ToggleButton([
            ['Save', Menu.btnColor, () => { this.saveReset = Menu.buttonResetDuration; this.saveCallback(); }],
            ['Saved!', new Color(150, 250, 150), () => { return }],
        ], x - (width / 2), y, width, Menu.btnHeight, ['s']);
        this.help = new ToggleButton([
            ['Tutorial', Menu.btnColor, () => tutorial.show()],
            ['End Tutorial', Menu.btnColor, () => tutorial.hide()],
        ], x - (width / 2), y + Menu.btnHeight + Menu.btnPadding, width, Menu.btnHeight, ['h']);
        this.mute = new ToggleButton([
            ['Mute', Menu.btnColor, () => this.muteCallback()],
            ['Unmute', Menu.btnColor, () => this.unmuteCallback()],
        ], x - (width / 2), y + (Menu.btnHeight + Menu.btnPadding) * 2, width, Menu.btnHeight, ['m']);
        this.clear = new ToggleButton([
            ['Wipe Data', Menu.btnColor, () => this.clearReset = Menu.buttonResetDuration],
            ['Confirm', new Color(255, 0, 0), () => this.clearCallback()],
            ['Reload Page', Menu.btnColor, () => window.location.reload()],
        ], x - (width / 2), y + (Menu.btnHeight + Menu.btnPadding) * 3, width, Menu.btnHeight, null);
        this.back = new ToggleButton([
            ['Menu', Menu.btnColor, () => this.toggle()],
            ['Back', Menu.btnColor, () => this.toggle()],
        ], x - (width / 2), y + (Menu.btnHeight + Menu.btnPadding) * 4, width, Menu.btnHeight, ['escape']);
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
    private toggle(): void {
        this.isOpen = !this.isOpen;
        this.save.reset();
        this.clear.reset();
    }
    /**
     * Check to see if the user inputted any hotkeys.
     */
    public checkHotkeys(key: string): void {
        this.save.hotkey(key);
        this.help.hotkey(key);
        this.mute.hotkey(key);
        this.back.hotkey(key);
    }
    /**
     * Menu tick for resetting buttons and autosaving
     */
    public tick(dt: number): void {
        if (this.saveReset > 0) {
            this.saveReset -= dt;
            if (this.saveReset <= 0) {
                this.save.reset();
            }
        }
        if (this.clearReset > 0) {
            this.clearReset -= dt;
            if (this.clearReset <= 0) {
                this.clear.reset();
            }
        }
        this.autosave(dt);
    }
    /**
     * Perform an autosave at the specified interval
     */
    private autosave(dt: number): void {
        this.autosaveTick += dt;
        if (this.autosaveTick > Menu.autosaveInterval) {
            this.autosaveLabel.value = 'Autosaved!';
            this.autosaveTick = 0;
            this.saveCallback();
        }
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
        if (this.autosaveTick < Menu.autosaveLabelDuration) {
            this.autosaveLabel.x = graphics.canvas.width - Label.fontSize / 2;
            this.autosaveLabel.y = graphics.canvas.height - Label.fontSize / 2;
            this.autosaveLabel.draw(graphics);
        }
    }
}
