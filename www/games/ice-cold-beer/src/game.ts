import { Drawable } from 'graphico';
import { Ball } from './ball';
import { Rod } from './rod';
import { Hole } from './hole';
import { rint } from 'smath';

export class Game implements Drawable {
    private readonly ball: Ball;
    private readonly rod: Rod;
    private readonly holes: Hole[];
    constructor(public readonly width: number, public readonly height: number, difficulty: 'Easy' | 'Medium' | 'Hard') {
        const ballR = 10;
        let gFac = 1;
        let maxSpeed = 100;
        let maxDistFac = 0.25;
        let holeRFac = 1.1;
        let holePadding = 1.75;
        let showSpeed = false;
        switch (difficulty) {
            case ('Easy'): {
                gFac = 0.75;
                maxDistFac = 0.30;
                maxSpeed = 200;
                holeRFac = 1.5;
                showSpeed = true;
                break;
            }
            case ('Medium'): {
                break;
            }
            case ('Hard'): {
                break;
            }
            default: {
                throw new Error(`${difficulty} is not a valid difficulty.`);
            }
        }
        this.ball = new Ball(0, 0, ballR, width, 9.81 * 500 * gFac, 0.99, maxSpeed, maxDistFac, 0.33, showSpeed);
        this.rod = new Rod(height - 100, height - 100, width, height, 100, 10);
        const holeR: number = ballR * holeRFac;
        this.holes = [];
        for (let y = height - 100; y > holeR * 2; y -= rint(1, holeR)) {
            const hole = new Hole(rint(holeR * 2, width - holeR * 2), y, holeR, holePadding);
            let intersects = false;
            for (const existingHole of this.holes) {
                if (hole.intersects(existingHole)) {
                    intersects = true;
                    break;
                }
            }
            if (!intersects) {
                this.holes.push(hole);
            }
        }
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        for (const hole of this.holes) {
            hole.draw(graphics);
        }
        this.ball.draw(graphics);
        this.rod.draw(graphics);
    }
}