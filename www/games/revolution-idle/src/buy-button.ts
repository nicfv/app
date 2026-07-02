import { Button } from './button';
import { NUM_WHEELS } from './globals';
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
        super.text = `${this.wheel.currentSpeedHz().toFixed(2)} > ${this.wheel.getNextNSpeed().toFixed(2)}Hz\n$${this.wheel.getNextNCost().toFixed(2)}`;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        this.y = (graphics.canvas.height - this.h) / 2 - 40 * (NUM_WHEELS - this.wheel.index - this.zoom.getZoom());
        super.draw(graphics);
    }
}
