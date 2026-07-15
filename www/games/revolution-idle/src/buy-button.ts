import { Button } from './button';
import { NUM_WHEELS } from './globals';
import { N } from './lib';
import { buyType, player, zoom } from './state';
import { Wheel } from './wheel';

export class BuyButton extends Button {
    private cost: number;
    constructor(private readonly wheel: Wheel) {
        super('', wheel.color, true, 10, 0, 120, 35, () => {
            player.money -= this.cost;
            wheel.increaseSpeed(buyType.getQuantity());
        });
        this.cost = 0;
    }
    private setText(): void {
        this.cost = this.wheel.getNextNCost(buyType.getQuantity());
        if (this.wheel.isMaxed()) {
            super.text = `${N(this.wheel.currentSpeedHz())}Hz\n(Maxed)`;
        } else {
            super.text = `${N(this.wheel.currentSpeedHz())} > ${N(this.wheel.getNextNSpeed(buyType.getQuantity()))}Hz\n$${N(this.cost)}`;
        }
        if (player.money >= this.cost) {
            super.enable();
        } else {
            super.disable();
        }
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        const centerDelta: number = NUM_WHEELS - this.wheel.index - zoom.getZoom();
        if (Math.abs(centerDelta) < 5) {
            this.y = (graphics.canvas.height - this.h) / 2 - 45 * centerDelta;
            this.setText();
            super.draw(graphics);
        } else {
            this.y = -Infinity;
        }
    }
}
