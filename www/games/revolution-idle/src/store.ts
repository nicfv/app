import { Drawable } from 'graphico';
import { BuyButton } from './buy-button';
import { Wheel } from './wheel';
import { Player } from './player';
import { Zoom } from './zoom';
import { BuyType } from './buy-type';

export class Store implements Drawable {
    private readonly buyButtons: BuyButton[];
    constructor(private readonly x: number, private readonly buyButtonWidth: number, private readonly zoom: Zoom, private readonly buyType: BuyType, private readonly player: Player, private readonly wheels: Wheel[]) {
        this.buyButtons = [];
        for (const wheel of wheels) {
            this.buyButtons.push(new BuyButton(wheel, player, zoom, buyType));
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
