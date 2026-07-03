import { Drawable } from 'graphico';
import { FONT_SIZE } from './globals';
import { Zoom } from './zoom';
import { Wheel } from './wheel';
import { WheelScore } from './wheel-score';

export class Income implements Drawable {
    private readonly wheelScores: WheelScore[];
    constructor(private readonly zoom: Zoom, private readonly wheels: Wheel[]) {
        this.wheelScores = [];
        for (const wheel of wheels) {
            this.wheelScores.push(new WheelScore(wheel, 0));
        }
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
