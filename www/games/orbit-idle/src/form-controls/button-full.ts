import { Color } from 'viridis';
import { Button } from './button';
import { income, player, shop, system, zoom } from '../data/state';
import { N } from '../data/lib';

/**
 * Represents a button to perform a full ascension
 */
export class FullAscendButton extends Button {
    /**
     * Create a new full ascend button
     */
    constructor(x: number, y: number, w: number, h: number) {
        super('', new Color(200, 200, 200), false, x, y, w, h, null, () => this.ascend());
    }
    /**
     * Ascend and regenerate the game elements
     */
    public ascend(): void {
        this.disable();
        player.ascend();
        zoom.reset();
        system.load();
        income.regenerate();
        shop.regenerate();
        player.earn(system.orbits[0].getNextNCost(1));
    }
    /**
     * Update the text property of this button
     */
    private setText(): void {
        super.text = `+1 Planet\n$${N(player.incomeRequired())}/s\nNew system`;
        super.enabled = income.getIncomePerSecond() > player.incomeRequired();
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        this.setText();
        super.draw(graphics);
    }
}
