import { Drawable } from 'graphico';
import { BuyButton } from './buy-button';
import { Wheel } from './wheel';

export class Store implements Drawable {
    private readonly buyButtons: BuyButton[];
    constructor(wheels: Wheel[]) {
        this.buyButtons = [];
        for (const wheel of wheels) {
            this.buyButtons.push(new BuyButton(wheel));
        }
    }
    public checkHover(x: number, y: number): void {
        for (const buyButton of this.buyButtons) {
            buyButton.checkHover(x, y);
        }
    }
    public click(button: number): void {
        for (const buyButton of this.buyButtons) {
            buyButton.click(button);
        }
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        for (const button of this.buyButtons) {
            button.draw(graphics);
        }
    }
}
