import { Drawable } from 'graphico';
import { Ball } from './ball';
import { Rod } from './rod';
import { Hole } from './hole';
import { rint } from 'smath';

export class Game implements Drawable {
    private readonly ball: Ball;
    private readonly rod: Rod;
    private readonly holes: Hole[];
    private readonly inputs: GameInput = {
        lDown: false,
        lUp: false,
        rDown: false,
        rUp: false,
    };
    constructor(public readonly width: number, public readonly height: number, difficulty: 'Easy' | 'Medium' | 'Hard') {
        const ballR = 10;
        let gFac: number; // gravity factor
        let maxSpeed: number; // maximum speed the ball can drop into a hole
        let maxDistFac: number; // maximum distance away the ball can fall into from the center of a hole
        let holeRFac: number; // the size of a hole compared to the size of the ball
        let holePadding: number; // the distance apart each hole can be from each other
        let showSpeed: boolean; // show the speedometer for the ball
        switch (difficulty) {
            case ('Easy'): {
                gFac = 0.75;
                maxSpeed = 150;
                maxDistFac = 0.30;
                holeRFac = 1.5;
                holePadding = 1.75;
                showSpeed = true;
                break;
            }
            case ('Medium'): {
                gFac = 1;
                maxSpeed = 100;
                maxDistFac = 0.25;
                holeRFac = 1.3;
                holePadding = 1.50;
                showSpeed = false;
                break;
            }
            case ('Hard'): {
                gFac = 1;
                maxSpeed = 100;
                maxDistFac = 0.25;
                holeRFac = 1.1;
                holePadding = 1.25;
                showSpeed = false;
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
    public input(leftUp: boolean, leftDown: boolean, rightUp: boolean, rightDown: boolean): void {
        this.inputs.lUp = leftUp;
        this.inputs.lDown = leftDown;
        this.inputs.rUp = rightUp;
        this.inputs.rDown = rightDown;
    }
    public tick(dt: number): void {
        this.rod.move(dt,
            this.inputs.lUp ? 'Up' : this.inputs.lDown ? 'Down' : 'None',
            this.inputs.rUp ? 'Up' : this.inputs.rDown ? 'Down' : 'None');
        this.ball.move(dt, this.rod, this.holes);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        for (const hole of this.holes) {
            hole.draw(graphics);
        }
        this.ball.draw(graphics);
        this.rod.draw(graphics);
    }
}

interface GameInput {
    /**
     * Left-up
     */
    lUp: boolean;
    /**
     * Left-down
     */
    lDown: boolean;
    /**
     * Right-up
     */
    rUp: boolean;
    /**
     * Right-down
     */
    rDown: boolean;
};
