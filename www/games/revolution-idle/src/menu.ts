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
    constructor(x: number, y: number, width: number) {
        this.title = new Label('Menu', new Color(255, 255, 255), 1.5, true, 'center', 'bottom', x, y - Menu.btnPadding);
        this.save = new Button('Save', Menu.btnColor, true, x - (width / 2), y, width, Menu.btnHeight, () => { return });
        this.help = new Button('Help', Menu.btnColor, true, x - (width / 2), y + Menu.btnHeight + Menu.btnPadding, width, Menu.btnHeight, () => { return });
        this.mute = new Button('Mute', Menu.btnColor, true, x - (width / 2), y + (Menu.btnHeight + Menu.btnPadding) * 2, width, Menu.btnHeight, () => { return });
        this.clear = new Button('Reset', Menu.btnColor, true, x - (width / 2), y + (Menu.btnHeight + Menu.btnPadding) * 3, width, Menu.btnHeight, () => { return });
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        this.title.draw(graphics);
        this.save.draw(graphics);
        this.help.draw(graphics);
        this.mute.draw(graphics);
        this.clear.draw(graphics);
    }
}
