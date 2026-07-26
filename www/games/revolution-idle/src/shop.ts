import { Drawable } from 'graphico';
import { BuyButton } from './buy-button';
import { wheels } from './state';
import { AscendButton } from './asc-button';
import { Label } from './label';

/**
 * Represents a collection of buy buttons and ascension buttons (if applicable.)
 */
export class Shop implements Drawable {
    /**
     * Buttons to increase wheel speed
     */
    private readonly buyButtons: BuyButton[];
    /**
     * Buttons to increase wheel ascension
     */
    private readonly ascButtons: AscendButton[];
    /**
     * Create a new instance of the game shop
     */
    constructor(x: number, buyButtonWidth: number) {
        this.buyButtons = [];
        this.ascButtons = [];
        for (const wheel of wheels) {
            this.buyButtons.push(new BuyButton(x, buyButtonWidth, wheel));
            this.ascButtons.push(new AscendButton(x + buyButtonWidth + Label.fontSize / 2, buyButtonWidth, wheel));
        }
    }
    /**
     * Check to see if the mouse is currently hovering over any of the shop buttons
     */
    public checkHover(x: number, y: number): void {
        for (const buyButton of this.buyButtons) {
            buyButton.checkHover(x, y);
        }
        for (const ascButton of this.ascButtons) {
            ascButton.checkHover(x, y);
        }
    }
    /**
     * Check to see if the mouse currently clicked on any of the shop buttons
     */
    public click(button: number): void {
        for (const buyButton of this.buyButtons) {
            buyButton.click(button);
        }
        for (const ascButton of this.ascButtons) {
            ascButton.click(button);
        }
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        for (const buyButton of this.buyButtons) {
            buyButton.draw(graphics);
        }
        for (const ascButton of this.ascButtons) {
            ascButton.draw(graphics);
        }
    }
}
