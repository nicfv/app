import { Drawable } from 'graphico';
import { Label } from '../form-controls/label';
import { BuyButton } from '../form-controls/button-buy';
import { AscendButton } from '../form-controls/button-asc';
import { system } from '../data/state';

/**
 * Represents a collection of buy buttons and ascension buttons (if applicable.)
 */
export class Shop implements Drawable {
    /**
     * Buttons to increase orbit speed
     */
    private readonly buyButtons: BuyButton[];
    /**
     * Buttons to increase orbit ascension
     */
    private readonly ascButtons: AscendButton[];
    /**
     * Create a new instance of the game shop
     */
    constructor(private readonly x: number, private readonly buyButtonWidth: number) {
        this.buyButtons = [];
        this.ascButtons = [];
        this.regenerate();
    }
    /**
     * Regenerate all store buttons (e.g. if a new solar system is created)
     */
    public regenerate(): void {
        this.buyButtons.splice(0);
        this.ascButtons.splice(0);
        for (const orbit of system.orbits) {
            this.buyButtons.push(new BuyButton(this.x, this.buyButtonWidth, orbit));
            this.ascButtons.push(new AscendButton(this.x + this.buyButtonWidth + Label.fontSize / 2, this.buyButtonWidth, orbit));
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
