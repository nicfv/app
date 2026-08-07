import { Drawable } from 'graphico';
import { N } from '../data/lib';
import { Label } from '../form-controls/label';
import { Color } from 'viridis';
import { SMath } from 'smath';

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
    constructor(private readonly data: PlayerData = defaultPlayerData) {
        this.moneyLabel = new Label('', new Color(255, 255, 255), 3, true, 'center', 'bottom', 0, 0);
    }
    /**
     * Earn a certain amount of money to the player's bank
     */
    public earn(amount: number): void {
        this.data.money += amount;
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
     * Calculate the income required to ascend (gain another planet/orbit)
     */
    public incomeRequired(): number {
        return 10 ** ((1.25 * (this.data.orbits ** 1.75) + 1) | 0);
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
        this.data.orbits++;
    }
    /**
     * Copy player data for saving
     */
    public save(): PlayerData {
        return JSON.parse(JSON.stringify(this.data));
    }
    /**
     * Load data for the player
     */
    public load(data: PlayerData = defaultPlayerData): void {
        this.data.money = SMath.clamp(data.money, 0, Infinity);
        this.data.orbits = SMath.clamp(data.orbits, 2, Infinity) | 0;
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
    orbits: number;
}

const defaultPlayerData: PlayerData = {
    money: 0,
    orbits: 2,
};
