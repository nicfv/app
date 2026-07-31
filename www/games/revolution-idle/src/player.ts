import { Drawable } from 'graphico';
import { N } from './lib';
import { Label } from './label';
import { Color } from 'viridis';

/**
 * Represents the main player of the game
 */
export class Player implements Drawable {
    /**
     * The label showing the amount of money in the player's bank
     */
    private readonly moneyLabel: Label;
    /**
     * Create a new instance of the game player
     */
    constructor(private money: number, private numWheels: number) {
        this.moneyLabel = new Label('', new Color(255, 255, 255), 3, true, 'center', 'bottom', 0, 0);
    }
    /**
     * Earn a certain amount of money to the player's bank
     */
    public earn(amount: number): void {
        this.money += amount;
    }
    /**
     * Spend a certain amount of money from the player's bank
     */
    public spend(amount: number): void {
        this.money -= amount;
    }
    /**
     * Determine if the player has sufficient funds to purchase something of a certain amount
     */
    public hasFunds(amount: number): boolean {
        return this.money >= amount;
    }
    /**
     * Get the total number of wheels
     */
    public getNumWheels(): number {
        return this.numWheels;
    }
    /**
     * Add a new wheel to the collection
     */
    public getNewWheel(): void {
        this.money = 0;
        this.numWheels++;
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
