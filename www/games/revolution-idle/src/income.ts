import { SMath } from 'smath';
import { Drawable } from 'graphico';
import { NUM_WHEELS } from './globals';
import { WheelScore } from './wheel-score';
import { N } from './lib';
import { Label } from './label';
import { Color } from 'viridis';
import { wheels, zoom } from './state';

/**
 * Handles and renders game income.
 */
export class Income implements Drawable {
    private readonly wheelScores: WheelScore[];
    private readonly incomeLargeLabel: Label;
    private readonly incomeSmallLabel: Label;
    /**
     * Initialize a new income handler.
     */
    constructor() {
        this.wheelScores = [];
        for (const wheel of wheels) {
            this.wheelScores.push(new WheelScore(wheel, 0));
        }
        this.incomeLargeLabel = new Label('', new Color(255, 255, 255), 2, true, 'right', 'top', 0, Label.fontSize * 5);
        this.incomeSmallLabel = new Label('', new Color(255, 255, 255), 1, true, 'right', 'top', 0, Label.fontSize * 8);
    }
    /**
     * Calculate the income gained per complete rotation.
     */
    public getIncomePerRotation(): number {
        return SMath.prod(this.wheelScores.map(ws => ws.getScore()));
    }
    /**
     * Calculate the number of complete rotations per second.
     */
    public getRotationsPerSecond(): number {
        return SMath.sum(wheels.map(w => w.currentSpeedHz()));
    }
    /**
     * Calculate the average income gained per second.
     */
    public getIncomePerSecond(): number {
        return this.getIncomePerRotation() * this.getRotationsPerSecond();
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Render the black background
        graphics.fillStyle = 'black';
        graphics.fillRect(0, 0, graphics.canvas.width, Label.fontSize * 4);
        // Render the focused score centered on the window
        const focusedId: number = NUM_WHEELS - zoom.getZoom();
        const focusedScore: WheelScore = this.wheelScores[focusedId];
        let runningXOffset = (graphics.canvas.width - focusedScore.getWidth()) / 2;
        focusedScore.setXOffset(runningXOffset);
        focusedScore.draw(graphics);
        // Render all wheel scores to the right of the focused score
        runningXOffset += focusedScore.getWidth();
        for (let i = focusedId + 1; i < this.wheelScores.length; i++) {
            this.wheelScores[i].setXOffset(runningXOffset);
            runningXOffset += this.wheelScores[i].getWidth();
            this.wheelScores[i].draw(graphics);
        }
        // Render all wheel scores to the left of the focused score
        runningXOffset = (graphics.canvas.width - focusedScore.getWidth()) / 2;
        for (let i = focusedId - 1; i >= 0; i--) {
            runningXOffset -= this.wheelScores[i].getWidth();
            this.wheelScores[i].setXOffset(runningXOffset);
            this.wheelScores[i].draw(graphics);
        }
        // Render total incomes
        const rightAlign: number = graphics.canvas.width - Label.fontSize / 2;
        this.incomeLargeLabel.value = `$${N(this.getIncomePerSecond())} /s`;
        this.incomeLargeLabel.x = rightAlign;
        this.incomeLargeLabel.draw(graphics);
        this.incomeSmallLabel.value = `$${N(this.getIncomePerRotation())}  /rev\n${N(this.getRotationsPerSecond())} rev/s`;
        this.incomeSmallLabel.x = rightAlign;
        this.incomeSmallLabel.draw(graphics);
    }
}
