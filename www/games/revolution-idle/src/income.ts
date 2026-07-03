import { SMath } from 'smath';
import { Drawable } from 'graphico';
import { FONT_SIZE } from './globals';
import { Zoom } from './zoom';
import { Wheel } from './wheel';
import { WheelScore } from './wheel-score';

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
        graphics.fillStyle = 'black';
        graphics.fillRect(0, 0, graphics.canvas.width, FONT_SIZE * 4);
        let runningXOffset = 0;
        for (const wheelScore of this.wheelScores) {
            wheelScore.setXOffset(runningXOffset);
            runningXOffset += wheelScore.getWidth();
            wheelScore.draw(graphics);
        }
    }
}
