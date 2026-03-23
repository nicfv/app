import { Drawable } from 'graphico';
import { Ball } from './ball';
import { Rod } from './rod';
import { Hole } from './hole';
import { rint } from 'smath';

export class Game implements Drawable {
    private score: number;
    private resetting: boolean;
    private readonly lives: Ball[];
    private readonly ball: Ball;
    private readonly rod: Rod;
    private readonly holes: Hole[];
    private readonly sideHoles: Hole[];
    private readonly inputs: GameInput = {
        lDown: false,
        lUp: false,
        rDown: false,
        rUp: false,
    };
    constructor(public readonly width: number, public readonly height: number, difficulty: 'Easy' | 'Medium' | 'Hard' | 'X-treme') {
        this.score = 0;
        this.resetting = false;
        let lifeCount: number; // number of lives
        let ballR: number; // ball radius
        let gFac: number; // gravity factor
        let maxSpeed: number; // maximum speed the ball can drop into a hole
        let maxDistFac: number; // maximum distance away the ball can fall into from the center of a hole
        let holeRFac: number; // the size of a hole compared to the size of the ball
        let holePadding: number; // the distance apart each hole can be from each other
        let showSpeed: boolean; // show the speedometer for the ball
        let sideHoleDistFac: number;// side hole distance factor
        switch (difficulty) {
            case ('Easy'): {
                lifeCount = 4;
                ballR = 12;
                gFac = 0.75;
                maxSpeed = 150;
                maxDistFac = 0.35;
                holeRFac = 1.3;
                holePadding = 1.75;
                showSpeed = true;
                sideHoleDistFac = 5;
                break;
            }
            case ('Medium'): {
                lifeCount = 3;
                ballR = 11;
                gFac = 1;
                maxSpeed = 175;
                maxDistFac = 0.35;
                holeRFac = 1.2;
                holePadding = 1.50;
                showSpeed = false;
                sideHoleDistFac = 4;
                break;
            }
            case ('Hard'): {
                lifeCount = 3;
                ballR = 10;
                gFac = 1.25;
                maxSpeed = 200;
                maxDistFac = 0.40;
                holeRFac = 1.1;
                holePadding = 1.25;
                showSpeed = false;
                sideHoleDistFac = 3.5;
                break;
            }
            case ('X-treme'): {
                lifeCount = 2;
                ballR = 8;
                gFac = 1.50;
                maxSpeed = 250;
                maxDistFac = 0.45;
                holeRFac = 1.05;
                holePadding = 1.1;
                showSpeed = false;
                sideHoleDistFac = 3;
                break;
            }
            default: {
                throw new Error(`${difficulty} is not a valid difficulty.`);
            }
        }
        const vPadding: number = ballR * 5;
        this.ball = new Ball(0, 0, ballR, width, 9.81 * 500 * gFac, 0.99, maxSpeed, maxDistFac, 0.33, showSpeed);
        this.rod = new Rod(height - vPadding, height - vPadding, width, height, 100, 10);
        const holeR: number = ballR * holeRFac;
        this.holes = [];
        for (let y = height - vPadding - holeR * 3; y > vPadding; y -= rint(1, holeR)) {
            const hole = new Hole(rint(holeR * 3, width - holeR * 3), y, holeR, holePadding);
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
        // Set the first hole as the goal
        this.holes[0].select();
        // Generate lives counter
        this.lives = [];
        for (let life = 0; life < lifeCount; life++) {
            this.lives.push(new Ball(width - (life + 1) * ballR * 2.5, ballR * 2.5, ballR, width));
        }
        // Generate side holes
        this.sideHoles = [];
        for (let y = height - vPadding - holeR * 3; y > vPadding; y -= holeR * sideHoleDistFac) {
            this.sideHoles.push(new Hole(ballR, y, holeR, 0), new Hole(width - ballR, y, holeR, 0));
        }
    }
    private nextGoal(): void {
        this.holes[this.score].deselect();
        this.score++;
        this.holes[this.score].select();
        this.resetting = true;
    }
    private loseLife(): void {
        this.lives.pop();
        this.resetting = true;
    }
    private reset(dt: number): void {
        if (this.rod.reset(dt)) {
            this.ball.reset(0, 0);
            this.resetting = false;
        }
    }
    public input(leftUp: boolean, leftDown: boolean, rightUp: boolean, rightDown: boolean): void {
        this.inputs.lUp = leftUp;
        this.inputs.lDown = leftDown;
        this.inputs.rUp = rightUp;
        this.inputs.rDown = rightDown;
    }
    public tick(dt: number): void {
        if (this.resetting) {
            this.reset(dt);
            return;
        }
        this.rod.move(dt,
            this.inputs.lUp ? 'Up' : this.inputs.lDown ? 'Down' : 'None',
            this.inputs.rUp ? 'Up' : this.inputs.rDown ? 'Down' : 'None');
        this.ball.move(dt, this.rod, [...this.holes, ...this.sideHoles]);
        if (this.ball.won()) {
            this.nextGoal();
        } else if (this.ball.lost()) {
            this.loseLife();
        }
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        for (const hole of [...this.holes, ...this.sideHoles]) {
            hole.draw(graphics);
        }
        for (const life of this.lives) {
            life.draw(graphics);
        }
        this.ball.draw(graphics);
        this.rod.draw(graphics);
        graphics.fillStyle = 'white';
        graphics.font = 'bold 12px monospace';
        graphics.fillText(`Score: ${this.score}`, 6, 18);
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
