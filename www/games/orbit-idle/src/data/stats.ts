import { Drawable } from 'graphico';
import { Label } from '../form-controls/label';
import { Color } from 'viridis';
import { player, version } from './state';
import { N, SaveLoad } from './lib';
import { SMath } from 'smath';

/**
 * Represents an in-game statistics panel
 */
export class Statistics extends SaveLoad<StatsData> implements Drawable {
    private static readonly shade: Color = new Color(25, 25, 25, 75);
    private visible: boolean;
    private readonly title: Label;
    private readonly headers: Label;
    private readonly content: Label;
    /**
     * Create a new statistics window
     */
    constructor(public readonly data: StatsData = defaultStats) {
        super(data);
        this.visible = false;
        this.title = new Label('Orbit Idle: Statistics', new Color(255, 255, 255), 2, true, 'center', 'bottom', 0, Label.fontSize * 16);
        this.headers = new Label('Started on\nSolar system size\nTotal earned\nTotal spent\nTotal planetary years\nSpeed levels purchased\nAscensions purchased\n\nCredits\n\n\nDisclaimer\n\n\n\nVersion', new Color(255, 255, 255), 1, false, 'right', 'top', 0, Label.fontSize * 18);
        this.content = new Label('', new Color(255, 255, 255), 1, true, 'left', 'top', 0, Label.fontSize * 18);
    }
    public load(data: Partial<StatsData> = defaultStats): void {
        this.data.startTime = Math.floor(SMath.clamp(data.startTime ?? defaultStats.startTime, 0, Infinity));
        this.data.moneyEarned = SMath.clamp(data.moneyEarned ?? defaultStats.moneyEarned, 0, Infinity);
        this.data.moneySpent = SMath.clamp(data.moneySpent ?? defaultStats.moneySpent, 0, Infinity);
        this.data.orbitsCompleted = Math.floor(SMath.clamp(data.orbitsCompleted ?? defaultStats.orbitsCompleted, 0, Infinity));
        this.data.speedLevelsPurchased = Math.floor(SMath.clamp(data.speedLevelsPurchased ?? defaultStats.speedLevelsPurchased, 0, Infinity));
        this.data.ascensionsPurchased = Math.floor(SMath.clamp(data.ascensionsPurchased ?? defaultStats.ascensionsPurchased, 0, Infinity));
    }
    /**
     * Show the statistics panel
     */
    public show(): void {
        this.visible = true;
    }
    /**
     * Hide the statistics panel
     */
    public hide(): void {
        this.visible = false;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Skip if not visible
        if (!this.visible) {
            return;
        }
        // Draw background shading
        graphics.fillStyle = Statistics.shade.toString();
        graphics.fillRect(Label.fontSize * 15, Label.fontSize * 10, graphics.canvas.width - Label.fontSize * 30, graphics.canvas.height - Label.fontSize * 20);
        // Set content
        this.content.value = `${new Date(this.data.startTime).toLocaleString()}\n${N(player.getNumOrbits())} planets\n$${N(this.data.moneyEarned)}\n$${N(this.data.moneySpent)}\n${N(this.data.orbitsCompleted)} orbits\n${N(this.data.speedLevelsPurchased)}\n${N(this.data.ascensionsPurchased)}\n\nNicolas Ventura\nnicfv.com\n\nGenerative AI was used for\n30-second looping audio but\nnot for game design or code\n\n${version}`;
        // X-center all labels
        this.title.x = graphics.canvas.width / 2;
        this.headers.x = (graphics.canvas.width - Label.fontSize) / 2;
        this.content.x = (graphics.canvas.width + Label.fontSize) / 2;
        // Draw all labels and close button
        this.title.draw(graphics);
        this.headers.draw(graphics);
        this.content.draw(graphics);
    }
}

/**
 * Interface containing various in-game statistics
 */
export interface StatsData {
    startTime: number;
    moneyEarned: number;
    moneySpent: number;
    orbitsCompleted: number;
    speedLevelsPurchased: number;
    ascensionsPurchased: number;
}

const defaultStats: StatsData = {
    startTime: Date.now(),
    moneyEarned: 0,
    moneySpent: 0,
    orbitsCompleted: 0,
    speedLevelsPurchased: 0,
    ascensionsPurchased: 0,
};
