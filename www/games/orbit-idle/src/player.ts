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
    constructor(private data: PlayerData = defaultPlayerData) {
        this.moneyLabel = new Label('', new Color(255, 255, 255), 3, true, 'center', 'bottom', 0, 0);
    }
    /**
     * Earn a certain amount of money to the player's bank
     */
    public earn(amount: number): void {
        this.data.money += amount;
        this.data.accumulation += amount;
    }
    /**
     * Spend a certain amount of money from the player's bank
     */
    public spend(amount: number): void {
        this.data.money -= amount;
    }
    /**
     * Determine if the player has sufficient funds to purchase something of a certain amount
     */
    public hasFunds(amount: number): boolean {
        return this.data.money >= amount;
    }
    /**
     * Current player score `log10(money)`
     */
    public score(): number {
        return this.data.accumulation > 1 ? Math.log10(this.data.accumulation) : 0;
    }
    /**
     * Calculate the score required to gain another planet/orbit
     */
    public scoreRequired(): number {
        return (3 * (this.data.orbits ** 1.5)) | 0;
    }
    /**
     * Determine if this player can ascend
     */
    public canAscend(): boolean {
        return this.score() >= this.scoreRequired();
    }
    /**
     * Get the total number of orbits
     */
    public getNumOrbits(): number {
        return this.data.orbits;
    }
    /**
     * Add a new orbit to the solar system
     */
    public ascend(): void {
        this.data.money = 0;
        this.data.accumulation = 0;
        this.data.orbits++;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Render black background
        graphics.fillStyle = 'black';
        graphics.fillRect(0, graphics.canvas.height - Label.fontSize * 4, graphics.canvas.width, Label.fontSize * 4);
        // Render white text (money)
        this.moneyLabel.value = `$${N(this.data.money)}`;
        this.moneyLabel.x = graphics.canvas.width / 2;
        this.moneyLabel.y = graphics.canvas.height - Label.fontSize / 2;
        this.moneyLabel.draw(graphics);
    }
}

/**
 * Represents an interface for player data
 */
export interface PlayerData {
    money: number;
    accumulation: number;
    orbits: number;
}

const defaultPlayerData: PlayerData = {
    money: 0,
    accumulation: 0,
    orbits: 2,
};
