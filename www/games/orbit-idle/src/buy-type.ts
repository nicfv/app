import { Drawable } from 'graphico';
import { Button } from './button';
import { Color } from 'viridis';
import { Label } from './label';

/**
 * Represents a control to change how many items are being purchased at once.
 */
export class BuyType implements Drawable {
    /**
     * Button sizing
     */
    private static readonly btnSize: number = Label.fontSize * 2;
    /**
     * Button padding
     */
    private static readonly btnPad: number = Label.fontSize / 2;
    /**
     * Button color
     */
    private static readonly btnColor: Color = new Color(200, 200, 200);
    private quantity: 1 | 10 | 100;
    private readonly buy1: Button;
    private readonly buy10: Button;
    private readonly buy100: Button;
    private readonly label: Label;
    /**
     * Initialize a new buy type control.
     */
    constructor(private readonly x: number, private readonly y: number) {
        this.quantity = 1;
        this.buy1 = new Button('1', BuyType.btnColor, true, x, y, BuyType.btnSize, BuyType.btnSize, () => this.quantity = 1);
        this.buy10 = new Button('10', BuyType.btnColor, true, x + BuyType.btnSize + BuyType.btnPad, y, BuyType.btnSize, BuyType.btnSize, () => this.quantity = 10);
        this.buy100 = new Button('100', BuyType.btnColor, true, x + (BuyType.btnSize + BuyType.btnPad) * 2, y, BuyType.btnSize, BuyType.btnSize, () => this.quantity = 100);
        this.label = new Label('', new Color(255, 255, 255), 1, false, 'center', 'bottom', x + BuyType.btnSize * 3 / 2 + BuyType.btnPad, y - Label.fontSize);
    }
    /**
     * Get the purchase quantity currently selected.
     */
    public getQuantity(): number {
        return this.quantity;
    }
    /**
     * Check if any buttons are currently being hovered.
     */
    public checkHover(mx: number, my: number): void {
        this.buy1.checkHover(mx, my);
        this.buy10.checkHover(mx, my);
        this.buy100.checkHover(mx, my);
    }
    /**
     * Check if any buttons have been clicked.
     */
    public click(button: number): void {
        this.buy1.click(button);
        this.buy10.click(button);
        this.buy100.click(button);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Render the buy quantity
        this.label.value = `Buy x${this.quantity}`;
        this.label.draw(graphics);
        // Render the buttons
        this.buy1.draw(graphics);
        this.buy10.draw(graphics);
        this.buy100.draw(graphics);
    }
}
