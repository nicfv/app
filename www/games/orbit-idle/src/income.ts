import { SMath } from 'smath';
import { Drawable } from 'graphico';
import { OrbitScore } from './wheel-score';
import { N } from './lib';
import { Label } from './label';
import { Color } from 'viridis';
import { player, orbits, zoom } from './state';

/**
 * Handles and renders game income.
 */
export class Income implements Drawable {
    private readonly orbitScores: OrbitScore[];
    private readonly incomeLargeLabel: Label;
    private readonly incomeSmallLabel: Label;
    /**
     * Initialize a new income handler.
     */
    constructor() {
        this.orbitScores = [];
        for (const orbit of orbits) {
            this.orbitScores.push(new OrbitScore(orbit, 0));
        }
        this.incomeLargeLabel = new Label('', new Color(255, 255, 255), 2, true, 'right', 'top', 0, Label.fontSize * 5);
        this.incomeSmallLabel = new Label('', new Color(255, 255, 255), 1, true, 'right', 'top', 0, Label.fontSize * 8);
    }
    /**
     * Calculate the income gained per complete rotation.
     */
    public getIncomePerRotation(): number {
        return SMath.prod(this.orbitScores.map(os => os.getScore()));
    }
    /**
     * Calculate the number of complete rotations per second.
     */
    public getRotationsPerSecond(): number {
        return SMath.sum(orbits.map(o => o.currentSpeedHz()));
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
        const focusedId: number = player.getNumOrbits() - zoom.getZoom();
        const focusedScore: OrbitScore = this.orbitScores[focusedId];
        let runningXOffset = (graphics.canvas.width - focusedScore.getWidth()) / 2;
        focusedScore.setXOffset(runningXOffset);
        focusedScore.draw(graphics);
        // Render all orbit scores to the right of the focused score
        runningXOffset += focusedScore.getWidth();
        for (let i = focusedId + 1; i < this.orbitScores.length; i++) {
            this.orbitScores[i].setXOffset(runningXOffset);
            runningXOffset += this.orbitScores[i].getWidth();
            this.orbitScores[i].draw(graphics);
        }
        // Render all orbit scores to the left of the focused score
        runningXOffset = (graphics.canvas.width - focusedScore.getWidth()) / 2;
        for (let i = focusedId - 1; i >= 0; i--) {
            runningXOffset -= this.orbitScores[i].getWidth();
            this.orbitScores[i].setXOffset(runningXOffset);
            this.orbitScores[i].draw(graphics);
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
