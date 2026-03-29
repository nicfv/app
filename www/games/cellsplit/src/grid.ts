import { Drawable } from 'graphico';
import { Vec2 } from './lib';

export class Grid implements Drawable {
    private panX: number;
    private panY: number;
    constructor(public readonly size: Vec2) {
        this.panX = 0;
        this.panY = 0;
    }
    public pan(direction: Direction = 'None'): Vec2 {
        switch (direction) {
            case ('Down'): {
                this.panY--;
                break;
            }
            case ('Left'): {
                this.panX++;
                break;
            }
            case ('Right'): {
                this.panX--;
                break;
            }
            case ('Up'): {
                this.panY++;
                break;
            }
        }
        return { x: this.panX, y: this.panY };
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        throw new Error('Method not implemented.' + graphics);
    }
}

export type Direction = 'Left' | 'Right' | 'Up' | 'Down' | 'None';
