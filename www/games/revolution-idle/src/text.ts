import { Drawable } from 'graphico';
import { Color } from 'viridis';

/**
 * Represents a drawable text element.
 */
export class Text implements Drawable {
    /**
     * Global font family name
     */
    public static readonly fontFamily = 'Roboto Mono';
    /**
     * Global base font size
     */
    public static readonly fontSize = 12;
    private width: number;
    /**
     * Create a new drawable text element.
     */
    constructor(public value: string, public fill: Color, public fontSizeFactor: number, public bold: boolean, public textAlign: CanvasTextAlign, public textBaseline: CanvasTextBaseline, public x: number, public y: number) {
        this.width = 0;
    }
    /**
     * Get the width of the rendered text.
     */
    public getWidth(): number {
        return this.width;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Calculate actual font size and set properties
        const fontSize: number = Text.fontSize * this.fontSizeFactor;
        graphics.fillStyle = this.fill.toString();
        graphics.font = `${this.bold ? 'bold ' : ''}${fontSize}px ${Text.fontFamily}`;
        graphics.textAlign = this.textAlign;
        graphics.textBaseline = this.textBaseline;
        this.width = 0;
        // Actually render text line-by-line and calculate max width
        const lines: string[] = this.value.split('\n');
        for (const lineNum in lines) {
            const line: string = lines[lineNum];
            graphics.fillText(line, this.x | 0, (this.y + fontSize * +lineNum) | 0);
            const lineWidth: number = graphics.measureText(line).width;
            if (lineWidth > this.width) {
                this.width = lineWidth;
            }
        }
    }
}
