import { Drawable } from 'graphico';

export class Progress implements Drawable {
    private completed = false;
    constructor(private readonly x: number, private readonly y: number, private readonly r: number) { }
    public markComplete(): void {
        this.completed = true;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
}