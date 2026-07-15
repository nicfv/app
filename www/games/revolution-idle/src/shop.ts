import { Drawable } from 'graphico';
import { BuyButton } from './buy-button';
import { wheels } from './state';

/**
 * Represents a collection of buy buttons and ascension buttons (if applicable.)
 */
export class Shop implements Drawable {
    private readonly buyButtons: BuyButton[];
    constructor(x: number, buyButtonWidth: number) {
        this.buyButtons = [];
        for (const wheel of wheels) {
            this.buyButtons.push(new BuyButton(x, buyButtonWidth, wheel));
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
