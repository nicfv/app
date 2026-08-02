import { Color } from 'viridis';
import { Button } from './button';
import { income, player, shop, system, zoom } from './state';
import { N } from './lib';

/**
 * Represents a button to perform a full ascension
 */
export class FullAscendButton extends Button {
    /**
     * Create a new full ascend button
     */
    constructor(x: number, y: number, w: number, h: number) {
        super('', new Color(200, 200, 200), false, x, y, w, h, () => this.ascend());
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
        super.text = `+1 Planet\n${N(player.score())}/${N(player.scoreRequired())}\nNew system`;
        super.enabled = player.canAscend();
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        if (player.score() > player.scoreRequired() * 0.25) {
            this.setText();
            super.draw(graphics);
        }
    }
}
