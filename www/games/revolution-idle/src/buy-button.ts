import { Button } from './button';
import { NUM_WHEELS } from './globals';
import { N } from './lib';
import { Wheel } from './wheel';
import { Zoom } from './zoom';

export class BuyButton extends Button {
    constructor(private readonly wheel: Wheel, private readonly zoom: Zoom) {
        super('', wheel.color, true, 10, 0, 120, 35, () => {
            this.setText();
        });
        this.setText();
    }
    private setText(): void {
        super.text = `${N(this.wheel.currentSpeedHz())} > ${N(this.wheel.getNextNSpeed())}Hz\n$${N(this.wheel.getNextNCost())}`;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        const centerDelta: number = NUM_WHEELS - this.wheel.index - this.zoom.getZoom();
        if (Math.abs(centerDelta) < 5) {
            this.y = (graphics.canvas.height - this.h) / 2 - 45 * centerDelta;
            super.draw(graphics);
        } else {
            this.y = -Infinity;
        }
    }
}
