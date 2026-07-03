import { SMath } from 'smath';
import { Drawable } from 'graphico';
import { FONT_FAMILY, FONT_SIZE, NUM_WHEELS } from './globals';
import { Zoom } from './zoom';
import { Wheel } from './wheel';
import { WheelScore } from './wheel-score';
import { N } from './lib';

/**
 * Handles and renders game income.
 */
export class Income implements Drawable {
    private readonly wheelScores: WheelScore[];
    /**
     * Initialize a new income handler.
     */
    constructor(private readonly zoom: Zoom, private readonly wheels: Wheel[]) {
        this.wheelScores = [];
        for (const wheel of wheels) {
            this.wheelScores.push(new WheelScore(wheel, 0));
        }
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
        return SMath.sum(this.wheels.map(w => w.currentSpeedHz()));
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
        graphics.fillRect(0, 0, graphics.canvas.width, FONT_SIZE * 4);
        // Render the focused score centered on the window
        const focusedId: number = NUM_WHEELS - this.zoom.getZoom();
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
        const rightAlign: number = graphics.canvas.width - FONT_SIZE / 2;
        graphics.textAlign = 'right';
        graphics.textBaseline = 'top';
        graphics.fillStyle = 'white';
        graphics.font = `bold ${FONT_SIZE * 2}px ${FONT_FAMILY}`;
        graphics.fillText(`$${N(this.getIncomePerRotation())}/rev`, rightAlign, FONT_SIZE * 5);
        graphics.font = `bold ${FONT_SIZE}px ${FONT_FAMILY}`;
        graphics.fillText(`${N(this.getRotationsPerSecond())} rev/s`, rightAlign, FONT_SIZE * 7.5);
        graphics.fillText(`$${N(this.getIncomePerSecond())}/s`, rightAlign, FONT_SIZE * 9);
    }
}
