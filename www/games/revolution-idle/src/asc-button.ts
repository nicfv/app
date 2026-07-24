import { Button } from './button';
import { NUM_WHEELS } from './globals';
import { Label } from './label';
import { N } from './lib';
import { player, zoom } from './state';
import { Wheel } from './wheel';

export class AscendButton extends Button {
    private ascAmount: number;
    private ascensions: number;
    constructor(x: number, width: number, private readonly wheel: Wheel) {
        super('', wheel.color, false, x, 0, width, Label.fontSize * 3, () => {
            player.money -= this.ascAmount;
            this.wheel.ascend(this.ascensions);
        });
        this.ascAmount = 0;
        this.ascensions = 0;
    }
    private update(): void {
        let nAscensions = 1;
        while (this.wheel.getNextNAscensionCost(nAscensions) < player.money) {
            nAscensions++;
            return;
        }
        nAscensions--;
        this.ascAmount = this.wheel.getNextNAscensionCost(nAscensions);
        super.text = `${N(this.ascAmount)}\n-$All`;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        const centerDelta: number = NUM_WHEELS - this.wheel.index - zoom.getZoom();
        if (this.wheel.isMaxed() && Math.abs(centerDelta) < 5) {
            this.y = (graphics.canvas.height - this.h) / 2 - (Label.fontSize * 3.5) * centerDelta;
            this.update();
            super.draw(graphics);
        } else {
            this.y = -Infinity;
        }
    }
}