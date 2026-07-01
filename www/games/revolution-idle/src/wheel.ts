import { Drawable } from 'graphico';
import { SMath } from 'smath';
import { Color } from 'viridis';
import { NUM_WHEELS } from './globals';

/**
 * Represents a single spinning wheel
 */
export class Wheel implements Drawable {
    private static readonly TAU: number = Math.PI * 2;
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
     * The maximum speed of the wheel at the max level
     */
    private readonly maxSpeed: number;
    /**
     * The maximum level for the speed
     */
    private readonly maxSpeedLevel: number;
    /**
     * The cost for the first speed upgrade
     */
    private readonly baseCost: number;
    /**
     * The incremental cost percentage increase
     */
    private readonly costIncrease: number;
    constructor(index: number, public readonly data: WheelData = defaultData) {
        this.color = Color.hsl(SMath.translate(index, 0, NUM_WHEELS, 0, 360), 100, 50);
        this.radius = 100 * 1.25 ** (index);
        this.thickness = this.radius * 0.2;
        this.maxSpeed = SMath.translate(index, 0, NUM_WHEELS, 20, 1) * Wheel.TAU;
        this.maxSpeedLevel = 100;
        this.baseCost = 10 ** index;
        this.costIncrease = SMath.translate(index, 0, NUM_WHEELS, 0.01, 0.1);
    }
    public rotate(dt: number): void {
        this.data.angle += SMath.translate(this.data.speedLevel, 0, this.maxSpeedLevel, 0, this.maxSpeed) * dt / 1e3;
        this.data.rotations += Math.floor(this.data.angle / Wheel.TAU);
        this.data.angle %= Wheel.TAU;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        const centerX: number = graphics.canvas.width / 2;
        const centerY: number = graphics.canvas.height / 2;
        graphics.strokeStyle = this.color.toString();
        graphics.lineWidth = this.thickness;
        graphics.lineCap = 'round';
        graphics.beginPath();
        graphics.arc(centerX, centerY, this.radius, 0, this.data.angle, false);
        graphics.stroke();
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

const defaultData: WheelData = {
    angle: 0,
    rotations: 0,
    ascensions: 0,
    speedLevel: 0,
};
