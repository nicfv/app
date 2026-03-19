import { Drawable } from 'graphico';
import { Ball } from './ball';
import { Rod } from './rod';
import { Hole } from './hole';

export class Game implements Drawable {
    private readonly ball: Ball;
    private readonly rod: Rod;
    private readonly holes: Hole[];
    constructor(width: number, height: number, difficulty: 'Easy' | 'Medium' | 'Hard') {
        const ballR = 20;
        let gFac = 1;
        let maxSpeed = 100;
        let maxDistFac = 0.25;
        let holeRFac = 1.1;
        let showSpeed = false;
        switch (difficulty) {
            case ('Easy'): {
                gFac = 0.75;
                maxDistFac = 0.30;
                maxSpeed = 200;
                holeRFac = 1.5;
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
        this.holes = [];
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        console.log(graphics);
        throw new Error('Method not implemented.');
    }
}