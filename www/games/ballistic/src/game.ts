import { Drawable } from 'graphico';
import { Ball } from './ball';
import { Rod } from './rod';
import { Hole } from './hole';
import { Progress } from './progress';
import { rint } from 'smath';

export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'X-treme';

export interface GameOverStats {
    readonly status: 'WIN' | 'LOSE';
    readonly baseScore: number;
    readonly livesLeft: number;
    readonly completed: number;
    readonly multiplier: number;
}

/**
 * Represents an instance of the game
 */
export class Game implements Drawable {
    /**
     * The current score
     */
    private score: number;
    /**
     * Score multiplier based on difficulty level
     */
    private difficultyMult: number;
    /**
     * The time spent in the current round
     */
    private roundTime: number;
    /**
     * Whether or not the board is resetting
     */
    private resetting: boolean;
    /**
     * Determine if the game is over
     */
    private gameOver: boolean;
    /**
     * How many holes have been completed
     */
    private completed: number;
    /**
     * The total number of holes that need to be completed
     */
    private readonly total = 10;
    /**
     * The game progress bar
     */
    private readonly progress: Progress[];
    /**
     * The extra lives left
     */
    private readonly lives: Ball[];
    /**
     * The ball used to play the game
     */
    private readonly ball: Ball;
    /**
     * The rod for playing the game
     */
    private readonly rod: Rod;
    /**
     * The holes in the middle of the game board
     */
    private readonly holes: Hole[];
    /**
     * The holes on the sides of the game board
     */
    private readonly sideHoles: Hole[];
    /**
     * The user inputs
     */
    private readonly inputs: GameInput = {
        lDown: false,
        lUp: false,
        rDown: false,
        rUp: false,
    };
    /**
     * Initialize a new game.
     */
    constructor(width: number, height: number, difficulty: Difficulty) {
        this.score = 0;
        this.roundTime = 0;
        this.resetting = false;
        this.gameOver = false;
        this.completed = 0;
        let lifeCount: number; // number of lives
        let ballR: number; // ball radius
        let gFac: number; // gravity factor
        let maxSpeed: number; // maximum speed the ball can drop into a hole
        let maxDistFac: number; // maximum distance away the ball can fall into from the center of a hole
        let holeRFac: number; // the size of a hole compared to the size of the ball
        let holePadding: number; // the distance apart each hole can be from each other
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
                sideHoleDistFac = 5;
                this.difficultyMult = 1;
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
                sideHoleDistFac = 4;
                this.difficultyMult = 2;
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
                sideHoleDistFac = 3.5;
                this.difficultyMult = 3;
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
                sideHoleDistFac = 3;
                this.difficultyMult = 4;
                break;
            }
            default: {
                throw new Error(`${difficulty} is not a valid difficulty.`);
            }
        }
        const vPadding: number = ballR * 5;
        this.ball = new Ball(0, 0, ballR, width, 9.81 * 500 * gFac, 0.99, maxSpeed, maxDistFac, 0.33);
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
        // Generate progress bar
        this.progress = [];
        for (let i = 0; i < this.total; i++) {
            this.progress.push(new Progress((i + 1) * 15, 15, 5));
        }
    }
    /**
     * Calculate the bonus score for getting the ball in the hole. The score starts high but slowly drops to 1...
     */
    private scoreBonus(): number {
        return (100 / (this.roundTime + 10) + 1) | 0;
    }
    /**
     * Get the current goal hole.
     */
    private currentHole(): Hole {
        return this.holes[(this.holes.length * this.completed / this.total) | 0];
    }
    /**
     * Go to the next goal.
     */
    private nextGoal(): void {
        this.progress[this.completed].complete();
        this.currentHole().deselect();
        this.completed++;
        this.score += this.scoreBonus();
        if (this.completed < this.total) {
            this.currentHole().select();
            this.resetting = true;
        } else {
            this.gameOver = true;
        }
    }
    /**
     * Lose one life.
     */
    private loseLife(): void {
        this.progress[this.completed].fail();
        if (this.lives.length > 0) {
            this.lives.pop();
            this.resetting = true;
        } else {
            this.gameOver = true;
        }
    }
    /**
     * Reset the game board.
     */
    private reset(dt: number): void {
        if (this.rod.reset(dt)) {
            this.ball.reset(0, 0);
            this.resetting = false;
            this.roundTime = 0;
        }
    }
    /**
     * Accept user input.
     */
    public input(leftUp: boolean, leftDown: boolean, rightUp: boolean, rightDown: boolean): void {
        this.inputs.lUp = leftUp;
        this.inputs.lDown = leftDown;
        this.inputs.rUp = rightUp;
        this.inputs.rDown = rightDown;
    }
    /**
     * Advance through the game.
     */
    public tick(dt: number): void {
        if (this.gameOver) {
            return;
        }
        if (this.resetting) {
            this.reset(dt);
            return;
        }
        this.roundTime += dt / 1e3;
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
    public gameOverStats(): GameOverStats | undefined {
        return this.gameOver ? {
            status: this.completed >= this.total ? 'WIN' : 'LOSE',
            baseScore: this.score,
            livesLeft: this.completed >= this.total ? this.lives.length + 1 : 0,
            completed: this.completed,
            multiplier: this.difficultyMult,
        } : undefined;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        for (const prog of this.progress) {
            prog.draw(graphics);
        }
        for (const hole of [...this.holes, ...this.sideHoles]) {
            hole.draw(graphics);
        }
        for (const life of this.lives) {
            life.draw(graphics);
        }
        this.ball.draw(graphics);
        this.rod.draw(graphics);
        graphics.fillStyle = 'white';
        graphics.textAlign = 'left';
        graphics.font = 'bold 12px monospace';
        graphics.fillText(`Score: ${this.score} (+${this.scoreBonus()})`, 10, 36);
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
