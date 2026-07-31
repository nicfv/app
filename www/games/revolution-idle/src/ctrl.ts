import { Drawable } from 'graphico';
import { Button } from './button';
import { Color } from 'viridis';

export class Control implements Drawable {
    private static readonly btnColor: Color = new Color(200, 200, 200);
    private readonly save: Button;
    private readonly clear: Button;
    private readonly help: Button;
    constructor(private readonly x: number, private readonly y: number) {
        this.save = new Button('Save', Control.btnColor, true, x, y, 50, 50, () => { });
        this.clear = new Button('Reset', Control.btnColor, true, x, y, 50, 50, () => { });
        this.help = new Button('Help', Control.btnColor, true, x, y, 50, 50, () => { });
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
}
