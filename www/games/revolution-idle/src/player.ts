import { Drawable } from 'graphico';
import { N } from './lib';
import { Label } from './label';
import { Color } from 'viridis';

export class Player implements Drawable {
    private readonly moneyLabel: Label;
    constructor(public money: number, private numWheels: number) {
        this.moneyLabel = new Label('', new Color(255, 255, 255), 3, true, 'center', 'bottom', 0, 0);
    }
    /**
     * Get the total number of wheels
     */
    public getNumWheels(): number {
        return this.numWheels;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Render black background
        graphics.fillStyle = 'black';
        graphics.fillRect(0, graphics.canvas.height - Label.fontSize * 4, graphics.canvas.width, Label.fontSize * 4);
        // Render white text (money)
        this.moneyLabel.value = `$${N(this.money)}`;
        this.moneyLabel.x = graphics.canvas.width / 2;
        this.moneyLabel.y = graphics.canvas.height - Label.fontSize / 2;
        this.moneyLabel.draw(graphics);
    }
}
