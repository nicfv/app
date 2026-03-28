import { Drawable } from 'graphico';
import { version } from './version';
import { Menu } from './menu';
import { Difficulty, Game } from './game';
import { Page } from './page';
import { Ball } from './ball';
import { Hole } from './hole';
import { Rod } from './rod';
import { Progress } from './progress';

type GameState = 'Menu' | 'Difficulty Select' | 'Tutorial' | 'Game' | 'Paused' | 'Over' | 'Scores';

export class Ballistic implements Drawable {
    private state: GameState;
    private helpPage: number;
    private readonly main: Menu<string> = new Menu<string>('Ballistic', 'Created by Nicolas Ventura\n\n\nUse the arrow keys and\npress Space to select.', ['Play', 'Help', 'Scores'], `Version ${version}`);
    private readonly diff: Menu<Difficulty> = new Menu<Difficulty>('Select Difficulty', '\n\n\nUse the arrow keys and\npress Space to select.', ['Easy', 'Medium', 'Hard', 'X-treme'], 'Press Escape to return to the menu.');
    private readonly pause: Menu<string> = new Menu<string>('Paused', '', ['Resume', 'Quit'], '');
    private readonly over: Page = new Page('', '', 'Press Escape to return to the menu.');
    private readonly scores: Page = new Page('High Scores', '', 'Press Escape to return to the menu.');
    private readonly help: Page[] = [];
    private readonly tutorialRod1: Rod;
    private readonly tutorialRod2: Rod;
    private readonly tutorialBall: Ball;
    private readonly tutorialHole: Hole;
    private readonly tutorialProg: Progress[];
    private game?: Game;
    private readonly highScores: Record<Difficulty, number> = {
        Easy: 0,
        Medium: 0,
        Hard: 0,
        'X-treme': 0,
    };
    constructor(public readonly width: number, public readonly height: number) {
        this.state = 'Menu';
        this.helpPage = 0;
        this.tutorialRod1 = new Rod(height * 0.76, height * 0.80, width, height);
        this.tutorialRod2 = new Rod(height * 0.75, height * 0.80, width, height);
        this.tutorialBall = new Ball(width * 0.30, height * 0.70, 15, width, 500);
        this.tutorialHole = new Hole(width * 0.70, height * 0.75, 20, 0);
        this.tutorialProg = [];
        for (let i = 0; i < 10; i++) {
            this.tutorialProg.push(new Progress(width * 0.20 + i * 15, height * 0.80, 5));
        }
        this.tutorialProg[0].complete();
        this.tutorialProg[1].complete();
        this.tutorialProg[1].fail();
        this.tutorialProg[2].complete();
        this.tutorialProg[3].complete();
        this.tutorialProg[4].fail();
        this.help.push(new Page('Tutorial: 1', 'Welcome to Ballistic!\n\nIn this game, you boths ends of\na rod simultaneously to balance\na ball and ultimately reach\nthe target hole.\n\nCONTROLS:\nW/S - Move the left  side up/down\nI/K - Move the right side up/down', 'Press Space to continue or Escape to exit.', [this.tutorialRod1, this.tutorialBall]));
        this.help.push(new Page('Tutorial: 2', 'By changing the angle of the rod,\nyou can direct the ball.\n\nYour goal is to get the ball\ninto the target hole while\navoiding all other holes.\n\nEach time you succeed, the goal\nwill move further up the board.', 'Press Space to continue or Escape to exit.', [this.tutorialHole, this.tutorialRod1, this.tutorialBall]));
        this.help.push(new Page('Tutorial: 3', 'The goal is outlined in white.\n\nMaintain control of the ball!\nDon\'t let it roll too fast.\n\nGravity has been turned down in\nthis tutorial.', 'Press Space to continue or Escape to exit.', [this.tutorialHole, this.tutorialRod1, this.tutorialBall]));
        this.help.push(new Page('Tutorial: 4', 'Look what happens when you\nlet the ball roll too fast!\n\nLuckily, this hole was an\nobstacle, so you wouldn\'t\nwant to fall into it anyway\nand lose a life.', 'Press Space to continue or Escape to exit.', [this.tutorialHole, this.tutorialRod2, this.tutorialBall]));
        this.help.push(new Page('Tutorial: 5', 'You must make 10 goals to win.\n\nAt the top-left, you will see\nyour progress, which is\ncurrently shown below.\n\nA green checkmark indicates a\ncompleted goal.\n\nA red X indicates a life lost.\n\nEven if you lose multiple\nlives on one hole, it\nwill just show a single X.', 'Press Space to continue or Escape to exit.', this.tutorialProg));
        this.help.push(new Page('Final Tips', 'The quicker you get the ball\nto the goal, the more\npoints you earn!\n\nYour *remaining* lives are\nshown at the top-right,\nso you actually have one more\nlife than it looks.', 'Press Space to continue or Escape to exit.'));
    }
    public scrollUp(): void {
        switch (this.state) {
            case ('Menu'): {
                this.main.scrollUp();
                break;
            }
            case ('Difficulty Select'): {
                this.diff.scrollUp();
                break;
            }
            case ('Paused'): {
                this.pause.scrollUp();
                break;
            }
        }
    }
    public scrollDown(): void {
        switch (this.state) {
            case ('Menu'): {
                this.main.scrollDown();
                break;
            }
            case ('Difficulty Select'): {
                this.diff.scrollDown();
                break;
            }
            case ('Paused'): {
                this.pause.scrollDown();
                break;
            }
        }
    }
    public select(): void {
        switch (this.state) {
            case ('Menu'): {
                switch (this.main.select()) {
                    case ('Play'): {
                        this.state = 'Difficulty Select';
                        break;
                    }
                    case ('Help'): {
                        this.state = 'Tutorial';
                        this.helpPage = 0;
                        this.tutorialBall.reset();
                        this.tutorialHole.deselect();
                        break;
                    }
                    case ('Scores'): {
                        this.state = 'Scores';
                        this.scores.description = 'Try to beat these scores!\n\n';
                        for (const diff in this.highScores) {
                            this.scores.description += `${diff}\n${this.highScores[diff as Difficulty]}\n\n`;
                        }
                        break;
                    }
                }
                break;
            }
            case ('Difficulty Select'): {
                this.game = new Game(this.width, this.height, this.diff.select());
                this.state = 'Game';
                break;
            }
            case ('Tutorial'): {
                if (this.helpPage < this.help.length - 1) {
                    this.helpPage++;
                    this.tutorialBall.reset();
                    this.tutorialHole.deselect();
                    if (this.helpPage === 2) {
                        this.tutorialHole.select();
                    }
                } else {
                    this.state = 'Menu';
                }
                break;
            }
            case ('Paused'): {
                switch (this.pause.select()) {
                    case ('Resume'): {
                        this.state = 'Game';
                        break;
                    }
                    case ('Quit'): {
                        this.game = undefined;
                        this.state = 'Menu';
                        break;
                    }
                }
                break;
            }
        }
    }
    public escape(): void {
        switch (this.state) {
            case ('Difficulty Select'):
            case ('Tutorial'):
            case ('Scores'):
            case ('Over'): {
                this.state = 'Menu';
                break;
            }
            case ('Game'): {
                this.state = 'Paused';
                break;
            }
        }
    }
    public gameInput(leftUp: boolean, leftDown: boolean, rightUp: boolean, rightDown: boolean): void {
        if (this.state === 'Game' && this.game) {
            this.game.input(leftUp, leftDown, rightUp, rightDown);
        }
    }
    public tick(dt: number): void {
        if (this.state === 'Game' && this.game) {
            this.game.tick(dt);
            const stats = this.game.gameOverStats();
            if (stats) {
                this.state = 'Over';
                const totalScore: number = (stats.baseScore + stats.livesLeft * 10 + stats.completed) * stats.multiplier;
                this.over.title = `YOU ${stats.status}!`;
                this.over.description = `Difficulty: ${stats.difficulty} (x${stats.multiplier})\n\nBase Score: ${stats.baseScore}\nLives Left: ${stats.livesLeft} x 10 = ${stats.livesLeft * 10}\nHoles Completed: ${stats.completed}\n\nTotal Score:\n[${stats.baseScore} + ${stats.livesLeft * 10} + ${stats.completed}] x ${stats.multiplier} = ${totalScore}`;
                if (totalScore > this.highScores[stats.difficulty]) {
                    this.over.description += `\n\nNew high score for ${stats.difficulty}!\nPrevious high score: ${this.highScores[stats.difficulty]}`;
                    this.highScores[stats.difficulty] = totalScore;
                } else {
                    this.over.description += `\n\nHigh score for ${stats.difficulty}: ${this.highScores[stats.difficulty]}`;
                }
            }
        } else if (this.state === 'Tutorial') {
            if (this.helpPage === 2) {
                this.tutorialBall.move(dt, this.tutorialRod1, [this.tutorialHole]);
            } else if (this.helpPage === 3) {
                this.tutorialBall.move(dt, this.tutorialRod2, [this.tutorialHole]);
            }
        }
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        switch (this.state) {
            case ('Menu'): {
                this.main.draw(graphics);
                break;
            }
            case ('Difficulty Select'): {
                this.diff.draw(graphics);
                break;
            }
            case ('Tutorial'): {
                this.help[this.helpPage].draw(graphics);
                break;
            }
            case ('Game'): {
                this.game?.draw(graphics);
                break;
            }
            case ('Paused'): {
                this.pause.draw(graphics);
                break;
            }
            case ('Over'): {
                this.over.draw(graphics);
                break;
            }
            case ('Scores'): {
                this.scores.draw(graphics);
                break;
            }
        }
    }
}