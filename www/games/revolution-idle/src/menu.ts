import { Drawable } from 'graphico';
import { Button } from './button';
import { Color } from 'viridis';
import { Label } from './label';

export class Menu implements Drawable {
    private static readonly btnColor: Color = new Color(200, 200, 200);
    private static readonly btnHeight: number = Label.fontSize * 2;
    private static readonly btnPadding: number = Label.fontSize / 2;
    private readonly title: Label;
    private readonly save: Button;
    private readonly help: Button;
    private readonly mute: Button;
    private readonly clear: Button;
    private readonly back: Button;
    private isOpen: boolean;
    constructor(x: number, y: number, width: number) {
        this.isOpen = false;
        this.title = new Label('Menu', new Color(255, 255, 255), 1.5, true, 'center', 'bottom', x, y - Menu.btnPadding);
        this.save = new Button('Save', Menu.btnColor, true, x - (width / 2), y, width, Menu.btnHeight, () => { return });
        this.help = new Button('Help', Menu.btnColor, true, x - (width / 2), y + Menu.btnHeight + Menu.btnPadding, width, Menu.btnHeight, () => { return });
        this.mute = new Button('Mute', Menu.btnColor, true, x - (width / 2), y + (Menu.btnHeight + Menu.btnPadding) * 2, width, Menu.btnHeight, () => { return });
        this.clear = new Button('Reset', Menu.btnColor, true, x - (width / 2), y + (Menu.btnHeight + Menu.btnPadding) * 3, width, Menu.btnHeight, () => { return });
        this.back = new Button('Back', Menu.btnColor, true, x - (width / 2), y + (Menu.btnHeight + Menu.btnPadding) * 4, width, Menu.btnHeight, () => { this.toggle(); });
    }
    /**
     * Open or close the menu depending on its current state
     */
    public toggle(): void {
        this.isOpen = !this.isOpen;
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
