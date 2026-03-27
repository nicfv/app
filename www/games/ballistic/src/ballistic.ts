import { Drawable } from 'graphico';
import { version } from './version';
import { Menu } from './menu';
import { Difficulty, Game } from './game';
import { Page } from './page';

type GameState = 'Menu' | 'Difficulty Select' | 'Tutorial' | 'Game' | 'Paused' | 'Over' | 'Scores';

export class Ballistic implements Drawable {
    private state: GameState;
    private readonly main: Menu<string> = new Menu<string>('Ballistic', `Created by Nicolas Ventura`, ['Play', 'Help', 'Scores'], `Version ${version}`);
    private readonly diff: Menu<Difficulty> = new Menu<Difficulty>('Select Difficulty', '', ['Easy', 'Medium', 'Hard', 'X-treme'], '');
    private readonly pause: Menu<string> = new Menu<string>('Paused', '', ['Resume', 'Quit'], '');
    private readonly over: Page = new Page();
    private game?: Game;
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
                        break;
                    }
                    case ('Scores'): {
                        this.state = 'Scores';
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
                this.over.title = `YOU ${stats.status}!`;
                this.over.description = `Base Score: ${stats.baseScore}\nLives Left: ${stats.livesLeft} x 10 = ${stats.livesLeft * 10}\nHoles Completed: ${stats.completed}\nDifficulty Multiplier: ${stats.multiplier}\nTotal Score:\n[${stats.baseScore} + ${stats.livesLeft * 10} + ${stats.completed}] x ${stats.multiplier} = ${(stats.baseScore + stats.livesLeft * 10 + stats.completed) * stats.multiplier}\n\nPress Escape to return to the menu.`;
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
        }
    }
}