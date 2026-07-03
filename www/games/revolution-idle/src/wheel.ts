import { Drawable } from 'graphico';
import { SMath } from 'smath';
import { Color } from 'viridis';
import { NUM_WHEELS } from './globals';
import { Zoom } from './zoom';

/**
 * Represents a single spinning wheel
 */
export class Wheel implements Drawable {
    /**
     * 2pi
     */
    private static readonly TAU: number = Math.PI * 2;
    /**
     * The wheel color
     */
    public readonly color: Color;
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
    /**
     * Create a new wheel.
     */
    constructor(public readonly index: number, private readonly zoom: Zoom, private readonly data: WheelData = JSON.parse(JSON.stringify(defaultData))) {
        this.color = Color.hsl(SMath.translate(index, 0, NUM_WHEELS, 0, 360), 100, 55);
        this.radius = 100 * 1.3 ** (index);
        this.thickness = this.radius * 0.2;
        this.maxSpeed = SMath.translate(index, 0, NUM_WHEELS, 20, 1);
        this.maxSpeedLevel = 100;
        this.baseCost = 10 ** index;
        this.costIncrease = SMath.translate(index, 0, NUM_WHEELS, 1.01, 1.15);
    }
    /**
     * Get data for this wheel.
     */
    public getData(): WheelData {
        return JSON.parse(JSON.stringify(this.data));
    }
    /**
     * Get the cost for the next `N` levels.
     */
    public getNextNCost(n: number): number {
        let cost = 0;
        for (let level = this.data.speedLevel; level < SMath.clamp(this.data.speedLevel + n, 0, this.maxSpeedLevel); level++) {
            cost += this.baseCost * (this.costIncrease ** level) * (2 ** this.data.ascensions);
        }
        return cost;
    }
    /**
     * Get the final speed after `N` levels.
     */
    public getNextNSpeed(n: number): number {
        return SMath.translate(SMath.clamp(this.data.speedLevel + n, 0, this.maxSpeedLevel), 0, this.maxSpeedLevel, 0, this.maxSpeed);
    }
    /**
     * Increase the speed by `N` levels.
     */
    public increaseSpeed(n: number): void {
        this.data.speedLevel = SMath.clamp(this.data.speedLevel + n, 0, this.maxSpeedLevel);
    }
    /**
     * Calculates the current speed in rotations per second. (Hz)
     */
    public currentSpeedHz(): number {
        return SMath.translate(this.data.speedLevel, 0, this.maxSpeedLevel, 0, this.maxSpeed);
    }
    /**
     * Rotate this wheel. Returns the number of complete rotations this past interval.
     */
    public rotate(dt: number): number {
        this.data.angle += this.currentSpeedHz() * dt / 1e3 * Wheel.TAU;
        const rotations: number = Math.floor(this.data.angle / Wheel.TAU);
        this.data.rotations += rotations;
        this.data.angle %= Wheel.TAU;
        return rotations;
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        // Skip drawing if it hasn't begun rotating yet
        if (this.data.speedLevel <= 0) {
            return;
        }
        // Center the wheel on the canvas
        const centerX: number = graphics.canvas.width / 2;
        const centerY: number = graphics.canvas.height / 2;
        const zoomFactor: number = 1.3 ** (NUM_WHEELS - this.zoom.getZoom());
        graphics.strokeStyle = this.color.toString();
        graphics.lineWidth = this.thickness / zoomFactor;
        graphics.lineCap = 'round';
        graphics.beginPath();
        graphics.arc(centerX, centerY, this.radius / zoomFactor, 0, this.data.angle, false);
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
