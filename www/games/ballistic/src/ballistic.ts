import { Drawable } from 'graphico';
import { version } from './version';
import { Menu } from './menu';
import { Difficulty, Game } from './game';
import { Page } from './page';

type GameState = 'Menu' | 'Difficulty Select' | 'Tutorial' | 'Game' | 'Paused' | 'Over' | 'Scores';

export class Ballistic implements Drawable {
    private state: GameState;
    private helpPage = 0;
    private readonly main: Menu<string> = new Menu<string>('Ballistic', 'Created by Nicolas Ventura\n\n\nUse the arrow keys and\npress Space to select.', ['Play', 'Help', 'Scores'], `Version ${version}`);
    private readonly diff: Menu<Difficulty> = new Menu<Difficulty>('Select Difficulty', '\n\n\nUse the arrow keys and\npress Space to select.', ['Easy', 'Medium', 'Hard', 'X-treme'], 'Press Escape to return to the menu.');
    private readonly pause: Menu<string> = new Menu<string>('Paused', '', ['Resume', 'Quit'], '');
    private readonly over: Page = new Page('', '', 'Press Escape to return to the menu.');
    public readonly scores: Page = new Page('High Scores', '', 'Press Escape to return to the menu.');
    public readonly help: Page[] = [
        new Page('Tutorial - Part 1', 'Welcome to Ballistic!\n\nIn this game, you control a golf ball and try to get it into the hole in as few strokes as possible.\n\nUse the W and S keys to scroll through the power of your shot, and the I and K keys to scroll through the angle of your shot.\n\nPress Space to take the shot.', 'Press Space to continue.'),
        new Page('Tutorial - Part 2', 'After you take your shot, you will have to wait for the ball to come to a complete stop before you can take another shot.\n\nIf you take too long to take your next shot, you will lose a stroke.\n\nTry to get the ball in the hole in as few strokes as possible!', 'Press Space to continue.'),
    ];
    private game?: Game;
    private readonly highScores: Record<Difficulty, number> = {
        Easy: 0,
        Medium: 0,
        Hard: 0,
        'X-treme': 0,
    };
    constructor(public readonly width: number, public readonly height: number) {
        this.state = 'Menu';
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