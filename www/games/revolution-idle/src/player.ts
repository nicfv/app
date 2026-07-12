import { Drawable } from 'graphico';
import { N } from './lib';
import { Text } from './text';
import { Color } from 'viridis';

export class Player implements Drawable {
    private readonly moneyText: Text;
    constructor(public money: number) {
        this.moneyText = new Text('', new Color(255, 255, 255), 3, true, 'center', 'bottom', 0, 0);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Render black background
        graphics.fillStyle = 'black';
        graphics.fillRect(0, graphics.canvas.height - Text.fontSize * 4, graphics.canvas.width, Text.fontSize * 4);
        // Render white text (money)
        this.moneyText.value = `$${N(this.money)}`;
        this.moneyText.x = graphics.canvas.width / 2;
        this.moneyText.y = graphics.canvas.height - Text.fontSize / 2;
        this.moneyText.draw(graphics);
    }
}
