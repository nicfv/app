import { Drawable } from 'graphico';

export class Bar implements Drawable {
    constructor(private readonly name: string, private readonly value: number, private readonly maxValue: number, private readonly barNum: number, private readonly thickness: number, private readonly color: string) { }
    public draw(ctx: CanvasRenderingContext2D): void {
        const yOffset: number = this.barNum * this.thickness * 1.25;
        const maxWidth: number = ctx.canvas.width - this.thickness * 5;
        const barWidth: number = this.value / this.maxValue * maxWidth;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.thickness * 1.5, yOffset - this.thickness / 2, barWidth + this.thickness * 0.5, this.thickness);
        // Draw the bar name and value
        ctx.font = `${this.thickness}px sans-serif`;
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'right';
        ctx.fillText(this.name, this.thickness, yOffset);
        ctx.textAlign = 'left';
        ctx.fillText(this.value.toString(), barWidth + this.thickness * 2.5, yOffset);
    }
}