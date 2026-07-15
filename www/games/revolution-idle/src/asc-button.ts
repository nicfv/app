import { Button } from './button';
import { NUM_WHEELS } from './globals';
import { Label } from './label';
import { zoom } from './state';
import { Wheel } from './wheel';

export class AscendButton extends Button {
    constructor(x: number, width: number, private readonly wheel: Wheel) {
        super('^1.01\n-$All', wheel.color, false, x, 0, width, Label.fontSize * 3, () => {
            this.wheel.ascend();
        });
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        const centerDelta: number = NUM_WHEELS - this.wheel.index - zoom.getZoom();
        if (this.wheel.isMaxed() && Math.abs(centerDelta) < 5) {
            this.y = (graphics.canvas.height - this.h) / 2 - (Label.fontSize * 3.5) * centerDelta;
            super.draw(graphics);
        } else {
            this.y = -Infinity;
        }
    }
}