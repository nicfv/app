import { Drawable } from 'graphico';
import { SMath } from 'smath';
import { Color } from 'viridis';

/**
 * Represents a single spinning wheel
 */
export class Wheel implements Drawable {
    /**
     * The wheel color
     */
    private readonly color: Color;
    /**
     * The radius of the wheel
     */
    private readonly radius: number;
    /**
     * The thickness of the wheel
     */
    private readonly thickness: number;
    /**
     * The maximum speed of the wheel
     */
    private readonly maxSpeed: number;
    /**
     * The cost for the first speed upgrade
     */
    private readonly baseCost: number;
    /**
     * The incremental cost percentage increase
     */
    private readonly costIncrease: number;
    constructor(index: number, public readonly data: WheelData) {
        this.color = Color.hsl(SMath.translate(index, 0, 10, 0, 360), 100, 50);
        this.radius = 1.2 ** (index + 1);
        this.thickness = this.radius * 0.1;
        this.maxSpeed = SMath.translate(index, 0, 10, 20, 1);
        this.baseCost = 10 ** index;
        this.costIncrease = SMath.translate(index, 0, 10, 0.01, 0.1);
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
}

/**
 * Volatile wheel data, used for saving and loading game state
 */
export interface WheelData {
    /**
     * The current angle of the wheel
     */
    angle: number;
    /**
     * The total amount of rotations for this ascension
     */
    rotations: number;
    /**
     * The total number of ascensions for this mega-ascension
     */
    ascensions: number;
    /**
     * The current rotation speed of this wheel
     */
    speedLevel: number;
}
